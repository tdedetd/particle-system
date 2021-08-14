import { PointPolar } from './point-polar';

export class Point {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * @param {Point} point
   */
  getDistance(point) {
    return Math.sqrt((point.x - this.x) ** 2 + (point.y - this.y) ** 2);
  }

  /**
   * @param {Point} point
   * @returns {Point}
   */
   add(point) {
    return new Point(
      this.x + point.x,
      this.y + point.y
    );
  }

  /**
   * @param {Point} point
   * @returns {Point}
   */
  subtract(point) {
    return new Point(
      this.x - point.x,
      this.y - point.y
    );
  }

  /**
   * @param {Point} origin
   * @returns {PointPolar}
   */
  toPolar(origin = null) {
    if (!origin) origin = new Point(0, 0);
    const cartesian = this.subtract(origin);

    const { x, y } = cartesian;
    let angle = 0;

    if (x > 0 && y >= 0) {
      angle = Math.atan(y / x);
    } else if (x > 0 && y < 0) {
      angle = Math.atan(y / x) + 2 * Math.PI;
    } else if (x < 0) {
      angle = Math.atan(y / x) + Math.PI;
    } else if (x === 0 && y > 0) {
      angle = Math.PI / 2;
    } else if (x === 0 && y < 0) {
      angle = 3 * Math.PI / 2;
    }

    return new PointPolar(cartesian.getDistance(origin), angle);
  }
}
