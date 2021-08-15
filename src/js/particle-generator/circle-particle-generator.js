import { Particle } from "../particle";
import { ParticleGenerator } from './particle-generator';
import { Point, PointPolar } from '../helpers/point';
import { toRadians } from "../helpers/utils";

export class CircleParticleGenerator extends ParticleGenerator {

  /**
   * @param {number} width
   * @param {number} height
   */
   constructor(width, height) {
    super(width, height);
  }

  /**
   * @param {number} count
   * @returns {Particle[]}
   */
  generate(count) {

    /**
     * @type {Particle[]}
     */
    const particles = [];
    const center = new Point(this.width / 2, this.height / 2);
    const radius = this.height / 2.5;

    for (let i = 0; i < count; i++) {
      const angle = toRadians(360 / count * i);
      const pointPolar = new PointPolar(radius, angle);
      particles.push({
        speed: new Point(100, 100),
        coords: pointPolar.toCartesian(center)
      });
    }

    return particles;
  }
}
