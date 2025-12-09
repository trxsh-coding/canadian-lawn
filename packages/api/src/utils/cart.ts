export function getOrCreateCartUUID(): string {
  if (typeof window === 'undefined') {
    return 'server-uuid-placeholder';
  }

  let uuid = localStorage.getItem('cartUUID');

  if (!uuid) {
    uuid = crypto.randomUUID();
    localStorage.setItem('cartUUID', uuid);
  }

  return uuid;
}
