import 'babel-polyfill';
import * as tf from '@tensorflow/tfjs';

import GameEnv from './env/GameEnv';
import PolicyAgent from './agents/PolicyGradientAgent';
import KeyboardAgent from './agents/KeyboardAgent';
import RandomHillClimbingAgent from './agents/RandomHillClimbingAgent';

import './index.less';

let env = null;
window.tf = tf;

function setup() {
  const agent = getAgentClass();
  // Initialize agent
  agent.init();
  // Initialize game environment
  env = new GameEnv(document.getElementById('game'));
  env.agent = agent;
  // Start loop
  env.reset();
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
  let agent;
  switch (agentName) {
    case 'Random':
      agent = new RandomHillClimbingAgent();
      break;
    case 'Keyboard':
      agent = new KeyboardAgent();
      break;
    case 'Policy':
      agent = new PolicyAgent();
      break;
    default:
      console.error('Unknown agent');
  }

  return agent;
}

document.addEventListener('DOMContentLoaded', setup);
