import { Stage } from './Stage.js';
import { Sync } from './Sync.js';
import { Controls } from './Controls.js';

class Game {

  constructor() {
    this.stage = new Stage(this);
    this.sync = new Sync(this);
    this.controls = new Controls(this);
    this.assets = null;
  }

  run() {
    this.stage.init();
    this.controls.init();
    this.update();
  }

  update() {
    this.stage.update();
    window.requestAnimationFrame(() => {
      this.update();
    });
  }


}

export { Game };