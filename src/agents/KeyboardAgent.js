import Agent from './Agent';

export default class KeyboardAgent extends Agent {
  requestRight = false;
  requestLeft = false;
  requestReset = false;

  init() {
    window.addEventListener('keydown', ({ key }) => {
      switch (key.toLowerCase()) {
        case 'arrowright':
          this.requestRight = true;
          break;
        case 'arrowleft':
          this.requestLeft = true;
          break;
        case 'r':
          this.requestReset = true;
          break;
        default:
          break;
      }
    });
    window.addEventListener('keyup', ({ key }) => {
      switch (key.toLowerCase()) {
        case 'arrowright':
          this.requestRight = false;
          break;
        case 'arrowleft':
          this.requestLeft = false;
          break;
        default:
          break;
      }
    });
  }

  getStatus() {
    return 'Use Left or Right arrow to move the cart. Press "R" key to restart the game.';
  }

  react() {
    if (this.requestRight) {
      return 1;
    } else if (this.requestLeft) {
      return -1;
    } else if (this.requestReset) {
      this.requestReset = false;
      return {
        type: 'reset'
      };
    }
    return null;
  }
}
