import { AssetsLoader } from './AssetsLoader.js';
import { Game } from './Game.js';

class App {

  constructor() {
    this.loader = new AssetsLoader();
    this.game = new Game(this);
    this.assets = null;
  }

  init() {
    this.loader.load([{
      id: 'ground',
      type: 'img',
      src: './assets/images/textures/ground.png'
    }], (assets) => {
      this.assets = assets;
      this.game.assets = assets;
      this.game.run();
    })
    
  }

}

export { App };