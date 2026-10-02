/* Structure only. No motion. */
class AutonomyLayer extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute('name') || 'layer';
    const index = this.getAttribute('index') || '0';
    this.classList.add('autonomy-layer', 'anim-hook', 'anim-paused');
    this.dataset.layer = name;
    this.dataset.index = index;
    this.dataset.duration = this.getAttribute('duration') || '1200';
    this.dataset.easing = this.getAttribute('easing') || 'ease';
    this.dataset.delay = this.getAttribute('delay') || '0';
    if (!this.innerHTML.trim()) {
      const label = this.getAttribute('label') || name;
      this.innerHTML = `<span class="autonomy-layer-label"></span>`;
      this.querySelector('.autonomy-layer-label').textContent = label;
    }
  }
}
customElements.define('autonomy-layer', AutonomyLayer);
