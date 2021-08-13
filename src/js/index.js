import { Scene } from './points';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('#screen');
  new Scene(canvas);

  setTimeout(() => window.scrollTo(0, 0));
});
