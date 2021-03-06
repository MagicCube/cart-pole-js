import 'babel-polyfill';
import * as tf from '@tensorflow/tfjs';

import GameEnv from './env/GameEnv';

import './index.less';

let env = null;
window.tf = tf;

function setup() {
  getAgentClass().then((Agent) => {
    // Initialize agent
    const agent = new Agent();
    agent.init();
    // Initialize game environment
    env = new GameEnv(document.getElementById('game'));
    env.agent = agent;
    // Start loop
    env.reset();
  });
}

function getAgentName() {
  const urlParams = new URLSearchParams(window.location.search);
  let agentName = urlParams.get('agent');
  if (!agentName) {
    agentName = 'Keyboard';
  }
  return agentName;
}

function getAgentClass() {
  const agentName = getAgentName();
  return import(`./agents/${agentName}Agent`).then(({ default: Agent }) => Agent );
}

document.addEventListener('DOMContentLoaded', setup);
