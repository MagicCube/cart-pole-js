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

  async executeAction(action) {
    const FORCE = 0.03;
    switch (action) {
      case 1:
        this.cartPole.applyForce(FORCE);
        break;
      case -1:
        this.cartPole.applyForce(-FORCE);
        break;
      default:
        break;
    }
  }

  async getObservation() {
    return this.game.getState();
  }

  async step(action) {
    await this.executeAction(action);
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
