import { Point } from './helpers/point';
import { ParticleSystem } from './particle-system';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('#screen');
  const particleSystem = new ParticleSystem(canvas);
  let mouseDown = false;
  particleSystem.start();

  setTimeout(() => window.scrollTo(0, 0));

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') particleSystem.prevTheme();
    if (e.key === 'ArrowRight') particleSystem.nextTheme();
  });

  canvas.addEventListener('mousedown', e => {
    mouseDown = true;
    callWaterCircle(e, particleSystem);
  });

  canvas.addEventListener('mouseup', _ => mouseDown = false);

  canvas.addEventListener('mousemove', e => {
    if (mouseDown) {
      callWaterCircle(e, particleSystem);
    }
  });
});

/**
 * @param {MouseEvent} e
 * @param {ParticleSystem} particleSystem
 */
function callWaterCircle(e, particleSystem) {
  const x = e.offsetX;
  const y = e.offsetY;
  particleSystem.waterCircle(new Point(x, y));
}
