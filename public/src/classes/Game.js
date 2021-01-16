import { View } from './View.js';
import { Sync } from './Sync.js';

class Game {

  constructor() {
    this.view = new View(this);
    this.sync = new Sync();
    this.assets = null;
  }

  run() {
    this.update();
  }

  update() {
    this.view.update();
    window.requestAnimationFrame(() => {
      this.update();
    });
  }


}

export { Game };