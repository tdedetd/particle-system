import { Particle } from "../particle";
import { ParticleGenerator } from './particle-generator';
import { Point } from '../helpers/point';
import { randomRange } from '../helpers/utils';

export class RandomParticleGenerator extends ParticleGenerator {

  /**
   * @param {number} width
   * @param {number} height
   */
   constructor(width, height) {
    super(width, height);
  }

  /**
   * @param {number} count
   * @param {number} radius
   * @param {number}
   * @returns {Particle[]}
   */
  generate(count, radius, maxSpeed) {

    /** @type {Particle[]} */
    const particles = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        coords: new Point(
          randomRange(radius, this.width - radius),
          randomRange(radius, this.height - radius)
        ),
        speed: new Point(
          randomRange(-maxSpeed, maxSpeed),
          randomRange(-maxSpeed, maxSpeed)
        )
      });
    }

    return particles;
  }
}
