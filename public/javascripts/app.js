$(function() {
  var socket = window.socket = io.connect();
  
  $('#controller').bind('keypress', function(e) {
    if (e.which == 98) {
      socket.emit('handClose');
    } else if (e.which == 121) {
      socket.emit('handOpen');
    } else if (e.which == 117) {
      socket.emit('1stUp');
    } else if (e.which == 110) {
      socket.emit('1stDown');
    } else if (e.which == 106) {
      socket.emit('2ndDown');
    } else if (e.which == 107) {
      socket.emit('2ndUp');
    } else if (e.which == 104) {
      socket.emit('turnLeft');
    } else if (e.which == 108) {
      socket.emit('turnRight');
    }
  });
});