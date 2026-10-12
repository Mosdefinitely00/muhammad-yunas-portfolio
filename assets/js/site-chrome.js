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

/* Closing CTA banner before the global footer (shared include). */
(function () {
  var BOOK = 'https://calendar.app.google/4GdxCHG3AC7RQ1rV7';
  var RESUME = '/Muhammad_Yunas_Resume_Executive.pdf';
  function add() {
    if (document.querySelector('.myc-cta') || document.body.hasAttribute('data-no-cta')) return;
    var sec = document.createElement('section');
    sec.className = 'myc-cta'; sec.setAttribute('aria-labelledby', 'mycCtaTitle');
    sec.innerHTML = '<div class="myc-cta-inner">' +
      '<h2 id="mycCtaTitle">Ready to Bridge Deep Tech to Enterprise Pipeline?</h2>' +
      '<p>Available for executive advisory, Fractional CRO/GTM, and full-time leadership roles in Physical AI &amp; Industrial IoT.</p>' +
      '<div class="myc-cta-actions">' +
      '<a class="myc-cta-btn myc-cta-primary" href="' + BOOK + '" target="_blank" rel="noopener">Book Executive Briefing &rarr;</a>' +
      '<a class="myc-cta-btn myc-cta-outline" href="' + RESUME + '" download>Download Executive Resume (PDF)</a>' +
      '</div></div>';
    var tag = document.querySelector('.my-tagline-wrap');
    var footers = document.querySelectorAll('footer.myc-footer, body > footer, footer');
    var f = document.querySelector('footer.myc-footer') || (footers.length ? footers[footers.length - 1] : null);
    if (tag && f && tag.nextElementSibling === f) f = tag;
    if (f && f.parentNode) f.parentNode.insertBefore(sec, f); else document.body.appendChild(sec);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', add); else add();
})();

/* Contact forms: compose a mailto: link client-side instead of posting to a mailto: action. */
(function () {
  function init() {
    document.querySelectorAll('form[data-mailto]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var lines = [];
        form.querySelectorAll('input[name], textarea[name]').forEach(function (el) { lines.push(el.name + ': ' + el.value); });
        location.href = 'mailto:' + form.getAttribute('data-mailto') +
          '?subject=' + encodeURIComponent(form.getAttribute('data-subject') || 'Website inquiry') +
          '&body=' + encodeURIComponent(lines.join('\n'));
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
