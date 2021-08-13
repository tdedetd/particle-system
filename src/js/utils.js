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

export function getDistance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}
