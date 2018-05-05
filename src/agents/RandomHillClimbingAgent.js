import Agent from './Agent';

const DIVERSITY = 0.1;

export default class RandomHillClimbingAgent extends Agent {
  bestTotalReward = 0;
  bestWeights = null;

  onGameOver() {
    if (this.totalReward >= this.bestTotalReward) {
      this.bestTotalReward = this.totalReward;
      // Clone the weights as the best weights.
      this.bestWeights = this.weights.slice(0);
    }
  }

  onReset() {
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
      // Some of the best random weights found
      // during my tests.
      //
      // this.weights = [ 0.12272906098273229, 0.05171682834523206, 0.7746913490599949, 1.109145679262887 ];
      // this.weights = [ 0.22954301190558787, 0.00089575518357142, 0.5877188457671694, 0.40653325525236206 ]
      // this.weights = [ 0.029339054268042605, 0.034424966244165224, 0.5089348031645287, 0.4829329102598643 ]
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
