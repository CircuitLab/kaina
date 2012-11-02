var cp = require('child_process')
  , EventEmitter = require('events').EventEmitter;

function ArmTest() {
  var Arm = require('./lib/arm');

  this.arm = new Arm(null, true);

  //arm.handsOpen();
  //setTimeout(arm.handsStop(), 1000);

  console.log("test");
  var self = this;

  this.arm.on('ready', function() {
    self.emit('ready');
  });
}

ArmTest.prototype.__proto__ = EventEmitter.prototype;

var armTest = new ArmTest();

armTest.on('ready', function() {
  console.log('arm ready');
  cp.exec('say "open hands"', function() {
    console.log('open hands');
    armTest.arm.handsStop();
    armTest.arm.handsOpen();
    setTimeout(function(){ armTest.emit('handsOpened'); }, 500);
  });
});

armTest.on('handsOpened', function() {
  console.log('hands opened');
  cp.exec('say "close hands"', function() {
    console.log('close hands');
    armTest.arm.handsStop();
    armTest.arm.handsClose();
    setTimeout(function(){ armTest.emit('handsClosed'); }, 500);
  });
});

armTest.on('handsClosed', function() {
  console.log('hands closed');
  cp.exec('say "stop hands"', function() {
    console.log('stop hands');
    armTest.arm.handsStop();
    setTimeout(function(){ armTest.emit('handsStoped'); }, 500);
  });
});
