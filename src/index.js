import GameEnv from './env/GameEnv';
import KeyboardAgent from './agents/KeyboardAgent';

import './index.less';

let env = null;

function setup() {
  // Initialize agent
  const agent = new KeyboardAgent();
  agent.init();
  // Initialize game environment
  env = new GameEnv(document.getElementById('cp-game'));
  env.agent = agent;
  // Start loop
  env.reset();
}

document.addEventListener('DOMContentLoaded', setup);
