(function (global) {
  function easeOut(u) { return 1 - Math.pow(1 - Math.min(1, Math.max(0, u)), 3); }
  function Timeline(opts) {
    opts = opts || {};
    this.duration = Number(opts.duration || 7200);
    this.delay = Number(opts.delay || 0);
    this.easing = opts.easing || easeOut;
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
  function onceInView(el, fn, threshold) {
    if (!el || el.dataset.revealed === 'true') return;
    if (!('IntersectionObserver' in global)) { el.dataset.revealed = 'true'; fn(); return; }
    var mobile = global.matchMedia('(max-width: 720px)').matches;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || el.dataset.revealed === 'true') return;
        el.dataset.revealed = 'true'; obs.disconnect(); fn();
      });
    }, { threshold: threshold != null ? threshold : (mobile ? 0.2 : 0.35) });
    obs.observe(el);
  }
  function bindCards(root) {
    (root || document).querySelectorAll('thumbnail-card.hook-fade').forEach(function (card) {
      card.dataset.inview = 'false';
      onceInView(card, function () { card.dataset.inview = 'true'; }, 0.25);
    });
  }
  function bindStack(el) {
    if (!el) return;
    var layers = el.querySelectorAll('autonomy-layer');
    var timing = (el.dataset.timing || '0,1400,2800,4400').split(',').map(Number);
    onceInView(el, function () {
      el.classList.remove('anim-paused');
      layers.forEach(function (layer, i) {
        setTimeout(function () { layer.classList.add('is-on'); }, timing[i] || i * 1400);
      });
    });
  }
  function bindHero(el) { if (!el) return; el.classList.remove('anim-paused'); el.classList.add('is-live'); }
  global.AnimationTimeline = { Timeline: Timeline, easeOut: easeOut, onceInView: onceInView, bindCards: bindCards, bindStack: bindStack, bindHero: bindHero };
  function boot() {
    document.querySelectorAll('autonomy-stack-animation').forEach(bindStack);
    document.querySelectorAll('hero-animation').forEach(bindHero);
    bindCards(document);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})(window);
