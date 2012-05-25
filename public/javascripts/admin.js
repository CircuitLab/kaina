
var socket = window.socket = io.connect()
  , width = 960 / 4
  , height = 720 / 4;

$(function() {
  navigator.webkitGetUserMedia(
      { audio:true, video:true }
    , function(stream) {
        var url = webkitURL.createObjectURL(stream)
          , canvas = document.createElement('canvas')
          , ctx = canvas.getContext('2d')
          , video = document.createElement('video');
          
        canvas.width = width;
        canvas.height = height;
        
        video.src = url;
        video.width = width;
        video.height = height;
        video.style.display = 'block';
        video.setAttribute('autoplay', 'autoplay');
        
        setInterval(function() {
          ctx.drawImage(video, 0, 0, video.width, video.height);
          socket.emit('capture', canvas.toDataURL('image/jpeg'));
        }, 1000 / 30);
        
        document.body.appendChild(video);
      }
    , function() {
        alert('fail');
      }
  );
});