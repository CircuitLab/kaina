
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
    
    /*
    socket.on('handClose', function() {
      arm.closeHand();
    });
    socket.on('handClose:stop', function() {
      arm._off(arm.pins.closeHand);
    });
    */
    
    /*
    socket.on('handOpen', function() {
      arm.openHand();
    });
    socket.on('handOpen:stop', function() {
      arm._off(arm.pins.openHand);
    });
    */
    
    socket.on('1stUp', function() {
      arm.upFirst();
    });
    socket.on('1stUp:stop', function() {
      arm._off(arm.pins.upFirst);
    });
    
    socket.on('1stDown', function() {
      arm.downFirst();
    });
    socket.on('1stDown:stop', function() {
      arm._off(arm.pins.downFirst);
    });
    
    socket.on('2ndUp', function() {
      arm.upSecond();
    });
    socket.on('2ndUp:stop', function() {
      arm._off(arm.pins.upSecond);
    });
    
    socket.on('2ndDown', function() {
      arm.downSecond();
    });
    socket.on('2ndDown:stop', function() {
      arm._off(arm.pins.downSecond);
    });
    
    socket.on('turnLeft', function() {
      arm.turnLeft();
    });
    socket.on('turnLeft:stop', function() {
      arm._off(arm.pins.turnLeft);
    });
    
    socket.on('turnRight', function() {
      arm.turnRight();
    });
    socket.on('turnRight:stop', function() {
      arm._off(arm.pins.turnRight);
    });
    
    socket.on('capture', function(data) {
      io.sockets.volatile.emit('capture', data);
    });
  });
  
  return io;
};
