class WorkWithMeCTA extends HTMLElement {
  connectedCallback() {
    const href = this.getAttribute('href') || 'src/pages/work-with-me.html';
    this.innerHTML = `<section class="work-with-me fade-once"><h2>Work With Me</h2><p>Physical AI &amp; Industrial Autonomy GTM Leadership</p><a href="${href}">Request an Executive Briefing</a></section>`;
  }
}
customElements.define('work-with-me-cta', WorkWithMeCTA);
