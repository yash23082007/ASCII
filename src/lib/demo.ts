function roundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const maxRadius = Math.min(radius, width / 2, height / 2);

  ctx.beginPath();
  ctx.moveTo(x + maxRadius, y);
  ctx.lineTo(x + width - maxRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + maxRadius);
  ctx.lineTo(x + width, y + height - maxRadius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - maxRadius, y + height);
  ctx.lineTo(x + maxRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - maxRadius);
  ctx.lineTo(x, y + maxRadius);
  ctx.quadraticCurveTo(x, y, x + maxRadius, y);
  ctx.closePath();
}

function glowCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.45, color.replace("0.75", "0.25"));
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

export function buildDemoCanvas(width: number, height: number, tick = 0) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return canvas;
  }

  ctx.imageSmoothingEnabled = true;

  const drift = 0.5 + 0.5 * Math.sin(tick * 0.7);
  const pulse = 0.5 + 0.5 * Math.cos(tick * 0.9);

  const background = ctx.createLinearGradient(0, 0, width, height);
  background.addColorStop(0, "#040b15");
  background.addColorStop(0.5, "#07172b");
  background.addColorStop(1, "#040712");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  glowCircle(ctx, width * 0.18, height * 0.24, width * 0.18, "rgba(34, 211, 238, 0.68)");
  glowCircle(ctx, width * 0.78, height * 0.20, width * 0.14, "rgba(96, 165, 250, 0.62)");
  glowCircle(ctx, width * 0.70, height * 0.76, width * 0.18, "rgba(168, 85, 247, 0.48)");

  ctx.strokeStyle = "rgba(149, 197, 255, 0.08)";
  ctx.lineWidth = 1;
  const stepX = width / 16;
  const stepY = height / 10;

  for (let x = 0; x <= width; x += stepX) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y <= height; y += stepY) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  const panelX = width * 0.12;
  const panelY = height * 0.15;
  const panelW = width * 0.70;
  const panelH = height * 0.60;

  ctx.save();
  ctx.shadowColor = "rgba(34, 211, 238, 0.18)";
  ctx.shadowBlur = 32;
  roundedRectPath(ctx, panelX, panelY, panelW, panelH, 28);
  ctx.fillStyle = "rgba(4, 9, 20, 0.82)";
  ctx.fill();
  ctx.restore();

  ctx.strokeStyle = "rgba(129, 212, 255, 0.18)";
  ctx.lineWidth = 1.5;
  roundedRectPath(ctx, panelX, panelY, panelW, panelH, 28);
  ctx.stroke();

  const headerH = height * 0.10;
  roundedRectPath(ctx, panelX + 18, panelY + 18, panelW - 36, headerH, 18);
  ctx.fillStyle = "rgba(10, 18, 34, 0.90)";
  ctx.fill();

  const circleY = panelY + 18 + headerH / 2;
  const circleX = panelX + 38;
  const circleGap = 18;
  const circles = ["#f97316", "#facc15", "#34d399"];
  circles.forEach((fill, index) => {
    ctx.beginPath();
    ctx.arc(circleX + index * circleGap, circleY, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = fill;
    ctx.fill();
  });

  ctx.fillStyle = "rgba(238, 247, 255, 0.92)";
  ctx.font = `600 ${Math.max(14, Math.round(height * 0.03))}px "Space Grotesk", sans-serif`;
  ctx.fillText("live conversion feed", panelX + 95, circleY + 6);

  const barsX = panelX + 26;
  const barsY = panelY + headerH + 42;
  const barsWidth = panelW - 52;
  const barsHeight = panelH - headerH - 88;
  const barCount = 14;
  const barWidth = barsWidth / barCount;

  for (let index = 0; index < barCount; index += 1) {
    const phase = index / barCount;
    const heightFactor = 0.35 + 0.55 * Math.sin(phase * 8 + tick * 0.8 + drift * 2);
    const barHeight = barsHeight * clamp(heightFactor, 0.15, 0.95);
    const x = barsX + index * barWidth + barWidth * 0.18;
    const y = barsY + barsHeight - barHeight;

    const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
    gradient.addColorStop(0, `rgba(34, 211, 238, ${0.9 - phase * 0.25})`);
    gradient.addColorStop(1, `rgba(96, 165, 250, ${0.45 + phase * 0.2})`);

    roundedRectPath(ctx, x, y, barWidth * 0.62, barHeight, 10);
    ctx.fillStyle = gradient;
    ctx.fill();
  }

  const ribbonX = panelX + panelW * 0.52;
  const ribbonY = panelY + panelH * (0.38 + pulse * 0.08);
  ctx.save();
  ctx.strokeStyle = "rgba(168, 85, 247, 0.9)";
  ctx.lineWidth = 4;
  ctx.shadowColor = "rgba(168, 85, 247, 0.55)";
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.moveTo(panelX + 24, ribbonY + 34);
  ctx.bezierCurveTo(ribbonX * 0.5, ribbonY - 38, ribbonX * 0.82, ribbonY + 82, panelX + panelW - 28, ribbonY + 8);
  ctx.stroke();
  ctx.restore();

  const chipW = width * 0.12;
  const chipH = height * 0.09;
  const chipY = panelY + panelH - chipH - 22;
  const chipX = panelX + 24;
  const chipColors = ["rgba(34, 211, 238, 0.18)", "rgba(96, 165, 250, 0.18)", "rgba(168, 85, 247, 0.18)"];

  chipColors.forEach((fill, index) => {
    const x = chipX + index * (chipW + 16);
    roundedRectPath(ctx, x, chipY, chipW, chipH, 16);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = "rgba(148, 205, 255, 0.22)";
    ctx.stroke();
  });

  ctx.fillStyle = "rgba(245, 247, 255, 0.88)";
  ctx.font = `500 ${Math.max(12, Math.round(height * 0.022))}px "IBM Plex Mono", monospace`;
  ctx.fillText(`density ${Math.round(68 + drift * 18)}`, chipX + 16, chipY + chipH / 2 + 5);
  ctx.fillText(`fps ${Math.round(28 + pulse * 8)}`, chipX + chipW + 32, chipY + chipH / 2 + 5);
  ctx.fillText(`quality ${Math.round(84 + pulse * 8)}%`, chipX + (chipW + 16) * 2 + 16, chipY + chipH / 2 + 5);

  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.035)";
  for (let index = 0; index < 12; index += 1) {
    const y = panelY + 40 + index * (panelH - 80) / 12;
    ctx.fillRect(panelX + 24, y, panelW - 48, 1);
  }
  ctx.restore();

  return canvas;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
