var asserts = [
    {
        'prev': 'ready'
      , 'say': 'open hands'
      , 'func': ['handsOpen']
      , 'next': 'handsOpened'
      , 'time': 500
    }
  , {
        'prev': 'handsOpened'
      , 'say': 'close hands'
      , 'func': ['handsStop', 'handsClose']
      , 'next': 'handsClosed'
      , 'time': 500
    }
  , {
        'prev': 'handsClosed'
      , 'say': 'stop hands'
      , 'func': ['handsStop']
      , 'next': 'handsStoped'
      , 'time': 500
    }
];

var cp = require('child_process')
  , EventEmitter = require('events').EventEmitter;

function ArmTest(asserts) {
  var Arm = require('./lib/arm');
  this.arm = new Arm(null, true);

  var self = this;

  for (var i = 0; i < asserts.length; i++) {
    self.on(asserts[i].prev, (function(asserts, i) {
      return function() {
        cp.exec('say ' + asserts[i].say, function() {
          for (var j = 0; j < asserts[i].func.length; j++) {
            self.arm[asserts[i].func[j]]();
          }
          setTimeout(function(){ armTest.emit(asserts[i].next); }, asserts[i].time);
        }
      )}
    })(asserts, i));
  }

  this.arm.on('ready', function() {
    self.emit('ready');
  });
}

ArmTest.prototype.__proto__ = EventEmitter.prototype;

var armTest = new ArmTest(asserts);
