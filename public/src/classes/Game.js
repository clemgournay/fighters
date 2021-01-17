import { Stage } from './Stage.js';
import { Sync } from './Sync.js';

class Game {

  constructor() {
    this.stage = new Stage(this);
    this.sync = new Sync();
    this.assets = null;
  }

  run() {
    this.stage.init();
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