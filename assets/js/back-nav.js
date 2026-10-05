/* Back link + breadcrumb for inner pages.
   Goes back only when the visitor came from another page on this site;
   otherwise sends them to the parent hub, so nobody gets bounced off the site. */
(function () {
  if (window.__myBackNav) return; window.__myBackNav = true;

  var path = location.pathname.replace(/\/+$/, '/') ;
  var HOME = { href: '/', label: 'Home' };
  function parentFor(p) {
    if (/^\/case-studies\/./.test(p)) return { href: '/case-studies.html', label: 'Case Studies' };
    if (/^\/thought-leadership\/./.test(p)) return { href: '/thinking.html', label: 'Thought Leadership' };
    return HOME;
  }
  if (path === '/' || path === '/index.html' || path === '/src/pages/index.html') return;

  var parent = parentFor(path);

  function currentLabel() {
    var h1 = document.querySelector('h1');
    var t = (h1 ? h1.textContent : '').replace(/\s+/g, ' ').trim();
    if (!t) {
      var parts = (document.title || '').split(/\s[|—–-]\s/).map(function (x) { return x.trim(); });
      t = parts.filter(function (x) { return x && !/Muhammad\s+(A\.\s+)?Yunas/i.test(x); })[0] || parts[0] || '';
    }
    if (t.length > 60) t = t.slice(0, 57).trim() + '…';
    return t;
  }

  function cameFromSite() {
    try { return document.referrer && new URL(document.referrer).origin === location.origin && history.length > 1; }
    catch (e) { return false; }
  }

  var css = '' +
    '.my-backnav{all:initial;display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px;box-sizing:border-box;' +
    'width:100%;flex-basis:100%;margin:0 0 18px;padding:0;font-family:Inter,"Segoe UI",system-ui,sans-serif;font-size:13px;line-height:1.4;position:relative;z-index:5}' +
    '.my-backnav *{box-sizing:border-box;font-family:inherit}' +
    '.my-backnav a.my-back{display:inline-flex;align-items:center;gap:6px;color:#C9A86A;text-decoration:none;font-weight:600;' +
    'letter-spacing:.04em;text-transform:uppercase;font-size:12px;padding:6px 12px;border:1px solid rgba(201,168,106,.55);border-radius:999px;' +
    'background:rgba(10,26,47,.85);transition:background .15s,color .15s}' +
    '.my-backnav a.my-back:hover,.my-backnav a.my-back:focus-visible{background:#C9A86A;color:#0A1A2F;outline:none}' +
    '.my-backnav ol{list-style:none;display:flex;flex-wrap:wrap;gap:6px;margin:0;padding:0;color:#9AA4B2}' +
    '.my-backnav li{display:inline;margin:0;padding:0}' +
    '.my-backnav li+li:before{content:"\\203A";margin-right:6px;color:#C9A86A}' +
    '.my-backnav ol a{color:#C8CCD4;text-decoration:none}.my-backnav ol a:hover{color:#C9A86A;text-decoration:underline}' +
    '.my-backnav [aria-current]{color:#fff}' +
    '@media print{.my-backnav{display:none!important}}';

  function build() {
    if (document.querySelector('.my-backnav')) return;
    var style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

    var nav = document.createElement('nav');
    nav.className = 'my-backnav'; nav.setAttribute('aria-label', 'Breadcrumb');

    var back = document.createElement('a');
    back.className = 'my-back'; back.href = parent.href;
    back.innerHTML = '<span aria-hidden="true">&larr;</span> Back';
    back.addEventListener('click', function (e) {
      if (cameFromSite()) { e.preventDefault(); history.back(); }
    });

    var ol = document.createElement('ol');
    function crumb(item, current) {
      var li = document.createElement('li');
      if (current) { var s = document.createElement('span'); s.setAttribute('aria-current', 'page'); s.textContent = item; li.appendChild(s); }
      else { var a = document.createElement('a'); a.href = item.href; a.textContent = item.label; li.appendChild(a); }
      ol.appendChild(li);
    }
    crumb(HOME);
    if (parent !== HOME) crumb(parent);
    crumb(currentLabel(), true);

    nav.appendChild(back); nav.appendChild(ol);

    function anchor() {
      var sels = ['main h1', 'h1', 'main h2', 'section h2'];
      for (var i = 0; i < sels.length; i++) {
        var list = document.querySelectorAll(sels[i]);
        for (var j = 0; j < list.length; j++) {
          var el = list[j];
          if (el.closest('header, nav, footer, [role="banner"]')) continue;
          if (!el.getClientRects().length) continue;
          return el;
        }
      }
      return null;
    }
    var h1 = anchor();
    if (h1 && h1.parentNode) h1.parentNode.insertBefore(nav, h1);
    else (document.querySelector('main') || document.body).prepend(nav);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
