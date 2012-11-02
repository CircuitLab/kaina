
/**
 * Module dependencies.
 */

var duino = require('duino')
  , EventEmitter = require('events').EventEmitter;

/**
 * Expose `Arm`.
 */

module.exports = Arm;

/**
 * Define pins.
 */

var defaultPins = {
    hands: [2, 3]
  , elbow: [4, 5]
  , shoulder: [6, 7]
  , base: [8, 9]
};

/**
 * Arm constructor.
 *
 * @param {Object} pins
 * @param {Boolean} debug
 */

function Arm(pins, debug) {
  this.pins = pins || defaultPins;

  this.state = {
      hands: false
    , elbow: false
    , shoulder: false
    , base: false
  };

  EventEmitter.call(this);

  this.board = new duino.Board({ debug: debug });
  var self = this;

  this.board.on('ready', function() {
    for (var keys in self.pins)
    {
      console.log("initalize : " + keys);
      self.board.pinMode(self.pins[keys][0], 'out');
      self.board.pinMode(self.pins[keys][1], 'out');
    }
    self.emit('ready');
  });

}

/**
 * Inherits from `EventEmitter`.
 */

Arm.prototype.__proto__ = EventEmitter.prototype;

Arm.prototype.handsOpen = function() {
  if (!this.state.hands) {
    this.moveJoint(this.pins.hands);
    this.state.hands = true;
  }
  return this;
};

Arm.prototype.handsStop = function() {
  this.stopJoint(this.pins.hands);
  this.state.hands = false;
  return this;
};

Arm.prototype.handsClose = function() {
  if (!this.state.hands) {
    this.reverseJoint(this.pins.hands);
    this.state.hands = true;
  }
  return this;
};

Arm.prototype.elbowUp = function() {
  if (!this.state.elbow) {
    this.reverseJoint(this.pins.elbow);
    this.state.elbow = true;
  }
  return this;
};

Arm.prototype.elbowStop = function() {
  this.stopJoint(this.pins.elbow);
  this.state.elbow = false;
  return this;
};

Arm.prototype.elbowDown = function() {
  if (!this.state.elbow) {
    this.moveJoint(this.pins.elbow);
    this.state.elbow = true;
  }
  return this;
};

Arm.prototype.shoulderUp = function() {
  if (!this.state.shoulder) {
    this.moveJoint(this.pins.shoulder);
    this.state.shoulder = true;
  }
  return this;
};

Arm.prototype.shoulderStop = function() {
  this.stopJoint(this.pins.shoulder);
  this.state.shoulder = false;
  return this;
};

Arm.prototype.shoulderDown = function() {
  if (!this.state.shoulder) {
    this.reverseJoint(this.pins.shoulder);
    this.state.shoulder = true;
  }
  return this;
};

Arm.prototype.baseRotate = function() {
  if (!this.state.base) {
    this.reverseJoint(this.pins.base);
    this.state.base = true;
  }
  return this;
};

Arm.prototype.baseStop = function() {
  this.stopJoint(this.pins.base);
  this.state.base = false;
  return this;
};

Arm.prototype.baseReverse = function() {
  if (!this.state.base) {
    this.moveJoint(this.pins.base);
    this.state.base = true;
  }
  return this;
};


// meta moving

Arm.prototype.moveJoint = function(joint) {
  this.board.digitalWrite(joint[0], this.board.HIGH);
  this.board.digitalWrite(joint[1], this.board.LOW);
};

Arm.prototype.stopJoint = function(joint) {
  this.board.digitalWrite(joint[0], this.board.LOW);
  this.board.digitalWrite(joint[1], this.board.LOW);
};

Arm.prototype.reverseJoint = function(joint) {
  this.board.digitalWrite(joint[0], this.board.LOW);
  this.board.digitalWrite(joint[1], this.board.HIGH);
};

Arm.prototype.wrist = function(val) {
  this.servo.wrist.write(val);
  return this;
};
