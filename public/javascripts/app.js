
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
  console.log("start");

  $(function() {

    /**
     * Handle `change` event.
     */

    $('[type=button]').on('mousedown touchstart', function(e) {
      var $target = $(e.target);
      console.log($target.attr('id'), $target.val());
      socket.emit($target.attr('id'));
    });

    $('[type=button]').on('mouseup touchend', function(e) {
      var $target = $(e.target);
      console.log($target.attr('id'), $target.val());
      socket.emit($target.attr('id') + "Stop");
    });

    /**
     * Handle `capture` evnet.
     */

    socket.on('capture', function(data) {
      // document.body.style.backgroundImage = 'url(' + data + ')';
      setTimeout(function() { $('#camera').attr('src', data); }, 10);
    });

    /**
     * Cover background image.
     */

    $(window).on('resize', function(e) {
      $('body').css('height', window.innerHeight);
    }).trigger('resize');
  });

})(this);
