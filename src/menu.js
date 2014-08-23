'use strict';

var ctx = require('./ctx');
var text = require('./text');
var colors = require('./colors');
var utils = require('./utils');

function Menu(options) {
  this.title = options.title;

  this.startPosition = new utils.Point(options.x, options.y);
  this.width = options.width;
  this.height = options.height;
  this.borderColor = options.borderColor || colors.grey;
  this.bgColor = options.bgColor || colors.white;
}

Menu.prototype.render = function () {
 this.renderBox();
};

Menu.prototype.renderBox = function () {
  ctx
    .penColor(this.borderColor)
    .fillColor(this.bgColor)
    .rect(this.startPosition.x, this.startPosition.y, this.width, this.height);
  utils.clearColors();
};

module.exports = Menu;
