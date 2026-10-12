/* Shared header behaviour: hamburger + More menu. */
(function () {
  function init() {
    var h = document.querySelector('.myc-header'); if (!h) return;
    var burger = h.querySelector('.myc-burger'), more = h.querySelector('.myc-more'), mb = more && more.querySelector('button');
    if (burger) burger.addEventListener('click', function () { var o = h.classList.toggle('open'); burger.setAttribute('aria-expanded', o ? 'true' : 'false'); });
    if (mb) mb.addEventListener('click', function (e) { e.stopPropagation(); var o = more.classList.toggle('open'); mb.setAttribute('aria-expanded', o ? 'true' : 'false'); });
    document.addEventListener('click', function (e) { if (more && !more.contains(e.target)) { more.classList.remove('open'); if (mb) mb.setAttribute('aria-expanded', 'false'); } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { h.classList.remove('open'); if (more) more.classList.remove('open'); } });
    var y = document.querySelector('.myc-year'); if (y) y.textContent = new Date().getFullYear();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
