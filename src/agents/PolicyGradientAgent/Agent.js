import Agent from '../Agent';

export default class PolicyGradientAgent extends Agent {
  totalReward = 0;
  bestTotalReward = 0;

  onReset() {
    this.totalReward = 0;
  }

  react({ reward, observation }) {
    this.totalReward += reward;
    return 0;
  }

  onDone() {
    if (this.totalReward >= this.bestTotalReward) {
      this.bestTotalReward = this.totalReward;
    }
  }
}
