import { Points } from './points';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('#screen');
  const points = new Points(canvas);
  points.start();

  setTimeout(() => window.scrollTo(0, 0));

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') points.prevTheme();
    if (e.key === 'ArrowRight') points.nextTheme();
  });
});
