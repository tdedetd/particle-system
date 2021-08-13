import { Vector } from './vector';
import { randomRange, getDistance, getColorString } from './utils';
import { Themes } from './themes';

export class Scene {
  /**
   * @param {HTMLCanvasElement} canvas 
   */
  constructor(canvas) {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    this.themes = new Themes();

    this.width = canvas.width;
    this.height = canvas.height;
    this.pointRadius = 1;
    this.maxLineDistance = 100;

    this.prevTimestamp = 0;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this._updateColors();

    this._draw = this._draw.bind(this);
    this._generatePoints();
    requestAnimationFrame(this._draw);
  }

  nextTheme() {
    this.themes.next();
    this._updateColors();
  }

  prevTheme() {
    this.themes.prev();
    this._updateColors();
  }

  /**
   * @param {number} timestamp
   */
  _draw(timestamp) {
    const timeDiff = timestamp - this.prevTimestamp;
    const speedCoef = timeDiff / 1000;
    this.prevTimestamp = timestamp;

    this.ctx.clearRect(0, 0, this.width, this.height);
    this._movePoints(speedCoef);
    this._drawLines();
    // this._drawPoints();

    requestAnimationFrame(this._draw);
  }

  _generatePoints() {
    const count = Math.round(this.width * this.height / 5000);
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

  _drawLines() {
    for (let i = 0; i < this.points.length; i++) {
      for (let j = i + 1; j < this.points.length; j++) {
        const dist = getDistance(this.points[i].x, this.points[i].y, this.points[j].x, this.points[j].y);
        if (dist < this.maxLineDistance) {
          this.ctx.strokeStyle = getColorString(this.foreColor, 1 - dist / this.maxLineDistance);
          this.ctx.beginPath();
          this.ctx.moveTo(this.points[i].x, this.points[i].y);
          this.ctx.lineTo(this.points[j].x, this.points[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  _drawPoints() {
    this.points.forEach(point => {
      this.ctx.beginPath();
      this.ctx.ellipse(
        point.x - this.pointRadius,
        point.y - this.pointRadius,
        this.pointRadius * 2,
        this.pointRadius * 2, 0, 0, Math.PI * 2
      );
      this.ctx.fillStyle = getColorString(this.foreColor);
      this.ctx.fill();
    });
  }

  _movePoints(speedCoef) {
    this.points.forEach(point => {
      point.x += point.speed.x * speedCoef;
      point.y += point.speed.y * speedCoef;

      if (point.x < this.pointRadius || point.x > this.width - this.pointRadius) {
        point.speed = new Vector(-point.speed.x, point.speed.y);
      }

      if (point.y < this.pointRadius || point.y > this.height - this.pointRadius) {
        point.speed = new Vector(point.speed.x, -point.speed.y);
      }
    });
  }

  _updateColors() {
    this.foreColor = this.themes.selected.foreColor;
    this.backColor = this.themes.selected.backColor;
    this.canvas.style.backgroundColor = getColorString(this.backColor);
  }
}
