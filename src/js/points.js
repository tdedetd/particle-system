import { Vector } from './vector';
import { randomRange } from './utils';

export class Scene {
   /**
   * @param {HTMLCanvasElement} canvas 
   */
  constructor(canvas) {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    this.pointRadius = 1;
    this.width = canvas.width;
    this.height = canvas.height;

    this.prevTimestamp = 0;
    this.ctx = canvas.getContext('2d');
    this.ctx.fillStyle = 'white';
    this.draw = this.draw.bind(this);
    this.generatePoints();

    requestAnimationFrame(this.draw);
  }

  /**
   * @param {number} timestamp 
   */
  draw(timestamp) {
    const timeDiff = timestamp - this.prevTimestamp;
    const speedCoef = timeDiff / 1000;
    this.prevTimestamp = timestamp;

    this.ctx.clearRect(0, 0, this.width, this.height)
    this.points.forEach(point => {
      point.x += point.speed.x * speedCoef;
      point.y += point.speed.y * speedCoef;

      if (point.x < this.pointRadius || point.x > this.width - this.pointRadius) {
        point.speed = new Vector(-point.speed.x, point.speed.y);
      }

      if (point.y < this.pointRadius || point.y > this.height - this.pointRadius) {
        point.speed = new Vector(point.speed.x, -point.speed.y);
      }

      this.ctx.beginPath();
      this.ctx.ellipse(
        point.x - this.pointRadius,
        point.y - this.pointRadius,
        this.pointRadius * 2,
        this.pointRadius * 2, 0, 0, Math.PI * 2
      );
      this.ctx.fill();
    });

    requestAnimationFrame(this.draw);
  }

  generatePoints() {
    const count = Math.round(this.width * this.height / 7000);
    this.points = [];

    for (let i = 0; i < count; i++) {
      this.points.push({
        x: randomRange(this.pointRadius, this.width - this.pointRadius),
        y: randomRange(this.pointRadius, this.height - this.pointRadius),
        speed: new Vector(
          randomRange(-100, 100),
          randomRange(-100, 100)
        )
      });
    }
  }
}
