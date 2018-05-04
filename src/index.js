import GameEnv from './env/GameEnv';

import './index.less';

let env = null;

function setup() {
  getAgentClass().then((Agent) => {
    // Initialize agent
    const agent = new Agent();
    agent.init();
    // Initialize game environment
    env = new GameEnv(document.getElementById('cp-game'));
    env.agent = agent;
    // Start loop
    env.reset();
  });
}

function getAgentClass() {
  const urlParams = new URLSearchParams(window.location.search);
  let agentName = urlParams.get('agent');
  if (!agentName) {
    agentName = 'Keyboard';
  }
  return import(`./agents/${agentName}Agent`).then(({ default: Agent }) => Agent );
}

document.addEventListener('DOMContentLoaded', setup);
