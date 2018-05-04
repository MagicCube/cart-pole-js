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
      if (this.game.gameOverred) {
        // Send the last state to the agent.
        this.agent.react({
          observation: this.game.getState(),
          reward: 0,
          done: true
        });
        this.agent.onGameOver();
        // Display the Game Over UI for a while.
        setTimeout(() => {
          this.reset();
        }, 600);
      } else {
        // Send the state to the agent
        const action = this.agent.react({
          observation: this.game.getState(),
          reward: 1,
          done: false
        });
        // And send the action in return
        if (action) {
          this.game.dispatch(action);
        }
      }
      // Update status.
      document.getElementById('cp-status').innerText = this.agent.getStatus();
    }
  };

  reset() {
    if (this.agent) {
      this.agent.onReset();
    }
    this.game.restart();
  }
}
