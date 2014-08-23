'use strict';

var ctx = require('./ctx');
var readableRandom = require('readable-random');

exports.random = function (min, max) {
  return Math.min(Math.max(Math.floor(Math.random() * max), min), max);
};

exports.randomName = function () {
  var size = exports.random(3, 9);
  var name = readableRandom.getString(size);
  return name[0].toUpperCase() + name.slice(1);
};

// Simple fast bind
exports.bind = function (context, fn) {
  return function () {
    return fn.apply(context, arguments);
  };
};

exports.clearColors = function () {
  ctx
    .penColor(null)
    .fillColor(null);
};

exports.easeIn = function (t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b;
};

exports.ease = function (current, change, duration) {
  return exports.easeIn(1, current, change, duration);
};


function Vector(p1, p2) {
  this.p1 = p1;
  this.p2 = p2;
}

function normalize(value) {
  return value > 0 ? 1 : value < 0 ? -1 : 0;
}

Vector.prototype.normalize = function () {
  this.p1 = normalize(this.p1);
  this.p2 = normalize(this.p2);
  return this;
};

Vector.prototype.active = function () {
  return this.p1 !== 0 && this.p2 !== 0;
};

exports.Vector = Vector;

function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.relative = function (other) {
  return new Vector(other.x - this.x, other.y - this.y);
};

Point.prototype.move = function (point) {
  this.x = point.x;
  this.y = point.y;
};

exports.Point = Point;