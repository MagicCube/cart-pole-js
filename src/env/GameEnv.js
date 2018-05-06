import Game from '../game/Game';

import BarChart from '../vis/BarChart';

/**
 * The environment of Cart Pole game.
 */
export default class GameEnv {
  REACT_INTERVAL = 100;
  game = null;
  agent = null;
  lastReactTime = 0;
  totalReward = 0;
  bestReward = 0;
  bestEpisode = 0;

  constructor(rootElement) {
    this.game = new Game(rootElement);
    this.game.onUpdate = this.handleUpdate;
    this.game.init();
    this.barChart = new BarChart(document.getElementById('page'));
  }

  handleUpdate = () => {
    if (this.agent) {
      if (this.game.gameOverred) {
        this.barChart.append(this.game.episode, this.totalReward);
        if (this.bestReward <= this.totalReward) {
          this.bestReward = this.totalReward;
          this.bestEpisode = this.game.episode;
        }
        // Send the last state to the agent.
        this.agent.react({
          observation: this.game.getState(),
          reward: 0,
          done: true
        });
        this.agent.onDone();
        // Display the Game Over UI for a while.
        setTimeout(() => {
          this.reset();
        }, 600);
      } else if (
        this.lastReactTime === 0 ||
        Date.now() - this.lastReactTime > this.REACT_INTERVAL
      ) {
        this.lastReactTime = Date.now();
        this.totalReward += 1;
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
      document.getElementById('totalReward').innerText = `${this.totalReward} @ Episode #${this.game.episode}`;
      if (this.bestEpisode !== 0) {
        document.getElementById('bestReward').innerText = `${
          this.bestReward
        } @ Episode #${this.bestEpisode}`;
      } else {
        document.getElementById('bestReward').innerText = 'N/A';
      }
      document.getElementById('status').innerText = this.agent.getStatus();
    }
  };

  reset() {
    this.totalReward = 0;
    this.lastReactTime = 0;
    if (this.agent) {
      this.agent.onReset();
    }
    this.game.restart();
  }
}
