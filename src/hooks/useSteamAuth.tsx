import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import func2url from '../../backend/func2url.json';

export interface SteamUser {
  id: number;
  nickname: string;
  avatar: string;
  profileUrl: string;
}

interface AuthValue {
  user: SteamUser | null;
  token: string | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthValue>({
  user: null,
  token: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

const TOKEN_KEY = 'cc_token';

export const SteamAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<SteamUser | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('openid.mode')) {
      const qs = new URLSearchParams();
      qs.set('action', 'callback');
      params.forEach((value, key) => {
        if (key.startsWith('openid.')) qs.set(key, value);
      });
      fetch(`${func2url['steam-auth']}?${qs.toString()}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.token) {
            localStorage.setItem(TOKEN_KEY, data.token);
            setToken(data.token);
            setUser(data.user);
          }
        })
        .finally(() => {
          setLoading(false);
          window.history.replaceState({}, '', window.location.pathname);
        });
      return;
    }

    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${func2url['steam-auth']}?action=me`, { headers: { 'X-Auth-Token': token } })
      .then((r) => r.json())
      .then((data) => {
        if (data.user) setUser(data.user);
        else {
          localStorage.removeItem(TOKEN_KEY);
          setToken(null);
        }
      })
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(() => {
    const origin = window.location.origin + window.location.pathname;
    const qs = new URLSearchParams({
      action: 'login',
      return_to: origin,
      callback: origin,
    });
    fetch(`${func2url['steam-auth']}?${qs.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.url) window.location.href = data.url;
      });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, token, loading, login, logout }),
    [user, token, loading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useSteamAuth = () => useContext(AuthContext);
