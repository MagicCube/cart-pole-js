import Agent from '../Agent';
import PolicyGradientModel from './PolicyGradientModel';

export default class PolicyGradientAgent extends Agent {
  model = null;

  init() {
    this.model = new PolicyGradientModel();
  }

  onReset() {
    this.model.reset();
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

  async onDone() {
    await this.model.learn();
  }
}
