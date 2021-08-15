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
   * @returns {Particle[]}
   */
  generate() {
    return [];
  }
}
