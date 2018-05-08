import { Engine, Events, Render, Runner } from 'matter-js';

import { CANVAS_WIDTH, CANVAS_HEIGHT, INITIAL_FORCE, UNIT_FORCE } from './constants';
import CartPole from './CartPole';
import Stage from './Stage';

/**
 * The game application class.
 */
export default class Game {
  /**
   * Whether the game is running.
   */
  isRunning = false;

  /**
   * Indicates how many times the game has been played.
   */
  episode = 0;

  /**
   * Root HTML element of the game.
   */
  rootElement = null;

  /**
   * The engine of Matter.js.
   */
  engine = null;

  /**
   * The renderer of Matter.js.
   */
  renderer = null;

  /**
   * The Stage object.
   */
  stage = null;

  /**
   * Fires when update().
   */
  onUpdate = null;

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
    this.initChildren();
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
   * Initialize episode element and game over UI.
   */
  initChildren() {
    this.episodeElement = document.createElement('h2');
    this.episodeElement.className = 'episode';
    this.rootElement.appendChild(this.episodeElement);

    this.gameOverElement = document.createElement('div');
    this.gameOverElement.className = 'game-over';
    this.gameOverElement.innerText = 'GAME OVER';
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
    this.cartPole.applyForce(INITIAL_FORCE);
  }

  /**
   * Reset and start the game again.
   */
  restart() {
    this.episode += 1;
    this.episodeElement.innerText = `Episode #${this.episode}`;
    this.reset();
    this.start();
  }

  /**
   * Get a array-formed vector which indicates the game state.
   * [ cartPositionX, cartSpeed, poleAngle, poleAngularSpeed ]
   */
  getState() {
    return this.cartPole.getState();
  }

  /**
   * Check game state to see whether it is game overred.
   */
  checkState() {
    if (!this.gameOverred) {
      const state = this.cartPole.getStateJSON();
      if (Math.abs(state.cartPosition) > 0.95) {
        this.gameOver();
      } else if (Math.abs(state.poleAngle) >= 0.1) {
        this.gameOver();
      }
    }
  }

  /**
   * Updates continuously when running.
   */
  update() {
    if (!this.gameOverred) {
      this.checkState();
      if (typeof this.onUpdate === 'function') {
        this.onUpdate();
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
   * Allow dispatch actions to the game from outside.
   */
  dispatch(action) {
    let actionObj = null;
    if (typeof action === 'object') {
      actionObj = action;
    } else if (typeof action === 'number') {
      actionObj = {
        type: 'move',
        payload: action * UNIT_FORCE
      };
    } else {
      throw new Error('Unknown type of Action.');
    }

    switch (actionObj.type) {
      case 'move':
        this.cartPole.applyForce(actionObj.payload);
        break;
      case 'reset':
      case 'restart':
        this.restart();
        break;
      default:
        break;
    }
  }
}
