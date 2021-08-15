import { getDistance, getColorString } from './helpers/utils';
import { Themes } from './themes';
import { Point, PointPolar } from './helpers/point';
import { RandomParticleGenerator } from './particle-generator/random-particle-generator';
import { ParticleSystemProperties } from './particle-system-properties';

export class ParticleSystem {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {ParticleSystemProperties} properties
   */
  constructor(canvas, properties) {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    this.themes = new Themes();

    this.width = canvas.width;
    this.height = canvas.height;
    this.pointRadius = properties.pointRadius;
    this.maxLineDistance = properties.maxLineDistance;
    this.waterCircleRadius = properties.waterCircleRadius;
    this.maxParticleSpeed = properties.maxParticleSpeed;

    this.prevTimestamp = 0;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this._updateColors();

    this._draw = this._draw.bind(this);

    /** @type {ParticleGenerator} */
    this._particleGenerator = new RandomParticleGenerator(this.width, this.height);

    this.particles = this._particleGenerator.generate(
      Math.round(this.width * this.height / 5000),
      this.pointRadius,
      this.maxParticleSpeed
    );
  }

  nextTheme() {
    this.themes.next();
    this._updateColors();
  }

  prevTheme() {
    this.themes.prev();
    this._updateColors();
  }

  start() {
    requestAnimationFrame(this._draw);
  }

  /**
   * @param {Point} center center of water circle
   */
  waterCircle(center) {
    this.particles.forEach(part => {
      const partPolar = new Point(part.coords.x, part.coords.y).toPolar(center);

      if (partPolar.distance <= this.waterCircleRadius) {
        const newSpeed = this.maxParticleSpeed * Math.sqrt(2) - (partPolar.distance * this.maxParticleSpeed / this.waterCircleRadius);
        const newSpeedPolar = new PointPolar(newSpeed, partPolar.angle);
        part.speed = newSpeedPolar.toCartesian();
      }
    });
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

  _drawLines() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        // TODO: replace by Point method
        const dist = getDistance(
          this.particles[i].coords.x,
          this.particles[i].coords.y,
          this.particles[j].coords.x,
          this.particles[j].coords.y
        );
        if (dist < this.maxLineDistance) {
          this.ctx.strokeStyle = getColorString(this.foreColor, 1 - dist / this.maxLineDistance);
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].coords.x, this.particles[i].coords.y);
          this.ctx.lineTo(this.particles[j].coords.x, this.particles[j].coords.y);
          this.ctx.stroke();
        }
      }
    }
  }

  _drawPoints() {
    this.particles.forEach(point => {
      this.ctx.beginPath();
      this.ctx.ellipse(
        point.coords.x - this.pointRadius,
        point.coords.y - this.pointRadius,
        this.pointRadius * 2,
        this.pointRadius * 2, 0, 0, Math.PI * 2
      );
      this.ctx.fillStyle = getColorString(this.foreColor);
      this.ctx.fill();
    });
  }

  _movePoints(speedCoef) {
    this.particles.forEach(point => {
      point.coords.x += point.speed.x * speedCoef;
      point.coords.y += point.speed.y * speedCoef;

      if (point.coords.x < this.pointRadius) {
        point.speed = new Point(Math.abs(point.speed.x), point.speed.y);
      }

      if (point.coords.x > this.width - this.pointRadius) {
        point.speed = new Point(-Math.abs(point.speed.x), point.speed.y);
      }

      if (point.coords.y < this.pointRadius) {
        point.speed = new Point(point.speed.x, Math.abs(point.speed.y));
      }

      if (point.coords.y > this.height - this.pointRadius) {
        point.speed = new Point(point.speed.x, -Math.abs(point.speed.y));
      }
    });
  }

  _updateColors() {
    this.foreColor = this.themes.selected.foreColor;
    this.backColor = this.themes.selected.backColor;
    this.canvas.style.backgroundColor = getColorString(this.backColor);
  }
}
