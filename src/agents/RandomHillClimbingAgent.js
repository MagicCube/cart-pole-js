import Agent from './Agent';

const DIVERSITY = 0.08;

export default class RandomHillClimbingAgent extends Agent {
  bestTotalReward = 0;
  bestWeights = null;

  getStatus() {
    return `Current Weights: ${this.weights}\nBest Weights: ${this.bestWeights ? this.bestWeights : 'N/A'}`;
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
        this.bestWeights[2] + (Math.random() * 2 - 1) * DIVERSITY,
        this.bestWeights[3] + (Math.random() * 2 - 1) * DIVERSITY
      ];
    } else {
      this.weights = [
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ];
      // One of the best random weights found
      // during my test(Episode #22).
      //
      this.weights = [
        0.03,
        0.0435,
        0.8463,
        0.832
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
