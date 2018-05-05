import Agent from './Agent';

const SHIFT_RATE_DISCOUNT = 0.92;

export default class RandomHillClimbingAgent extends Agent {
  bestTotalReward = 0;
  bestWeights = null;
  shiftRate = 0.1;

  onReset() {
    if (this.bestWeights) {
      this.weights = [
        this.bestWeights[0] + (Math.random() * 2 - 1) * this.shiftRate,
        this.bestWeights[1] + (Math.random() * 2 - 1) * this.shiftRate,
        this.bestWeights[2] + (Math.random() * 2 - 1) * this.shiftRate,
        this.bestWeights[3] + (Math.random() * 2 - 1) * this.shiftRate
      ];
    } else {
      this.weights = [
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ];
      // Some of the best random weights found
      // during my tests.
      // this.weights = [
      //   -0.000017151126494484564,
      //   0.03517469972639349,
      //   0.6285225983823242,
      //   0.3363100779954527
      // ];
      // this.weights = [
      //   0.06233402876552712,
      //   0.006498441905731317,
      //   0.6284282919692565,
      //   1.0538654805754197
      // ];
      // this.weights = [
      //   0.26681476527677067,
      //   0.006037232012131644,
      //   0.6322826312537404,
      //   0.45005498159847745
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

  onGameOver() {
    if (this.totalReward >= this.bestTotalReward) {
      this.bestTotalReward = this.totalReward;
      // Decrease the shift rate.
      this.shiftRate = this.shiftRate * SHIFT_RATE_DISCOUNT;
      // Clone the weights as the best weights.
      this.bestWeights = this.weights.slice(0);
      console.info('New record!');
    }
  }
}
