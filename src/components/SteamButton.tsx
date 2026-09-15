import Icon from '@/components/ui/icon';
import { useSteamAuth } from '@/hooks/useSteamAuth';

const SteamButton = ({ className = '' }: { className?: string }) => {
  const { user, loading, login, logout } = useSteamAuth();

  if (loading) {
    return (
      <span
        className={`flex h-[38px] items-center rounded-xl border border-border bg-card px-4 text-[0.78rem] font-semibold uppercase tracking-[0.06em] text-muted-foreground ${className}`}
      >
        ...
      </span>
    );
  }

  if (user) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <a
          href={user.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-[38px] items-center gap-2 rounded-xl border border-border bg-card px-3 transition-colors hover:border-primary/40"
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.nickname}
              width={24}
              height={24}
              className="h-6 w-6 rounded-full object-cover"
            />
          ) : (
            <Icon name="User" size={16} className="text-primary" />
          )}
          <span className="max-w-[120px] truncate text-[0.8rem] font-semibold">
            {user.nickname}
          </span>
        </a>
        <button
          type="button"
          onClick={logout}
          aria-label="Выйти"
          className="grid h-[38px] w-[38px] place-items-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
        >
          <Icon name="LogOut" size={16} />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={login}
      className={`flex h-[38px] items-center gap-2 rounded-xl border border-sky/50 bg-sky/10 px-4 text-[0.78rem] font-bold uppercase tracking-[0.06em] text-foreground transition-colors hover:bg-sky/20 ${className}`}
    >
      <Icon name="Gamepad2" size={16} className="text-sky" />
      Войти через Steam
    </button>
  );
};

export default SteamButton;
