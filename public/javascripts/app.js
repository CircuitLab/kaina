
/**
 * Application main script.
 */

(function(exports) {
  
  /**
   * Connect to Socket.IO server.
   */
  
  var socket = exports.socket = io.connect();
  
  /**
   * Charactor code and evnet pair.
   */
  
  var charCode = {
      98: 'handClose'
    , 121: 'handOpen'
    , 117: '1stUp'
    , 110: '1stDown'
    , 106: '2ndDown'
    , 107: '2ndUp'
    , 104: 'turnLeft'
    , 108: 'turnRight'
  };
  
  
  /**
   * Bootstrap.
   */
  
  $(function() {
  
    /**
     * Handle `keydown` and `keypress` event.
     */
    
    $(document).on('keypress', function(e) {
      var event = charCode[e.charCode];
      if (event) {
        socket.emit(event);
      }
    });
    
    /**
     * Handle `keyup` event.
     */
    
    $(document).on('keyup', function(e) {
      var event = charCode[e.charCode];
      if (event) {
        socket.emit(event + ':stop');
      }
    });
    
    /**
     * Handle `capture` evnet.
     */
    
    socket.on('capture', function(data) {
      document.body.style.backgroundImage = 'url(' + data + ')';
    });
  });
  
})(this);
