/* ============================
   3D TILT CARDS
   ============================ */
(function initTiltCards() {
  const cards = document.querySelectorAll(".card, .metric-card, .journey-card, .project-card");

  cards.forEach(card => {
    card.classList.add("tilt-card");

    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const tiltX = (y / rect.height - 0.5) * 12;
      const tiltY = (x / rect.width - 0.5) * -12;

      card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  });
})();

/* ============================
   MAGNETIC CURSOR
   ============================ */
(function initMagneticCursor() {
  const magnets = document.querySelectorAll("a, button, .quick-btn, .nav-btn");

  magnets.forEach(el => {
    el.classList.add("magnetic");

    el.addEventListener("mousemove", e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "translate(0px, 0px)";
    });
  });
})();

/* ============================
   TELEMETRY NODE INTERACTIONS
   ============================ */
(function initTelemetryNodes() {
  const nodes = document.querySelectorAll(".telemetry-node");

  nodes.forEach(node => {
    node.addEventListener("click", () => {
      node.style.transform = "scale(1.7)";
      setTimeout(() => node.style.transform = "scale(1.2)", 250);
    });
  });
})();
