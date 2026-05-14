const palette = {
  ink: "#f5f5f5",
  dark: "#0a0a0a",
  panel: "#111111",
  blue: "#3b82f6",
  cyan: "#22d3ee",
  violet: "#8b5cf6",
  orange: "#f97316",
  green: "#22c55e",
  gray: "#6b7280",
  pink: "#ec4899",
  indigo: "#6366f1",
};

function scaleCanvas(canvas, logicalWidth, logicalHeight) {
  const ratio = window.devicePixelRatio || 1;
  const w = Math.round(logicalWidth * ratio);
  const h = Math.round(logicalHeight * ratio);
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return ctx;
}

function drawAstrocadeLogo(ctx, x, y, size) {
  const unit = size / 72;
  ctx.save();
  ctx.translate(x, y);

  // Outer rounded square background
  const r = 16 * unit;
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(72 * unit - r, 0);
  ctx.quadraticCurveTo(72 * unit, 0, 72 * unit, r);
  ctx.lineTo(72 * unit, 72 * unit - r);
  ctx.quadraticCurveTo(72 * unit, 72 * unit, 72 * unit - r, 72 * unit);
  ctx.lineTo(r, 72 * unit);
  ctx.quadraticCurveTo(0, 72 * unit, 0, 72 * unit - r);
  ctx.lineTo(0, r);
  ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath();
  ctx.fillStyle = palette.dark;
  ctx.fill();

  // Gradient border
  const gradient = ctx.createLinearGradient(0, 0, 72 * unit, 72 * unit);
  gradient.addColorStop(0, palette.blue);
  gradient.addColorStop(0.3, palette.cyan);
  gradient.addColorStop(0.6, palette.indigo);
  gradient.addColorStop(1, palette.violet);
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 2.5 * unit;
  ctx.stroke();

  // Star icon (representing "astro" - a game controller inspired shape)
  ctx.beginPath();
  // Top-left to top-right
  ctx.moveTo(16 * unit, 20 * unit);
  ctx.lineTo(56 * unit, 20 * unit);
  // Top-right curve down
  ctx.lineTo(60 * unit, 28 * unit);
  ctx.lineTo(52 * unit, 28 * unit);
  // Right side down
  ctx.lineTo(52 * unit, 52 * unit);
  ctx.lineTo(44 * unit, 52 * unit);
  ctx.lineTo(44 * unit, 40 * unit);
  // Middle gap
  ctx.lineTo(28 * unit, 40 * unit);
  ctx.lineTo(28 * unit, 52 * unit);
  ctx.lineTo(20 * unit, 52 * unit);
  ctx.lineTo(20 * unit, 28 * unit);
  // Left curve up
  ctx.lineTo(12 * unit, 28 * unit);
  ctx.lineTo(16 * unit, 20 * unit);
  ctx.closePath();

  const fillGradient = ctx.createLinearGradient(12 * unit, 20 * unit, 60 * unit, 52 * unit);
  fillGradient.addColorStop(0, palette.blue);
  fillGradient.addColorStop(0.5, palette.cyan);
  fillGradient.addColorStop(1, palette.violet);
  ctx.fillStyle = fillGradient;
  ctx.fill();

  // D-pad detail
  ctx.beginPath();
  ctx.arc(22 * unit, 44 * unit, 3 * unit, 0, Math.PI * 2);
  ctx.fillStyle = palette.dark;
  ctx.fill();

  // Right buttons detail
  ctx.beginPath();
  ctx.arc(50 * unit, 36 * unit, 2.5 * unit, 0, Math.PI * 2);
  ctx.fillStyle = palette.dark;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(50 * unit, 44 * unit, 2.5 * unit, 0, Math.PI * 2);
  ctx.fillStyle = palette.dark;
  ctx.fill();

  ctx.restore();
}

function drawBrandLogo() {
  const canvas = document.getElementById("brand-canvas");
  if (!canvas) return;
  const ctx = scaleCanvas(canvas, 22, 22);
  ctx.clearRect(0, 0, 22, 22);
  drawAstrocadeLogo(ctx, 0, 0, 22);
}

function drawBrandLogoFooter() {
  const canvas = document.getElementById("brand-canvas-footer");
  if (!canvas) return;
  const ctx = scaleCanvas(canvas, 20, 20);
  ctx.clearRect(0, 0, 20, 20);
  drawAstrocadeLogo(ctx, 0, 0, 20);
}

function drawHeroLogo() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = scaleCanvas(canvas, 96, 96);
  ctx.clearRect(0, 0, 96, 96);
  drawAstrocadeLogo(ctx, 0, 0, 96);
}

function installCanvasFavicon() {
  const canvas = document.createElement("canvas");
  canvas.width = 72;
  canvas.height = 72;
  const ctx = canvas.getContext("2d");
  drawAstrocadeLogo(ctx, 0, 0, 72);

  const link = document.querySelector("link[rel='icon']") || document.createElement("link");
  link.rel = "icon";
  link.type = "image/png";
  link.href = canvas.toDataURL("image/png");
  document.head.appendChild(link);
}

function drawAll() {
  drawBrandLogo();
  drawBrandLogoFooter();
  drawHeroLogo();
}

function initCanvas() {
  drawAll();
  installCanvasFavicon();
}

function safeInit() {
  const brandCanvas = document.getElementById("brand-canvas");
  if (brandCanvas && brandCanvas.getContext) {
    initCanvas();
  } else {
    requestAnimationFrame(safeInit);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", safeInit);
} else {
  safeInit();
}
