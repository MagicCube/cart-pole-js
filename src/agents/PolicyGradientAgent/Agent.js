import Agent from '../Agent';
import PolicyGradientModel from './PolicyGradientModel';

export default class PolicyGradientAgent extends Agent {
  model = null;

  init() {
    this.model = new PolicyGradientModel();
  }

  onReset() {
  }

  react({ observation, reward }) {
    const action = this.model.chooseAction(observation);
    this.model.store({
      observation,
      action,
      reward
    });
    return action;
  }

  onDone() {
    this.model.learn();
    this.model.reset();
  }
}
