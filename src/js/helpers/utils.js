import { Color } from './color';
import { Point } from './point';

/**
 * @param {any[]} list 
 */
export function randomList(list) {
  const i = Math.floor(Math.random() * list.length);
  return list[i];
}

export function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * @deprecated
 * @returns
 */
export function getDistance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

/**
 * @param {Color} color
 * @param {number} a alpha. 0 - 1
 */
export function getColorString(color, alpha = null) {
  const alphaStr = alpha === null ? `` : `, ${alpha}`;
  return `rgb(${color.r}, ${color.g}, ${color.b}${alphaStr})`
}

/**
 * @param {number} degrees
 */
export function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

/**
 * @param {number} radians
 */
export function toDegrees(radians) {
  return radians * 180 / Math.PI;
}
