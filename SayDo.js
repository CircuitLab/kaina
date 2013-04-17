module.exports = SayDo;

var cp = require('child_process')
  , EventEmitter = require('events').EventEmitter;

function SayDo(opts) {
  this.target = opts.target || {}
  var asserts = opts.asserts || []
  var eventPrefix = opts.prefix || "_eventStep-"


  var self = this;
  var i;

  for (i = 0; i < asserts.length; i++) {
    self.on(i == 0 ? 'ready' : eventPrefix + i, (function(asserts, i) {
      if (asserts[i].say) {
        return function() {
          cp.exec('say ' + asserts[i].say, function() {
            for (var j = 0; j < asserts[i].func.length; j++) {
              self.target[asserts[i].func[j]]();
            }
            setTimeout(function(){ self.emit(eventPrefix + (i + 1)); }, asserts[i].time);
          }
        )}
      } else {
        return function() {
          for (var j = 0; j < asserts[i].func.length; j++) {
            self.target[asserts[i].func[j]]();
          }
          setTimeout(function(){ self.emit(eventPrefix + (i + 1)); }, asserts[i].time);
        }
      }
    })(asserts, i));
  }
  self.on(eventPrefix + i, function() { process.exit(); });

  this.target.on('ready', function() {
    self.emit('ready');
  });
}

SayDo.prototype.__proto__ = EventEmitter.prototype;
