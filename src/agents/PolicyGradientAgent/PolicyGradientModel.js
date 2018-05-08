import * as tf from '@tensorflow/tfjs';

export default class PolicyGradientModel {
  observations = [];
  actions = [];
  rewards = [];

  neuralNetworkModel = null;

  constructor({
    observationDim = 4,
    actionTypeCount = 2,
    learningRate = 0.01,
    rewardDecay = 0.95
  } = {}) {
    this.observationDim = observationDim;
    this.actionTypeCount = actionTypeCount;
    this.learningRate = learningRate;
    this.rewardDecay = rewardDecay;
    this.buildNNModel();
  }

  buildNNModel() {
    // Observations as the only inputs
    this.neuralNetworkModel = tf.sequential();
    this.neuralNetworkModel.add(
      tf.layers.dense({ inputShape: [this.observationDim], units: 10, activation: 'relu' })
    );
    this.neuralNetworkModel.add(
      tf.layers.dense({ units: this.actionTypeCount, activation: 'softmax' })
    );
    this.neuralNetworkModel.compile({
      optimizer: new tf.SGDOptimizer(this.learningRate),
      loss: (yTrue, yPredict) => {
        // [n, 2]
        const negtiveLogProb = tf.sum(tf.neg(tf.mul(tf.log(yPredict), yTrue)), 1);
        const loss = tf.mean(tf.mul(negtiveLogProb, tf.tensor(this.rewards)));
        return loss;
      }
    });
  }

  store({ observation, action, reward }) {
    this.observations.push(observation);
    // [left, right]
    this.actions.push(action === 1 ? [0, 1] : [1, 0]);
    this.rewards.push(reward);
  }

  reset() {
    this.observations.splice(0, this.observations.length);
    this.actions.splice(0, this.actions.length);
    this.rewards.splice(0, this.rewards.length);
  }

  chooseAction(observation) {
    const prob = this.neuralNetworkModel.predict(tf.tensor([observation])).dataSync();
    const rnd = Math.random();
    let action;
    if (rnd < prob[0]) {
      action = -1;
    } else {
      action = 1;
    }
    return action;
  }

  async learn() {
    this.processRewards();
    const inputs = tf.tensor(this.observations);
    const labels = tf.tensor(this.actions);
    await this.neuralNetworkModel.fit(inputs, labels, { epoch: 100 });
  }

  processRewards() {
    const rewards = [];
    let runningAdd = 0;
    let sum = 0;
    for (let i = this.rewards.length - 1; i >= 0; i -= 1) {
      runningAdd = runningAdd * this.rewardDecay + this.rewards[i];
      sum += runningAdd;
      rewards.unshift(runningAdd);
    }
    const mean = sum / this.rewards.length;
    this.rewards = rewards.map((reward) => (reward - mean) / mean);
  }
}
