
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
    elbow: 6
  , wrist: 7
};

/**
 * Arm constructor.
 *
 * @param {Object} pins
 * @param {Boolean} debug
 */

function Arm(pins, debug) {
  this.pins = pins || defaultPins;
  
  EventEmitter.call(this);
  
  this.board = new duino.Board({ debug: debug });
  
  this.servo = {
      elbow: new duino.Servo({ board: this.board, pin: this.pins.elbow })
    , wrist: new duino.Servo({ board: this.board, pin: this.pins.wrist })
  };
}

/**
 * Inherits from `EventEmitter`.
 */

Arm.prototype.__proto__ = EventEmitter.prototype;

/**
 *
 */

/*
Arm.prototype.base = function(val) {
  this.servo.base.write(val);
  return this;
};
*/

/**
 *
 */

Arm.prototype.elbow = function(val) {
  this.servo.elbow.write(val);
  return this;
};

/**
 *
 */

Arm.prototype.wrist = function(val) {
  this.servo.wrist.write(val);
  return this;
};
