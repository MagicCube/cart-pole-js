import Game from './game/Game';

import './index.less';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game(document.getElementById('cp-game'));
  window.game = game;
  game.init();
  game.run();
  game.restart();
});
