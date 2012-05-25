
/**
 * Module dependencies.
 */

var socket = require('socket.io');

module.exports = function(app, arm) {
  var io = socket.listen(app);
  
  io.configure(function() {
    io.set('log', false);
  });
  
  io.sockets.on('connection', function(socket) {
    socket.on('handClose', function() {
      arm.closeHand();
    });
    
    socket.on('handOpen', function() {
      arm.openHand();
    });
    
    socket.on('1stUp', function() {
      arm.upFirst();
    });
    
    socket.on('1stDown', function() {
      arm.downFirst();
    });
    
    socket.on('2ndUp', function() {
      arm.upSecond();
    });
    
    socket.on('2ndDown', function() {
      arm.downSecond();
    });
    
    socket.on('turnLeft', function() {
      arm.turnLeft();
    });
    
    socket.on('turnRight', function() {
      arm.turnRight();
    });
    
    socket.on('capture', function(data) {
      io.sockets.emit('capture', data);
    });
  });
  
  return io;
};