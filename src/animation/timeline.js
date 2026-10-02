(function (global) {
  function easeOut(u) { return 1 - Math.pow(1 - Math.min(1, Math.max(0, u)), 3); }
  function easeSoft(u) {
    u = Math.min(1, Math.max(0, u));
    return 1 - Math.pow(1 - u, 2);
  }
  function Timeline(opts) {
    opts = opts || {};
    this.duration = Number(opts.duration || 7600);
    this.delay = Number(opts.delay || 0);
    this.easing = opts.easing || easeSoft;
    this.sequence = opts.sequence || [];
    this.onFrame = opts.onFrame || function () {};
    this._start = 0; this._raf = 0; this.playing = false;
  }
  Timeline.prototype.play = function () {
    var self = this; this.reset(); this.playing = true;
    function frame(now) {
      if (!self._start) self._start = now + self.delay;
      var raw = (now - self._start) / self.duration;
      self.onFrame(self.easing(raw), raw);
      if (raw < 1) self._raf = requestAnimationFrame(frame);
      else self.playing = false;
    }
    this._raf = requestAnimationFrame(frame);
    return this;
  };
  Timeline.prototype.reset = function () {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._start = 0; this.playing = false; this.onFrame(0, 0); return this;
  };
  Timeline.prototype.replay = function () { return this.play(); };
  function reduced() {
    return global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  function onceInView(el, fn, threshold) {
    if (!el || el.dataset.revealed === 'true') return;
    if (reduced() || !('IntersectionObserver' in global)) { el.dataset.revealed = 'true'; fn(); return; }
    var mobile = global.matchMedia('(max-width: 720px)').matches;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || el.dataset.revealed === 'true') return;
        el.dataset.revealed = 'true'; obs.disconnect(); fn();
      });
    }, { threshold: threshold != null ? threshold : (mobile ? 0.18 : 0.32), rootMargin: mobile ? '0px 0px -8% 0px' : '0px' });
    obs.observe(el);
  }
  function bindCards(root) {
    var scope = root || document;
    var cards = scope.querySelectorAll('thumbnail-card.hook-fade');
    var stagger = (scope.id === 'grid') ? 64 : 0;
    cards.forEach(function (card, i) {
      card.dataset.inview = 'false';
      if (stagger) card.style.transitionDelay = (i * stagger) + 'ms';
      onceInView(card, function () { card.dataset.inview = 'true'; }, scope.id === 'grid' ? 0.2 : 0.25);
    });
  }
  function bindStack(el) {
    if (!el) return;
    var layers = el.querySelectorAll('autonomy-layer');
    var timing = (el.dataset.timing || '0,1400,2800,4400').split(',').map(Number);
    onceInView(el, function () {
      el.classList.remove('anim-paused');
      layers.forEach(function (layer, i) {
        var wait = (timing[i] != null ? timing[i] : i * 1400) + i * 90;
        setTimeout(function () { layer.classList.add('is-on'); }, reduced() ? 0 : wait);
      });
    });
  }
  function bindHero(el) {
    if (!el) return;
    el.classList.remove('anim-paused');
    el.classList.add('is-live');
    var graphic = el.querySelector('.hero-anim');
    if (graphic) {
      graphic.classList.remove('anim-paused');
      graphic.classList.add('is-live');
    }
  }
  function bindHomeHero() {
    var hero = document.querySelector('.hero-wrapper');
    var card = hero && hero.querySelector('.hero-terminal-card');
    if (!card || reduced()) return;
    var mobile = global.matchMedia('(max-width: 720px)').matches;
    var cap = mobile ? 6 : 12;
    var ticking = false;
    global.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var y = Math.max(-cap, Math.min(cap, global.scrollY * (mobile ? 0.015 : 0.03)));
        card.style.transform = 'translate3d(0,' + (-y).toFixed(2) + 'px,0)';
      });
    }, { passive: true });
  }
  global.AnimationTimeline = {
    Timeline: Timeline, easeOut: easeOut, easeSoft: easeSoft,
    onceInView: onceInView, bindCards: bindCards, bindStack: bindStack, bindHero: bindHero
  };
  function boot() {
    document.querySelectorAll('autonomy-stack-animation').forEach(bindStack);
    document.querySelectorAll('hero-animation').forEach(bindHero);
    bindCards(document);
    var grid = document.getElementById('grid');
    if (grid) bindCards(grid);
    bindHomeHero();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})(window);
