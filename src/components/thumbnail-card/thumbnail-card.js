/* Reusable ThumbnailCard. Props: title, description, href, cta, motif */
const MOTIFS = {
  steel: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="320" height="180" fill="#0A0F1F"/>
    <g stroke="#1A7CFF" stroke-opacity="0.35" fill="none">
      <path d="M16 20H304M16 50H304M16 80H304M16 110H304M16 140H304M16 170H304"/>
      <path d="M40 10V170M80 10V170M120 10V170"/>
    </g>
    <rect x="36" y="36" width="110" height="90" fill="none" stroke="#C8CCD4"/>
    <g fill="#1A7CFF">
      <circle cx="190" cy="55" r="3"/><circle cx="230" cy="80" r="3"/><circle cx="270" cy="55" r="3"/><circle cx="230" cy="110" r="3"/>
    </g>
    <line x1="150" y1="90" x2="176" y2="90" stroke="#D4A857" stroke-width="3"/>
  </svg>`,
  launch: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="320" height="180" fill="#0A0F1F"/>
    <rect x="40" y="120" width="36" height="8" fill="#1A7CFF" opacity="0.45"/>
    <rect x="40" y="100" width="72" height="8" fill="#1A7CFF" opacity="0.55"/>
    <rect x="40" y="80" width="108" height="8" fill="#1A7CFF" opacity="0.7"/>
    <rect x="40" y="60" width="150" height="8" fill="#1A7CFF"/>
    <rect x="40" y="40" width="200" height="8" fill="#D4A857"/>
    <circle cx="252" cy="44" r="5" fill="#1A7CFF"/>
  </svg>`,
  architecture: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="320" height="180" fill="#0A0F1F"/>
    <polyline points="40,130 90,100 40,70" fill="none" stroke="#C8CCD4"/>
    <polyline points="120,130 180,100 120,70" fill="none" stroke="#1A7CFF"/>
    <circle cx="150" cy="100" r="3" fill="#1A7CFF"/>
    <polyline points="210,130 280,100 210,70" fill="none" stroke="#D4A857" stroke-width="2"/>
  </svg>`,
  convergence: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="320" height="180" fill="#0A0F1F"/>
    <rect x="50" y="40" width="130" height="100" fill="none" stroke="#C8CCD4"/>
    <rect x="140" y="40" width="130" height="100" fill="none" stroke="#1A7CFF"/>
    <rect x="140" y="40" width="40" height="100" fill="#1A7CFF" opacity="0.18"/>
    <rect x="154" y="82" width="14" height="10" fill="#D4A857"/>
  </svg>`,
  agentic: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="320" height="180" fill="#0A0F1F"/>
    <path d="M70 110 Q120 70 160 100 T250 90" fill="none" stroke="#1A7CFF" stroke-opacity="0.8"/>
    <circle cx="70" cy="110" r="4" fill="#1A7CFF"/>
    <circle cx="130" cy="86" r="4" fill="#1A7CFF"/>
    <circle cx="190" cy="104" r="4" fill="#1A7CFF"/>
    <circle cx="250" cy="90" r="7" fill="#D4A857"/>
  </svg>`,
  cockpit: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="320" height="180" fill="#0A0F1F"/>
    <rect x="70" y="28" width="180" height="100" rx="16" fill="none" stroke="#C8CCD4"/>
    <line x1="92" y1="58" x2="150" y2="58" stroke="#C8CCD4"/>
    <line x1="92" y1="78" x2="180" y2="78" stroke="#1A7CFF"/>
    <line x1="92" y1="98" x2="130" y2="98" stroke="#D4A857"/>
  </svg>`,
  framework: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="320" height="180" fill="#0A0F1F"/>
    <line x1="70" y1="48" x2="260" y2="48" stroke="#1A7CFF" stroke-opacity="0.4"/>
    <line x1="70" y1="72" x2="260" y2="72" stroke="#1A7CFF" stroke-opacity="0.6"/>
    <line x1="70" y1="96" x2="260" y2="96" stroke="#1A7CFF"/>
    <line x1="70" y1="120" x2="260" y2="120" stroke="#D4A857" stroke-width="2"/>
  </svg>`,
  brief: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="320" height="180" fill="#0A0F1F"/>
    <line x1="48" y1="96" x2="272" y2="96" stroke="#D4A857"/>
    <circle cx="168" cy="96" r="5" fill="#1A7CFF"/>
  </svg>`
};

class ThumbnailCard extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || '';
    const description = this.getAttribute('description') || '';
    const href = this.getAttribute('href') || '#';
    const cta = this.getAttribute('cta') || 'Download';
    const motif = this.getAttribute('motif') || 'brief';
    const ghost = this.hasAttribute('ghost');
    this.innerHTML = `
      <div class="thumb-frame">${MOTIFS[motif] || MOTIFS.brief}<span class="thumb-kicker">Physical AI</span></div>
      <h3 class="thumb-title"></h3>
      <p class="thumb-desc"></p>
      <a class="thumb-cta${ghost ? ' ghost' : ''}"></a>`;
    this.querySelector('.thumb-title').textContent = title;
    this.querySelector('.thumb-desc').textContent = description;
    const a = this.querySelector('a');
    a.textContent = cta;
    a.href = href;
  }
}
customElements.define('thumbnail-card', ThumbnailCard);
