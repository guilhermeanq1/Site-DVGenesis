(() => {
  'use strict';
  const scene = document.querySelector('.motion-scene');
  if (!scene) return;
  const canvas = scene.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const button = scene.querySelector('.motion-toggle');
  const label = button.querySelector('[data-motion-label]');
  const icon = button.querySelector('.motion-toggle-icon');
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = preference.matches;
  let inView = true;
  let frame = 0;
  let time = 0;
  let last = 0;
  let width = 0;
  let height = 0;
  let scale = 1;
  const PI = Math.PI;

  function project([x, y, z], rotation = time * .12) {
    const rx = x * Math.cos(rotation) - z * Math.sin(rotation);
    const rz = x * Math.sin(rotation) + z * Math.cos(rotation);
    const tilt = -.2;
    const ry = y * Math.cos(tilt) - rz * Math.sin(tilt);
    const depth = y * Math.sin(tilt) + rz * Math.cos(tilt);
    const perspective = 640 / (640 + depth);
    return { x: width * .52 + rx * scale * perspective, y: height * .46 + ry * scale * perspective, z: depth };
  }
  function path(points) {
    ctx.beginPath();
    points.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
  }
  function drawGem() {
    const count = 8;
    const upper = [], edge = [];
    for (let i = 0; i < count; i++) {
      const angle = i * PI * 2 / count;
      upper.push(project([Math.cos(angle) * 76, -76, Math.sin(angle) * 76]));
      edge.push(project([Math.cos(angle) * 122, -22, Math.sin(angle) * 122]));
    }
    const tip = project([0, 137, 0]);
    const faces = [];
    for (let i = 0; i < count; i++) {
      const j = (i + 1) % count;
      faces.push({ points: [upper[i], upper[j], edge[j], edge[i]], i });
      faces.push({ points: [edge[i], edge[j], tip], i: i + 3 });
    }
    faces.push({ points: upper, i: 1 });
    faces.sort((a, b) => b.points.reduce((v, p) => v + p.z, 0) / b.points.length - a.points.reduce((v, p) => v + p.z, 0) / a.points.length);
    faces.forEach(({ points, i }) => {
      path(points); ctx.closePath();
      const gradient = ctx.createLinearGradient(width * .35, height * .2, width * .72, height * .8);
      gradient.addColorStop(0, `rgba(50,213,255,${.10 + (i % 3) * .04})`);
      gradient.addColorStop(.55, 'rgba(88,105,247,.12)');
      gradient.addColorStop(1, 'rgba(207,73,255,.25)');
      ctx.fillStyle = gradient; ctx.fill();
      ctx.strokeStyle = i % 3 === 0 ? 'rgba(116,219,255,.78)' : 'rgba(131,136,255,.53)';
      ctx.lineWidth = 1; ctx.stroke();
    });
    // Light follows the actual facets, keeping the shape architectural.
    const i = Math.floor(time * .23) % count;
    const phase = (time * .23) % 1;
    const p = edge[i];
    const q = tip;
    const x = p.x + (q.x - p.x) * phase;
    const y = p.y + (q.y - p.y) * phase;
    const glow = ctx.createRadialGradient(x, y, 0, x, y, 15 * scale);
    glow.addColorStop(0, '#b5eeffbb'); glow.addColorStop(1, '#55bfff00');
    ctx.fillStyle = glow; ctx.fillRect(x - 18 * scale, y - 18 * scale, 36 * scale, 36 * scale);
  }
  function drawOrbits() {
    for (let ring = 0; ring < 3; ring++) {
      const radius = 170 + ring * 25;
      const points = [];
      for (let i = 0; i <= 100; i++) {
        const a = i / 100 * PI * 2;
        points.push(project([Math.cos(a) * radius, 42 + Math.sin(a) * (ring - 1) * 34, Math.sin(a) * radius], .45 + ring * .6));
      }
      path(points); ctx.strokeStyle = ['#528dff33', '#8b61db2e', '#46b8e622'][ring]; ctx.lineWidth = 1; ctx.stroke();
      for (let p = 0; p < 2; p++) {
        const a = time * (.28 + ring * .04) + ring * 2 + p * PI;
        const point = project([Math.cos(a) * radius, 42 + Math.sin(a) * (ring - 1) * 34, Math.sin(a) * radius], .45 + ring * .6);
        ctx.beginPath(); ctx.arc(point.x, point.y, 2.5 * scale, 0, PI * 2);
        ctx.fillStyle = ring === 1 ? '#bb85ff' : '#61c9ff'; ctx.shadowBlur = 12; ctx.shadowColor = ctx.fillStyle; ctx.fill(); ctx.shadowBlur = 0;
      }
    }
  }
  function draw() {
    ctx.clearRect(0, 0, width, height);
    const glow = ctx.createRadialGradient(width * .52, height * .48, 0, width * .52, height * .48, width * .45);
    glow.addColorStop(0, '#2744ad2b'); glow.addColorStop(.6, '#4b258f12'); glow.addColorStop(1, '#050a2200');
    ctx.fillStyle = glow; ctx.fillRect(0, 0, width, height);
    // A perspective platform gives the moving diamond a physical anchor.
    for (let i = -4; i <= 4; i++) {
      const a = project([i * 45, 160, -180], .65);
      const b = project([i * 45, 160, 180], .65);
      const c = project([-180, 160, i * 45], .65);
      const d = project([180, 160, i * 45], .65);
      ctx.strokeStyle = '#477edb19'; ctx.lineWidth = 1; path([a, b]); ctx.stroke(); path([c, d]); ctx.stroke();
    }
    drawOrbits(); drawGem();
  }
  function active() { return !paused && inView && !document.hidden; }
  function tick(now) {
    frame = 0;
    if (!active()) { last = 0; return; }
    if (!last) last = now;
    if (now - last >= 1000 / 30) {
      time += Math.min((now - last) / 1000, .1); last = now; draw();
    }
    frame = requestAnimationFrame(tick);
  }
  function synchronize() {
    scene.dataset.paused = String(paused || !inView || document.hidden);
    label.textContent = paused ? 'Animar' : 'Pausar';
    icon.textContent = paused ? '▷' : 'Ⅱ';
    button.setAttribute('aria-label', paused ? 'Ativar animação' : 'Pausar animação');
    if (active() && !frame) frame = requestAnimationFrame(tick);
    else if (!active() && frame) { cancelAnimationFrame(frame); frame = 0; last = 0; }
  }
  function resize() {
    const bounds = scene.getBoundingClientRect();
    width = bounds.width; height = bounds.height;
    scale = Math.min(width / 510, height / 460);
    const density = Math.min(window.devicePixelRatio || 1, 1.75);
    canvas.width = Math.round(width * density); canvas.height = Math.round(height * density);
    ctx.setTransform(density, 0, 0, density, 0, 0);
    draw();
  }
  button.addEventListener('click', () => { paused = !paused; synchronize(); });
  preference.addEventListener('change', () => { paused = preference.matches; synchronize(); });
  document.addEventListener('visibilitychange', synchronize);
  new ResizeObserver(resize).observe(scene);
  new IntersectionObserver(entries => { inView = entries[0].isIntersecting; synchronize(); }, { threshold: .05 }).observe(scene);
  scene.dataset.ready = 'true'; button.hidden = false;
  resize(); synchronize();
})();

