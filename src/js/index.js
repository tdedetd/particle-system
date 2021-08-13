import { Scene } from './points';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('#screen');
  const scene = new Scene(canvas);

  setTimeout(() => window.scrollTo(0, 0));

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') scene.prevTheme();
    if (e.key === 'ArrowRight') scene.nextTheme();
  });
});
