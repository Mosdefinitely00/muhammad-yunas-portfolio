class WhatsNewBanner extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || 'New: The Industrial Autonomy GTM Library';
    const cta = this.getAttribute('cta') || 'Explore the Library';
    const href = this.getAttribute('href') || '../pages/gtm-library.html';
    this.classList.add('anim-hook', 'anim-paused');
    this.innerHTML = `<div class="whats-new"><h2></h2><a></a></div>`;
    this.querySelector('h2').textContent = title;
    const a = this.querySelector('a');
    a.textContent = cta;
    a.href = href;
  }
}
customElements.define('whats-new-banner', WhatsNewBanner);
