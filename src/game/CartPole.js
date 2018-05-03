import { Bodies, Body, Composite, Composites } from 'matter-js';

import { CANVAS_WIDTH, CANVAS_HEIGHT, CART_WIDTH, CART_HEIGHT, GROUND_HEIGHT, POLE_WIDTH, POLE_HEIGHT } from './constants';
import PhysicalObject from './PhysicalObject';

export default class CartPole extends PhysicalObject {
  cart = null;
  pole = null;

  constructor() {
    super();
    this.initParts();
  }

  initParts() {
    this.body = Composite.create();
    const group = Body.nextGroup(true);
    const initialPosition = this.getInitialPosition();
    this.cart = Bodies.rectangle(
      initialPosition.x,
      initialPosition.y,
      CART_WIDTH,
      CART_HEIGHT,
      { collisionFilter: { group } }
    );
    this.pole = Bodies.rectangle(
      initialPosition.x,
      initialPosition.y - POLE_HEIGHT / 2,
      POLE_WIDTH,
      POLE_HEIGHT,
      { collisionFilter: { group } }
    );
    Composite.add(this.body, [this.cart, this.pole]);
    Composites.chain(this.body, 0, 0, 0, 0.5);
  }

  getInitialPosition() {
    const offsetX = CANVAS_WIDTH / 2;
    return {
      x: offsetX,
      y: CANVAS_HEIGHT - GROUND_HEIGHT - CART_HEIGHT / 2
    };
  }

  getState() {
    return [
      parseInt(this.cart.position.x - this.getInitialPosition().x, 0) / (CANVAS_WIDTH / 2),
      this.cart.velocity.x,
      this.pole.angle / Math.PI,
      this.pole.angularSpeed
    ];
  }

  getStateJSON() {
    const state = this.getStateJSON();
    return {
      cartPosition: state[0],
      cartSpeed: state[1],
      poleAngle: state[2],
      poleAngularSpeed: state[3]
    };
  }

  applyForce(forceX) {
    const obj = this.cart;
    Body.applyForce(obj, obj.position, { x: forceX, y: 0 });
  }
}
