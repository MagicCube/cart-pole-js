import Agent from './Agent';

const DIVERSITY = 0.08;

export default class RandomHillClimbingAgent extends Agent {
  totalReward = 0;
  bestTotalReward = 0;
  bestWeights = null;

  getStatus() {
    return `Current Total Reward: ${this.totalReward}\nCurrent Weights: ${this.weights}\nBest Total Reward: ${this.bestTotalReward}\nBest Weights: ${this.bestWeights}`;
  }

  onGameOver() {
    if (this.totalReward > this.bestTotalReward) {
      console.info('New record!', this.totalReward);
      this.bestTotalReward = this.totalReward;
      // Clone the weights as the best weights.
      this.bestWeights = this.weights.slice(0);
    }
  }

  onReset() {
    this.totalReward = 0;
    if (this.bestWeights) {
      this.weights = [
        this.bestWeights[0] + (Math.random() * 2 - 1) * DIVERSITY,
        this.bestWeights[1] + (Math.random() * 2 - 1) * DIVERSITY,
        this.bestWeights[2] + (Math.random() * 2 - 1) * DIVERSITY
      ];
    } else {
      this.weights = [
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ];
    }
  }

  react({
    reward,
    observation
  }) {
    this.totalReward += reward;
    let result = 0;
    for (let i = 0; i < 3; i += 1) {
      result += observation[i] * this.weights[i];
    }
    return result > 0 ? 1 : -1;
  }
}
