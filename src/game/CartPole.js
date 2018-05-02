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
    const offsetX = CANVAS_WIDTH / 2;
    const group = Body.nextGroup(true);
    this.cart = Bodies.rectangle(
      offsetX,
      CANVAS_HEIGHT - GROUND_HEIGHT - CART_HEIGHT / 2,
      CART_WIDTH,
      CART_HEIGHT,
      { collisionFilter: { group } }
    );
    this.pole = Bodies.rectangle(
      offsetX,
      CANVAS_HEIGHT - GROUND_HEIGHT - CART_HEIGHT / 2 - POLE_HEIGHT / 2,
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
    return {
      poleAngle: this.pole.angle,
      poleAngularSpeed: this.pole.angularSpeed
    };
  }

  applyForce(forceX) {
    const obj = this.cart;
    Body.applyForce(obj, obj.position, { x: forceX, y: 0 });
  }
}
