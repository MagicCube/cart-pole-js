import { Engine, Events, Render } from 'matter-js';

import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants';
import CartPole from './CartPole';
import Stage from './Stage';

/**
 * The game application class.
 */
export default class Game {
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
  setup() {
    this.initMatterJS();
    this.stage = new Stage(this.engine.world);
    window.addEventListener('keydown', this.handleKeyDown);
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
  }

  handleAfterUpdate = () => {
    this.update();
  };

  handleKeyDown = ({ key }) => {
    switch (key) {
      case 'ArrowLeft':
        this.cartPole.applyForce(-0.03);
        break;
      case 'ArrowRight':
        this.cartPole.applyForce(0.03);
        break;
      default:
        break;
    }
  };

  /**
   * Run the game.
   */
  run() {
    Engine.run(this.engine);
    Render.run(this.renderer);
    Events.on(this.engine, 'afterUpdate', this.handleAfterUpdate);
  }

  /**
   * Reset the game to the beginning state.
   */
  reset() {
    this.stage.reset();
    this.cartPole = new CartPole();
    this.stage.add(this.cartPole);
  }

  /**
   * Start the game.
   */
  start() {
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
   *
   */
  update() {
  }
}
