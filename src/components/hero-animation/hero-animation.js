/* Placeholder only. No motion. Props: variant=desktop|mobile */
class HeroAnimation extends HTMLElement {
  connectedCallback() {
    const variant = this.getAttribute('variant') === 'mobile' ? 'mobile' : 'desktop';
    this.classList.add('anim-hook', 'anim-paused');
    this.dataset.variant = variant;
    this.dataset.easing = this.getAttribute('easing') || 'ease';
    this.dataset.timing = this.getAttribute('timing') || '0,1400,2800,4400';
    this.innerHTML = `
      <div class="hero-anim hero-anim-${variant} anim-hook anim-paused" role="img" aria-label="Industrial Autonomy Stack, static">
        <div class="band">Digital Twin</div>
        <div class="band">Physical AI</div>
        <div class="band">Edge inference</div>
        <div class="band">Autonomy orchestration</div>
        <p class="lock">Industrial Autonomy Infrastructure — Online</p>
      </div>`;
  }
}
customElements.define('hero-animation', HeroAnimation);
