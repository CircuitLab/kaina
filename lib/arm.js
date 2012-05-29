
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
    closeHand: 3
  , openHand: 2
  , upFirst: 4
  , downFirst: 5 
  , upSecond: 7
  , downSecond: 6
  , turnLeft: 9
  , turnRight: 8
  , led: 12
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
  this.led = new duino.Led({ board: this.board, pin: this.pins.led });
  
  for (var i in pins) {
    this.board.pinMode(pins[i], 'out');
  }
}

/**
 * Inherits from `EventEmitter`.
 */

Arm.prototype.__proto__ = EventEmitter.prototype;

/**
 * @param {Number} timeout
 * @return {Arm}
 */

Arm.prototype.closeHand = function(timeout) {
  return this._on(this.pins.closeHand, timeout);
};

/**
 * @param {Number} timeout
 * @return {Arm}
 */

Arm.prototype.openHand = function(timeout) {
  return this._on(this.pins.openHand, timeout);
};

/**
 * @param {Number} timeout
 * @return {Arm}
 */

Arm.prototype.upFirst = function(timeout) {
  return this._on(this.pins.upFirst, timeout);
};

/**
 * @param {Number} timeout
 * @return {Arm}
 */

Arm.prototype.downFirst = function(timeout) {
  return this._on(this.pins.downFirst, timeout);
};

/**
 * @param {Number} timeout
 * @return {Arm}
 */

Arm.prototype.upSecond = function(timeout) {
  return this._on(this.pins.upSecond, timeout);
};

/**
 * @param {Number} timeout
 * @return {Arm}
 */

Arm.prototype.downSecond = function(timeout) {
  return this._on(this.pins.downSecond, timeout);
};

/**
 * @param {Number} timeout
 * @return {Arm}
 */

Arm.prototype.turnLeft = function(timeout) {
  return this._on(this.pins.turnLeft, timeout);
};

/**
 * @param {Number} timeout
 * @return {Arm}
 */

Arm.prototype.turnRight = function(timeout) {
  return this._on(this.pins.turnRight, timeout);
};

/**
 * @param {Number} pin
 * @param {Number} timeout
 * @return {Arm}
 */

Arm.prototype._on = function(pin, timeout) {
  var self = this;
  this.board.digitalWrite(pin, self.board.HIGH);

  setTimeout(function() {
    self._off(pin);
  }, timeout || 1500);
  
  return this;
};

/**
 * @param {Number} pin
 * @return {Arm}
 */

Arm.prototype._off = function(pin) {
  this.board.digitalWrite(pin, this.board.LOW);
  return this;
};
