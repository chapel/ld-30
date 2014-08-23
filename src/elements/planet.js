'use strict';

var ctx = require('../ctx');
var utils = require('../utils');
var colors = require('../colors');
var resources = require('../objects/resource-types');
var text = require('../text');

function Planet(options) {
  options = options || {};

  this.name = utils.randomName();

  this.point = new utils.Point(options.x, options.y);
  this.velocity = new utils.Vector(0, 0);

  this.type = options.type;
  this.size = options.size;
  this.color = {
    outline: colors.random(1),
    fill: colors.random(1)
  };

  this.visible = options.visible || false;

  this.resources = resources.cloneAll(0);

  this.targetPoint = null;
  this.targetSize = null;
}

Planet.prototype.render = function (delta) {
  if (!this.visible) {
    return;
  }
  if (this.targetPoint) {
    this.incrementalMove();
  }
  if (this.targetSize) {
    this.incrementalResize();
  }

  this.renderObject();
  this.renderText();
};

Planet.prototype.renderObject = function () {
  ctx
    .penColor(this.color.outline)
    .fillColor(this.color.fill)
    .circle(this.point.x, this.point.y, this.size);
  utils.clearColors();
};

Planet.prototype.renderText = function () {
  text(this.name, this.point.x + this.size + 5, this.point.y - 3, colors.white);
};

Planet.prototype.incrementalMove = function () {
  if (this.point.relative(this.targetPoint).normalize().active()) {
    this.point.move({
      x: utils.ease(this.point.x, this.targetPoint.x - this.point.x, this.targetPoint.duration),
      y: utils.ease(this.point.y, this.targetPoint.y - this.point.y, this.targetPoint.duration)
    });
  } else {
    this.targetPoint = null;
  }
};

Planet.prototype.move = function (x, y, duration) {
  this.targetPoint = new utils.Point(x, y);
  this.targetPoint.duration = duration;
};

Planet.prototype.incrementalResize = function () {
  if (this.size !== this.targetSize) {
    this.size += (this.targetSize - this.size) / 100;
  } else {
    this.targetSize = null;
  }
};
Planet.prototype.incrementalResize = function () {
  var done = true;
  if (this.size !== this.targetSize) {
    this.size += this.targetSize > this.size ? 1 : -1;
    done = false;
  }
  if (done) {
    this.targetSize = null;
  }
  this.resizing = !done;
};

Planet.prototype.resize = function (size) {
  this.targetSize = size;
};

module.exports = Planet;
