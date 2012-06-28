
/**
 * Application main script.
 */

(function(exports) {

  /**
   * Gravitational acceleration.
   */
  
  var g = 9.80665;
  
  /**
   * Connect to Socket.IO server.
   */
  
  var socket = exports.socket = io.connect();
  
  /**
   * Bootstrap.
   */
  
  $(function() {
  
    /**
     * Handle `change` event.
     */
    
    $('[type=range]').on('change', function(e) {
      var $target = $(e.target);
      console.log($target.attr('id'), $target.val());
      socket.emit($target.attr('id'), $target.val());
    });
    
    /**
     * Handle `capture` evnet.
     */
    
    socket.on('capture', function(data) {
      document.body.style.backgroundImage = 'url(' + data + ')';
    });

    /**
     * Cover background image.
     */
    
    $(window).on('resize', function(e) {
      $('body').css('height', window.innerHeight);
    }).trigger('resize');
    
    /**
     * Handle `devicemotion` event.
     */
    
    /*
    (function() {
      var x = 0, y = 0, z = 0;
      
      window.addEventListener('devicemotion', function(e) {
        var accel = e.accelerationIncludingGravity;
        
        x = accel.x;
        y = accel.y;
        z = accel.z;
      });
      
      window.setInterval(function() {
        var x1 = Math.abs(x) / g
          , y1 = Math.abs(y) / g
          , z1 = Math.abs(z) / g;

        if (x1 > g) x1 = g;
        if (y1 > g) y1 = g;
        if (z1 > g) z1 = g;
        
        socket
          .emit('elbow', y1 * (180 / g))
          .emit('wrist', z1 * (180 / g));
      }, 1000);
    })();
    */
  });
  
})(this);
