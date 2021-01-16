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
      id: 'stagea-bg',
      type: 'img',
      src: './assets/images/stages/stageA/background.jpg'
    }, {
      id: 'platform1',
      type: 'img',
      src: './assets/images/stages/stageA/platform1.png'
    }], (assets) => {
      this.assets = assets;
      this.game.assets = assets;
      this.game.run();
    })
    
  }

}

export { App };