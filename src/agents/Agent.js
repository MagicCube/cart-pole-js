/* eslint-disable */

/**
 * An agent represent a human player or AI player.
 */
export default class Agent {
  totalReward = 0;
  bestTotalReward = 0;

  /**
   * Initialize the agent.
   */
  init() {

  }

  /**
   * Get status of the agent.
   */
  getStatus() {
    return '';
  }

  /**
   * Fires everytime before a new game starts.
   */
  onReset() {
    this.totalReward = 0;
  }

  /**
   * Get action based on the current observation.
   * Reward and a boolean indicates whether the game is over are also passed
   * to this function.
   */
  react({
    observation,
    reward,
    done
  }) {
    this.totalReward += reward;
    return null;
  }

  /**
   * Fires everytime after the game is over.
   */
  onDone() {
    if (this.totalReward >= this.bestTotalReward) {
      this.bestTotalReward = this.totalReward;
    }
  }
}
