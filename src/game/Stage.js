import { Bodies, World } from 'matter-js';

import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  GROUND_HEIGHT
} from './constants';
import PhysicalObject from './PhysicalObject';

export default class Stage {
  world = null;

  constructor(world) {
    this.world = world;
    this.initGround();
  }

  initGround() {
    const ground = Bodies.rectangle(
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT - GROUND_HEIGHT / 2,
      CANVAS_WIDTH,
      GROUND_HEIGHT,
      {
        isStatic: true,
        render: {
          fillStyle: 'gray'
        }
      }
    );
    this.add(ground);
  }

  add(object) {
    if (object instanceof PhysicalObject) {
      World.add(this.world, object.body);
    } else {
      World.add(this.world, object);
    }
  }

  remove(object) {
    if (object instanceof PhysicalObject) {
      World.remove(this.world, object.body);
    } else {
      World.remove(this.world, object);
    }
  }

  reset() {
    World.clear(this.world, true);
  }
}
