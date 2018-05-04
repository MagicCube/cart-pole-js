import Game from '../game/Game';

/**
 * The environment of Cart Pole game.
 */
export default class GameEnv {
  game = null;

  constructor(rootElement) {
    this.game = new Game(rootElement);
    this.game.init();
  }

  getObservation() {
    return this.game.getState();
  }

  step(action) {
    this.game.dispatch(action);
    const observation = this.getObservation();
    const gameOverred = this.game.gameOverred;
    return {
      observation,
      reward: gameOverred ? 0 : 1, // In Cart Pole game, the reward is always +1 before game over.
      done: gameOverred
    };
  }

  reset() {
    this.game.restart();
    const observation = this.getObservation();
    return observation;
  }
}
