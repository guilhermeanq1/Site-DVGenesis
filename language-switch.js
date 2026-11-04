/* Explicit language choice: same page and section, without automatic redirects. */
(() => {
  const destination = (value) => {
    const url = new URL(value, window.location.href);
    url.hash = window.location.hash;
    return url.href;
  };
  document.querySelectorAll('[data-language-switch]').forEach((select) => {
    select.addEventListener('change', () => window.location.assign(destination(select.value)));
  });
  const updateLinks = () => document.querySelectorAll('[data-language-link]').forEach((link) => {
    const url = new URL(link.href);
    url.hash = window.location.hash;
    link.href = url.href;
  });
  updateLinks();
  window.addEventListener('hashchange', updateLinks);
})();
