import Game from './Game';

import './index.less';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game(document.getElementById('cp-game'));
  window.game = game;
  game.setup();
  game.run();
  game.restart();
});
