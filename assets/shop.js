/* Shop: products removed. Old product links (#p/<slug>) land on the Shop note. */
(() => {
  const toShop = () => { if (/^#p\//.test(location.hash)) history.replaceState(null, '', '/shop/'); };
  toShop(); addEventListener('hashchange', () => { toShop(); document.getElementById('shop')?.scrollIntoView(); });
  if (location.pathname.startsWith('/shop') && !location.hash) addEventListener('load', () => document.getElementById('shop')?.scrollIntoView());
})();
