export const baseUrl = (url: string) => {
  try {
    const u = new URL(url);
    return `${u.origin}/`;
  } catch {
    return url;
  }
};

export const openRef = (
  url: string,
  e?: { preventDefault: () => void },
) => {
  e?.preventDefault();
  window.open(url, '_blank', 'noopener,noreferrer');
};
