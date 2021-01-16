module.exports = (server) => {

  const io = require('socket.io')(server);

  io.on('connection', (socket) => {

    io.emit('news', 'blabla');

  });

}