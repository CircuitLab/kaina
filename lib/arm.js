
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
 */

function Arm(pins, debug) {
  this.pins = pins || defaultPins;
  
  EventEmitter.call(this);
  
  this.board = new duino.Board({ debug: debug });
  this.led = new duino.Led({ board: this.board, pin: this.pins.led });
  
  for (var i in pins) {
    this.board.pinMode(pins[i], 'out');
  }
  
  /*
  this.board.$on = this.board.on;
  
  this.board.on = function() {
    this.emit.apply(this, Array.prototype.slice.call(arguments, 0));
    return this.board.$on.apply(this.board, Array.prototype.slice.call(arguments, 0));
  };
  */
}

/**
 * Inherits from `EventEmitter`
 */

Arm.prototype.__proto__ = EventEmitter.prototype;

Arm.prototype.closeHand = function() {
  this._on(this.pins.closeHand);
  setTimeout(function() {
    self._off(self.pins.closeHand);
  }, 500);
  return this;
};

Arm.prototype.openHand = function() {
  var self = this;
  this._on(this.pins.openHand);
  setTimeout(function() {
    self._off(self.pins.openHand);
  }, 500);
  return this;
};

Arm.prototype.upFirst = function() {
  var self = this;
  this._on(this.pins.upFirst);
  setTimeout(function() {
    self._off(self.pins.upFirst);
  }, 500);
  return this;
};

Arm.prototype.downFirst = function() {
  var self = this;
  this._on(this.pins.downFirst);
  setTimeout(function() {
    self._off(self.pins.downFirst);
  }, 500);
  return this;
};

Arm.prototype.upSecond = function() {
  var self = this;
  this._on(this.pins.upSecond);
  setTimeout(function() {
    self._off(self.pins.upSecond);
  }, 500);
  return this;
};

Arm.prototype.downSecond = function() {
  var self = this;
  this._on(this.pins.downSecond);
  setTimeout(function() {
    self._off(self.pins.downSecond);
  }, 500);
  return this;
};

Arm.prototype.turnLeft = function() {
  var self = this;
  this._on(this.pins.turnLeft);
  setTimeout(function() {
    self._off(self.pins.turnLeft);
  }, 500);
  return this;
};

Arm.prototype.turnRight = function() {
  var self = this;
  this._on(this.pins.turnRight)
  setTimeout(function() {
    self._off(self.pins.turnRight);
  }, 500);
  return this;
};

Arm.prototype._on = function(pin) {
  this.board.digitalWrite(pin, this.board.HIGH);
  return this;
};

Arm.prototype._off = function(pin) {
  this.board.digitalWrite(pin, this.board.LOW);
  return this;
};
