/* Wrapper only. Sequence is data, not a running timeline. */
class AutonomyStackAnimation extends HTMLElement {
  connectedCallback() {
    const variant = this.getAttribute('variant') === 'mobile' ? 'mobile' : 'desktop';
    this.classList.add('autonomy-stack-animation', 'anim-hook', 'anim-paused', `is-${variant}`);
    this.dataset.variant = variant;
    this.dataset.easing = this.getAttribute('easing') || 'cubic-bezier(0.22, 1, 0.36, 1)';
    this.dataset.sequence = this.getAttribute('sequence') || 'twin,physical,edge,orchestration';
    this.dataset.timing = this.getAttribute('timing') || '0,1400,2800,4400';
    if (!this.querySelector('autonomy-layer')) {
      const layers = [
        ['twin', 'Digital Twin'],
        ['physical', 'Physical AI'],
        ['edge', 'Edge inference'],
        ['orchestration', 'Autonomy orchestration']
      ];
      layers.forEach(([name, label], i) => {
        const el = document.createElement('autonomy-layer');
        el.setAttribute('name', name);
        el.setAttribute('label', label);
        el.setAttribute('index', String(i));
        this.appendChild(el);
      });
    }
    const root = this;
    queueMicrotask(() => { if (window.AnimationTimeline) window.AnimationTimeline.bindStack(root); });
  }
}
customElements.define('autonomy-stack-animation', AutonomyStackAnimation);
