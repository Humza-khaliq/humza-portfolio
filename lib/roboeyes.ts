// A browser port of the behaviour of FluxGarage RoboEyes (the Arduino library
// Volt runs on its SSD1306 OLED). Draws on a 128×64 canvas so it can be
// scaled up with `image-rendering: pixelated` for an authentic OLED look.

export type Mood = "default" | "happy" | "tired" | "angry";

const W = 128;
const H = 64;

export class RoboEyes {
  private ctx: CanvasRenderingContext2D;
  color = "#cfeeff";

  // geometry (library defaults)
  eyeW = 36;
  eyeH = 36;
  radius = 8;
  space = 10;

  // animated state
  private x: number;
  private y: number;
  private tx: number;
  private ty: number;
  private hL: number;
  private hR: number;
  private thL: number;
  private thR: number;
  private tired = 0;
  private angry = 0;
  private happy = 0;
  private shakeT = 0;
  private bounceT = 0;

  mood: Mood = "default";
  private lookX = 0;
  private lookY = 0;
  private lastLookAt = 0;
  private nextBlink = 0;
  private nextIdle = 0;
  private closed = false;
  idle = true;

  constructor(canvas: HTMLCanvasElement) {
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("no 2d context");
    this.ctx = ctx;
    this.x = (W - (this.eyeW * 2 + this.space)) / 2;
    this.y = (H - this.eyeH) / 2;
    this.tx = this.x;
    this.ty = this.y;
    this.hL = this.hR = this.thL = this.thR = this.eyeH;
  }

  /** Look direction in -1..1 on both axes. */
  look(x: number, y: number, now = performance.now()) {
    this.lookX = Math.max(-1, Math.min(1, x));
    this.lookY = Math.max(-1, Math.min(1, y));
    this.lastLookAt = now;
  }

  setMood(m: Mood) {
    this.mood = m;
  }

  blink() {
    this.thL = this.thR = 1;
    setTimeout(() => {
      if (!this.closed) this.thL = this.thR = this.eyeH;
    }, 110);
  }

  close() {
    this.closed = true;
    this.thL = this.thR = 1;
  }

  open() {
    this.closed = false;
    this.thL = this.thR = this.eyeH;
  }

  /** Horizontal head-shake ("confused"). */
  confused() {
    this.shakeT = 1;
  }

  /** Vertical bounce ("laugh"). */
  laugh() {
    this.bounceT = 1;
  }

  update(now: number, dt: number) {
    const k = 1 - Math.pow(0.0005, dt); // frame-rate independent ease

    // idle wander when nobody has steered the eyes for a while
    if (this.idle && now - this.lastLookAt > 2500 && now > this.nextIdle) {
      this.lookX = Math.random() * 2 - 1;
      this.lookY = Math.random() * 2 - 1;
      this.nextIdle = now + 1500 + Math.random() * 2000;
    }

    if (!this.closed && now > this.nextBlink) {
      this.blink();
      this.nextBlink = now + 2200 + Math.random() * 3200;
    }

    const maxX = W - (this.eyeW * 2 + this.space);
    const maxY = H - this.eyeH;
    this.tx = ((this.lookX + 1) / 2) * maxX;
    this.ty = ((this.lookY + 1) / 2) * maxY;

    // curiosity: outer eye grows when looking hard to a side
    const curL = this.lookX < -0.6 ? 8 : 0;
    const curR = this.lookX > 0.6 ? 8 : 0;
    const blinkClosed = this.thL <= 1;
    const targL = blinkClosed ? 1 : this.eyeH + curL;
    const targR = blinkClosed ? 1 : this.eyeH + curR;

    const fast = 1 - Math.pow(0.000001, dt);
    this.hL += (targL - this.hL) * fast;
    this.hR += (targR - this.hR) * fast;
    this.x += (this.tx - this.x) * k;
    this.y += (this.ty - this.y) * k;

    const ease = (cur: number, t: number) => cur + (t - cur) * k;
    this.tired = ease(this.tired, this.mood === "tired" ? this.eyeH / 2 : 0);
    this.angry = ease(this.angry, this.mood === "angry" ? this.eyeH / 2 : 0);
    this.happy = ease(this.happy, this.mood === "happy" ? this.eyeH / 2 : 0);

    this.shakeT = Math.max(0, this.shakeT - dt / 0.6);
    this.bounceT = Math.max(0, this.bounceT - dt / 0.8);
  }

  draw(now: number) {
    const c = this.ctx;
    c.fillStyle = "#000";
    c.fillRect(0, 0, W, H);
    c.fillStyle = this.color;

    const shake = this.shakeT > 0 ? Math.sin(now / 28) * 6 * this.shakeT : 0;
    const bounce = this.bounceT > 0 ? -Math.abs(Math.sin(now / 70)) * 5 * this.bounceT : 0;

    const xL = Math.round(this.x + shake);
    const xR = xL + this.eyeW + this.space;
    const baseY = this.y + bounce;
    const w = this.eyeW;

    const yL = Math.round(baseY + (this.eyeH - this.hL) / 2);
    const yR = Math.round(baseY + (this.eyeH - this.hR) / 2);
    const hL = Math.max(1, Math.round(this.hL));
    const hR = Math.max(1, Math.round(this.hR));

    rr(c, xL, yL, w, hL, Math.min(this.radius, hL / 2));
    rr(c, xR, yR, w, hR, Math.min(this.radius, hR / 2));

    c.fillStyle = "#000";
    // tired: droopy outer lids
    if (this.tired > 0.5) {
      tri(c, xL, yL - 1, xL + w, yL - 1, xL, yL + this.tired - 1);
      tri(c, xR, yR - 1, xR + w, yR - 1, xR + w, yR + this.tired - 1);
    }
    // angry: inner lids
    if (this.angry > 0.5) {
      tri(c, xL, yL - 1, xL + w, yL - 1, xL + w, yL + this.angry - 1);
      tri(c, xR, yR - 1, xR + w, yR - 1, xR, yR + this.angry - 1);
    }
    // happy: lower lids push up
    if (this.happy > 0.5) {
      rr(c, xL - 1, yL + hL - this.happy + 1, w + 2, this.eyeH, this.radius);
      rr(c, xR - 1, yR + hR - this.happy + 1, w + 2, this.eyeH, this.radius);
    }
  }
}

function rr(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  c.beginPath();
  c.roundRect(x, y, w, h, Math.max(0, r));
  c.fill();
}

function tri(
  c: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
) {
  c.beginPath();
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
  c.lineTo(x3, y3);
  c.closePath();
  c.fill();
}
