
/**
 * Administration main script.
 */

(function(exports) {
  
  /**
   * Connect to Socket.IO server.
   */
  
  var socket = exports.socket = io.connect()
    , width = 960 / 4, height = 720 / 4;
  
  /**
   * Bootstrap.
   */
  
  $(function() {
    
    /**
     * Stream with WebRTC.
     */
    
    navigator.webkitGetUserMedia(
        { audio: true, video: true }
      , function(stream) {
          var url = webkitURL.createObjectURL(stream)
            , canvas = document.createElement('canvas')
            , ctx = canvas.getContext('2d')
            , video = document.createElement('video');
          
          
          /**
           * Initialize off-screen canvas element.
           */
          
          canvas.width = width;
          canvas.height = height;
          
          /**
           * Initialize monitor video element.
           */
          
          video.src = url;
          video.width = width;
          video.height = height;
          video.style.display = 'block';
          video.setAttribute('autoplay', 'autoplay');
          
          /**
           * Capture and broadcast visions at 30 fps.
           */
          
          setInterval(function() {
            ctx.drawImage(video, 0, 0, video.width, video.height);
            socket.emit('capture', canvas.toDataURL('image/jpeg'));
          }, 1000 / 30);
          
          /**
           * Add monitor.
           */
          
          document.body.appendChild(video);
        }
    );
  });

})(this);