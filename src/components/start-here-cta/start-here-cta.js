class StartHereCTA extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<section class="start-here-cta fade-once"><a href="src/pages/start-here.html">Start Here — The Industrial Autonomy Stack</a></section>`;
  }
}
customElements.define('start-here-cta', StartHereCTA);
