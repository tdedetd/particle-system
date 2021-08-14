import { Point } from './helpers/point';
import { ParticleSystem } from './particle-system';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('#screen');
  const particleSystem = new ParticleSystem(canvas);
  particleSystem.start();

  setTimeout(() => window.scrollTo(0, 0));

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') particleSystem.prevTheme();
    if (e.key === 'ArrowRight') particleSystem.nextTheme();
  });

  canvas.addEventListener('click', e => {
    const x = e.offsetX;
    const y = e.offsetY;
    particleSystem.waterCircle(new Point(x, y));
  });
});
