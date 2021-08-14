import { Point } from "./point";

export class PointPolar {
  /**
   * @param {number} distance
   * @param {number} angle in radians
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
      this.distance * Math.cos(this.angle),
      this.distance * Math.sin(this.angle)
    );

    return cartesianPoint.add(origin);
  }
}
