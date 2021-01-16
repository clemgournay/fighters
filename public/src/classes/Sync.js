class Sync {

  constructor() {
    this.socket = io(window.location.href);
  }

  init() {
    this.socket.on('news', function(msg){
      console.log(msg)
    });
  }

}

export { Sync };