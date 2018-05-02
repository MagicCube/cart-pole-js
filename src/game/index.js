import Game from './Game';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game(document.body);
  window.game = game;
  game.setup();
  game.run();
  game.restart();
});
