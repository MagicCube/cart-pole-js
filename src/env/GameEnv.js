import Game from '../game/Game';

/**
 * The environment of Cart Pole game.
 */
export default class GameEnv {
  game = null;
  agent = null;

  constructor(rootElement) {
    this.game = new Game(rootElement);
    this.game.onUpdate = this.handleUpdate;
    this.game.init();
  }

  handleUpdate = () => {
    if (this.agent) {
      const action = this.agent.react({
        observation: this.getObservation(),
        reward: this.game.gameOverred ? 0 : 1,
        done: this.game.gameOverred
      });
      if (action) {
        this.game.dispatch(action);
      }
      document.getElementById('cp-status').innerText = this.agent.getStatus();
    }
  };

  getObservation() {
    return this.game.getState();
  }

  reset() {
    this.game.restart();
    const observation = this.getObservation();
    return observation;
  }
}
