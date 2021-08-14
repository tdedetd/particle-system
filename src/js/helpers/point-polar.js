import { Point } from "./point";
import { toRadians } from './utils';

export class PointPolar {
  /**
   * @param {number} distance
   * @param {number} angle
   */
  constructor(distance, angle) {
    this.distance = distance;
    this.angle = angle;
  }

  /**
   * @param {Point} origin
   * @returns {Point}
   */
  toCartesian(origin = null) {
    if (!origin) origin = new Point(0, 0);

    const cartesianPoint = new Point (
      this.distance * Math.cos(toRadians(this.angle)),
      this.distance * Math.sin(toRadians(this.angle))
    );

    return cartesianPoint.add(origin);
  }
}
