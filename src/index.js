import 'babel-polyfill';

import GameEnv from './env/GameEnv';

import './index.less';

document.addEventListener('DOMContentLoaded', async () => {
  const env = new GameEnv(document.getElementById('cp-game'));
  window.env = env;
  const result = await env.reset();
  console.log(result);
});
