export class FuelMapRenderer {
  clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  draw(canvas, throttle, wf) {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const W = (canvas.width = canvas.offsetWidth);
    const H = (canvas.height = canvas.offsetHeight);

    ctx.clearRect(0, 0, W, H);

    const pad = { l: 30, r: 12, t: 10, b: 24 };
    const cw = W - pad.l - pad.r;
    const ch = H - pad.t - pad.b;

    ctx.strokeStyle = 'rgba(0,229,255,0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i += 1) {
      const x = pad.l + (i / 5) * cw;
      const y = pad.t + (i / 5) * ch;
      ctx.beginPath();
      ctx.moveTo(x, pad.t);
      ctx.lineTo(x, pad.t + ch);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(pad.l, y);
      ctx.lineTo(pad.l + cw, y);
      ctx.stroke();
    }

    const maxWf = 60;

    ctx.font = '8px "Share Tech Mono"';
    ctx.fillStyle = 'rgba(0,229,255,0.35)';
    ctx.textAlign = 'center';
    for (let i = 0; i <= 5; i += 1) {
      ctx.fillText(i * 20, pad.l + (i / 5) * cw, pad.t + ch + 14);
    }
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i += 1) {
      ctx.fillText((i * (maxWf / 5)).toFixed(1), pad.l - 4, pad.t + ch - (i / 5) * ch + 3);
    }

    ctx.save();
    ctx.font = '8px "Share Tech Mono"';
    ctx.fillStyle = 'rgba(0,229,255,0.22)';
    ctx.textAlign = 'center';
    ctx.fillText('Throttle %', pad.l + cw / 2, H - 6);
    ctx.translate(10, pad.t + ch / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Fuel flow (kg/s)', 0, 0);
    ctx.restore();

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0,229,255,0.6)';
    ctx.lineWidth = 1.5;
    ctx.shadowColor = 'rgba(0,229,255,0.4)';
    ctx.shadowBlur = 6;
    ctx.moveTo(pad.l, pad.t + ch);
    ctx.lineTo(pad.l + cw, pad.t);
    ctx.stroke();
    ctx.shadowBlur = 0;

    const x = this.clamp(throttle, 0, 100);
    const y = this.clamp(Number(wf), 0, maxWf);
    const px = pad.l + (x / 100) * cw;
    const py = pad.t + ch - (y / maxWf) * ch;

    ctx.strokeStyle = 'rgba(0,229,255,0.25)';
    ctx.lineWidth = 0.8;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(px, pad.t);
    ctx.lineTo(px, pad.t + ch);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pad.l, py);
    ctx.lineTo(pad.l + cw, py);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#00e5ff';
    ctx.shadowColor = 'rgba(0,229,255,0.8)';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(px, py, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}
