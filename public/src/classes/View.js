class View {

  constructor(game) {
    this.game = game;
    this.canvas = document.getElementById('view');
    this.ctx = this.canvas.getContext('2d');
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawStage();
  }

  drawStage() {
    const bg = this.game.assets['stagea-bg'];
    const platform = this.game.assets['platform1'];
    this.ctx.drawImage(bg, 0, 0, bg.width, bg.height);
    this.ctx.drawImage(platform, 0, 550, 1000, 200);
  }

}

export { View };