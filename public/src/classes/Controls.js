class Controls {

  constructor(game) {
    this.game = game;
  }

  init() {
    window.onkeypress = (e) => {
      console.log(e);
      switch(e.keyCode) {
        case 107:
          this.game.stage.kick();
          break;
        case 112:
          this.game.stage.punch();
          break;
      }
    }
    window.onkeydown = (e) => {
      switch(e.keyCode) {
        case 39:
          this.game.stage.walking = true;
          break;
      }
    }
    window.onkeyup = (e) => {
      switch(e.keyCode) {
        case 39:
          this.game.stage.walking = false;
          break;
      }
    }
  }

}

export { Controls };