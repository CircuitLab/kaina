
/**
 * Application main script.
 */

(function(exports) {
  
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
  });
  
})(this);
