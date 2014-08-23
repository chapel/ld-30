'use strict';

var ctx = require('../ctx');
var utils = require('../utils');
var colors = require('../colors');

function Star(x, y) {
  this.x = x;
  this.y = y;
  this.colors = colors.randomGroup();
  this.color = this.colors[utils.random(0, this.colors.length)];
  this.change = utils.random(0, 10000);
}

Star.prototype.updateColor = function () {
  if (this.change > 9999) {
    this.color = this.colors[utils.random(0, this.colors.length)];
    this.change = utils.random(0, 5000);
  }
  this.change += 1;
};

Star.prototype.render = function () {
  this.updateColor();
  ctx
    .penColor(this.color)
    .setPixel(this.x, this.y);
  utils.clearColors();
};

function Field(count) {
  this.count = count;
  this.stars = [];
  for (var i = 0; i < this.count; i += 1) {
    this.stars.push(new Star(utils.random(0, 320), utils.random(0, 200)));
  }
}

Field.prototype.render = function () {
  for (var i = 0; i < this.count; i += 1) {
    this.stars[i].render();
  }
};

module.exports = Field;
