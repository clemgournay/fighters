class Controls {

  constructor(game) {
    this.game = game;
  }

  init() {
    window.onkeypress = (e) => {
      this.game.stage.walking = false;
      this.game.stage.walkingBack = false;
      console.log(e);
      switch(e.keyCode) {
        case 110:
          this.game.stage.kick();
          break;
        case 98:
          this.game.stage.punch();
          break;
      }
    }
    window.onkeydown = (e) => {
      switch(e.keyCode) {
        case 39:
          this.game.stage.walking = true;
          this.game.stage.walkingBack = false;
          break;
        case 37:
          this.game.stage.waling = false;
          this.game.stage.walkingBack = true;
          break;
      }
    }
    window.onkeyup = (e) => {
      switch(e.keyCode) {
        case 39:
          this.game.stage.walking = false;
          break;
        case 37:
          this.game.stage.walkingBack = false;
          break;
      }
    }
  }

}

export { Controls };