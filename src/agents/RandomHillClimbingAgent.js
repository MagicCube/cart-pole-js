import Agent from './Agent';

const SHIFT_RATE_DISCOUNT = 0.9;

export default class RandomHillClimbingAgent extends Agent {
  bestTotalReward = 0;
  bestWeights = null;
  shiftRate = 0.1;

  onGameOver() {
    if (this.totalReward >= this.bestTotalReward) {
      this.bestTotalReward = this.totalReward;
      // Clone the weights as the best weights.
      this.bestWeights = this.weights.slice(0);
      console.info('Best Weights yet: ', this.bestWeights);
    }
  }

  onReset() {
    if (this.bestWeights) {
      this.weights = [
        this.bestWeights[0] + (Math.random() * 2 - 1) * this.shiftRate,
        this.bestWeights[1] + (Math.random() * 2 - 1) * this.shiftRate,
        this.bestWeights[2] + (Math.random() * 2 - 1) * this.shiftRate,
        this.bestWeights[3] + (Math.random() * 2 - 1) * this.shiftRate
      ];
      this.shiftRate = this.shiftRate * SHIFT_RATE_DISCOUNT;
    } else {
      this.weights = [
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ];
      // Some of the best random weights found
      // during my tests.
      //
      // this.weights = [
      //   0.08594547751885492,
      //   0.05424044854801209,
      //   0.6749857288583574,
      //   1.1543822129355774
      // ];
      // this.weights = [
      //   0.22954301190558787,
      //   0.00089575518357142,
      //   0.5877188457671694,
      //   0.40653325525236206
      // ];
      // this.weights = [
      //   -0.000017151126494484564,
      //   0.03517469972639349,
      //   0.6285225983823242,
      //   0.3363100779954527
      // ];
    }
    this.totalReward = 0;
    console.info(this.weights.toString());
  }

  react({ reward, observation }) {
    this.totalReward += reward;
    let result = 0;
    for (let i = 0; i < 3; i += 1) {
      result += observation[i] * this.weights[i];
    }
    return result > 0 ? 1 : -1;
  }
}
