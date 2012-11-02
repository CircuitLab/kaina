
/**
 * Module dependencies.
 */

var socket = require('socket.io');

module.exports = function(app, arm) {
  var io = socket.listen(app);

  io.configure(function() {
   // io.set('log', 'production' !== process.env.NODE_ENV);
    io.set('log', false);
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

    socket.on('handsOpen', function(data) {
      arm.handsOpen();
    });

    socket.on('handsClose', function(data) {
      arm.handsClose();
    });

    socket.on('handsOpenStop', function(data) {
      arm.handsStop();
    });

    socket.on('handsCloseStop', function(data) {
      arm.handsStop();
    });

    socket.on('elbowUp', function(data) {
      arm.elbowUp();
    });

    socket.on('elbowDown', function(data) {
      arm.elbowDown();
    });

    socket.on('elbowUpStop', function(data) {
      arm.elbowStop();
    });

    socket.on('elbowDownStop', function(data) {
      arm.elbowStop();
    });

    socket.on('shoulderUp', function(data) {
      arm.shoulderUp();
    });

    socket.on('shoulderDown', function(data) {
      arm.shoulderDown();
    });

    socket.on('shoulderUpStop', function(data) {
      arm.shoulderStop();
    });

    socket.on('shoulderDownStop', function(data) {
      arm.shoulderStop();
    });

    socket.on('baseRotate', function(data) {
      arm.baseRotate();
    });

    socket.on('baseReverse', function(data) {
      arm.baseReverse();
    });

    socket.on('baseRotateStop', function(data) {
      arm.baseStop();
    });

    socket.on('baseReverseStop', function(data) {
      arm.baseStop();
    });

    socket.on('capture', function(data) {
      io.sockets.volatile.emit('capture', data);
    });
  });

  return io;
};
