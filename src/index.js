import GameEnv from './env/GameEnv';

import './index.less';

let env = null;

document.addEventListener('DOMContentLoaded', () => {
  env = new GameEnv(document.getElementById('cp-game'));
  window.env = env;
  env.reset();
});


window.addEventListener('keydown', ({ key }) => {
  switch (key.toLowerCase()) {
    case 'arrowright':
      env.step(1);
      break;
    case 'arrowleft':
      env.step(-1);
      break;
    case 'r':
      env.reset();
      break;
    default:
      break;
  }
});
