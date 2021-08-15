import { Particle } from "../particle";

export class ParticleGenerator {

  /**
   * @param {number} width
   * @param {number} height
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  /**
   * @param {number} count
   * @param {number} radius
   * @returns {Particle[]}
   */
  generate(count, radius) {
    return [];
  }
}
