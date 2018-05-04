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

  async getObservation() {
    return this.game.getState();
  }

  async step(action) {
    this.game.dispatch(action);
    const observation = await this.getObservation();
    const gameOver = false;
    return {
      observation,
      reward: 1, // In Cart Pole game, the reward is always +1 before game over.
      done: gameOver
    };
  }

  async reset() {
    if (!this.game.isRunning) {
      this.game.run();
    }
    this.game.restart();
    const observation = await this.getObservation();
    return observation;
  }
}
