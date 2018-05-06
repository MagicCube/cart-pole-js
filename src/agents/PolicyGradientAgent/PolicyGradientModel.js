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
    this.inputObservations = tf.input({ shape: [4] });
    const denseLayer1 = tf.layers.dense({ units: 10, activation: 'relu' });
    const denseLayer2 = tf.layers.dense({
      units: this.actionTypeCount,
      activation: 'softmax'
    });
    this.outputActions = denseLayer2.apply(
      denseLayer1.apply(this.inputObservations)
    );
    this.neuralNetworkModel = tf.model({
      inputs: this.inputObservations,
      outputs: this.outputActions
    });
  }

  store({ observation, action, reward }) {
    this.observations.push(observation);
    this.actions.push(action);
    this.rewards.push(reward);
  }

  reset() {
    this.observations.splice(0, this.observations.length);
    this.actions.splice(0);
    this.rewards.splice(0);
  }

  chooseAction(observation) {
    const weights = tf.tensor([
      0.2,
      0,
      0.6,
      0.4
    ]);
    const results = tf.sum(tf.mul(tf.tensor(observation), weights));
    return results.dataSync()[0] > 0 ? 1 : -1;
  }

  learn() {

  }
}
