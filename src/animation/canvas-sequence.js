(function () {
  var canvas = document.getElementById('stackCanvas');
  if (!canvas || !window.AnimationTimeline) return;
  var ctx = canvas.getContext('2d');
  var status = document.getElementById('stackStatus');
  var mobile = window.matchMedia('(max-width: 720px)').matches;
  var labels = ['Digital Twin', 'Physical AI', 'Edge inference', 'Autonomy orchestration'];
  canvas.classList.add('canvas-fade');
  function paint(t) {
    var w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0A0F1F'; ctx.fillRect(0, 0, w, h);
    var step = mobile ? 3 : 4;
    var shown = t <= 0 ? 0 : Math.min(step, Math.ceil(t * step));
    for (var i = 0; i < step; i++) {
      var y = 24 + i * ((h - 36) / step);
      ctx.strokeStyle = i < shown ? '#1A7CFF' : 'rgba(200,204,212,0.25)';
      ctx.strokeRect(40, y, w - 80, (h - 48) / step - 8);
      ctx.fillStyle = i < shown ? '#fff' : '#9AA3B2';
      ctx.font = '600 16px Inter, sans-serif';
      ctx.fillText(labels[i] || '', 56, y + 26);
    }
    if (status) status.textContent = t > 0.92 ? 'Industrial Autonomy Infrastructure — Online' : 'Bringing layers online…';
  }
  var line = new AnimationTimeline.Timeline({
    duration: mobile ? 6400 : 7800,
    delay: 160,
    easing: AnimationTimeline.easeSoft,
    sequence: labels,
    onFrame: paint
  });
  AnimationTimeline.onceInView(canvas, function () { line.play(); }, mobile ? 0.2 : 0.3);
  canvas.addEventListener('click', function () { line.replay(); });
})();
