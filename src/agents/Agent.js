/* eslint-disable */

export default class Agent {
  totalReward = 0;
  bestTotalReward = 0;

  init() {

  }

  getStatus() {
    return '';
  }

  onReset() {
    this.totalReward = 0;
  }

  react({
    observation,
    reward,
    done
  }) {
    this.totalReward += reward;
    return null;
  }

  onGameOver() {
    if (this.totalReward >= this.bestTotalReward) {
      this.bestTotalReward = this.totalReward;
    }
  }
}
