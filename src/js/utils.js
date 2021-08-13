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
