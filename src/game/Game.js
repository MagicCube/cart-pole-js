import { Engine, Events, Render, Runner } from 'matter-js';

import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants';
import CartPole from './CartPole';
import Stage from './Stage';

const DEFAULT_FORCE = 0.03;

/**
 * The game application class.
 */
export default class Game {
  /**
   * Returns wheather the game is running.
   */
  isRunning = false;

  /**
   * Root HTML element of the game.
   */
  rootElement = null;

  /**
   * The engine of Matter.js
   */
  engine = null;

  /**
   * The renderer of Matter.js
   */
  renderer = null;

  /**
   * The Stage object.
   */
  stage = null;

  /**
   * Construct the Game application.
   * @param {*} rootElement
   */
  constructor(rootElement) {
    this.rootElement = rootElement;
  }

  /**
   * Construct and initialize objects in the game.
   */
  init() {
    this.initMatterJS();
    this.initGameOver();
    this.stage = new Stage(this.engine.world);
    this.reset();
  }

  /**
   * Initialize engine and renderer of Matter.js.
   */
  initMatterJS() {
    this.engine = Engine.create();
    this.renderer = Render.create({
      element: this.rootElement,
      engine: this.engine,
      options: {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        wireframes: false,
        background: '#ffff'
      }
    });
    this.runner = Runner.create();
  }

  /**
   * Initialize game over UI.
   */
  initGameOver() {
    this.gameOverElement = document.createElement('div');
    this.gameOverElement.className = 'cp-game-over';
    this.gameOverElement.innerText = 'GAME OVER';
  }

  getState() {
    return this.cartPole.getState();
  }

  getStateJSON() {
    return this.cartPole.getStateJSON();
  }

  handleAfterUpdate = () => {
    this.update();
  };

  /**
   * Start game running.
   */
  run() {
    Runner.run(this.runner, this.engine);
    Render.run(this.renderer);
    Events.on(this.engine, 'afterUpdate', this.handleAfterUpdate);
    this.isRunning = true;
  }

  /**
   * Stop game running.
   */
  stop() {
    Runner.stop(this.runner);
    Render.stop(this.renderer);
    this.isRunning = false;
  }

  /**
   * Reset the game to the beginning state.
   */
  reset() {
    this.gameOverred = false;
    this.gameOverElement.remove();
    this.stage.reset();
    this.cartPole = new CartPole();
    this.stage.add(this.cartPole);
  }

  /**
   * Start the game.
   */
  start() {
    if (!this.isRunning) {
      this.run();
    }
    // Apply a slight force to break the balance after the game begins.
    const SLIGHT_FORCE = 0.008;
    this.cartPole.applyForce(SLIGHT_FORCE * Math.random() - SLIGHT_FORCE / 2);
  }

  /**
   * Reset and start the game again.
   */
  restart() {
    this.reset();
    this.start();
  }

  /**
   * Updates continuously when running.
   */
  update() {
    document.getElementById('cp-info').innerText = this.cartPole.getState().map(value => value.toFixed(2)).join('\n');
    const [cartPos, , poleAngle] = this.cartPole.getState();
    if (!this.gameOverred) {
      if (Math.abs(cartPos) > 0.95) {
        this.gameOver();
      } else if (Math.abs(poleAngle) >= 0.5) {
        this.gameOver();
      }
    }
  }

  /**
   * Show game over UI.
   */
  gameOver() {
    this.gameOverred = true;
    this.rootElement.appendChild(this.gameOverElement);
  }

  /**
   *
   */
  dispatch(action) {
    let actionObj = null;
    if (typeof action === 'object') {
      actionObj = action;
    } else if (typeof action === 'number') {
      actionObj = {
        type: 'move',
        payload: action * DEFAULT_FORCE
      };
    } else {
      throw new Error('Unknown type of Action.');
    }
    if (actionObj.type === 'move') {
      this.cartPole.applyForce(actionObj.payload);
    }
  }
}
