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
    this.stage = new Stage(this.rootElement);
  }

  loop() {

  }
}
