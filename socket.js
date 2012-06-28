
/**
 * Module dependencies.
 */

var socket = require('socket.io');

module.exports = function(app, arm) {
  var io = socket.listen(app);
  
  io.configure(function() {
    io.set('log', 'production' !== process.env.NODE_ENV);
  });
  
  io.sockets.on('connection', function(socket) {
    socket.on('wrist', function(data) {
      arm.wrist(data);
    });
    
    /*
    socket.on('base', function(data) {
      arm.base(data);
    });
    */
    
    socket.on('elbow', function(data) {
      arm.elbow(data);
    });
  });
  
  return io;
};
