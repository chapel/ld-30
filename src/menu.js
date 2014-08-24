'use strict';

var ctx = require('./ctx');
var text = require('./text');
var colors = require('./colors');
var events = require('./events');
var utils = require('./utils');

function MenuOptions(options) {
  this.text = options.text;
  this.position = new utils.Point(options.x, options.y);
  this.textColor = options.textColor;
  this.bgColor = options.bgColor;

  var textMeasure = ctx.measureText(this.text);
  this.width = textMeasure.width;
  this.height = textMeasure.height;
}

MenuOptions.prototype.render = function () {
  text(this.text, this.position.x, this.position.y, this.textColor, this.bgColor);
};

MenuOptions.prototype.on = function (event, handler, context) {
  events.on(event, {
    parent: this,
    position: this.position,
    width: this.width,
    height: this.height,
    handler: context ? utils.bind(context, handler) : handler
  });
};

function Menu(options) {
  this.title = options.title;

  this.startPosition = new utils.Point(options.x, options.y);
  this.width = options.width;
  this.height = options.height;
  this.textColor = options.textColor || colors.black;
  this.borderColor = options.borderColor || colors.grey;
  this.bgColor = options.bgColor || colors.white;

  this.hasMenuOptions = false;
  this.menuOptions = [];
}

Menu.prototype.render = function () {
 this.renderBox();
 this.renderTitle();
 this.renderOptions();
};

Menu.prototype.renderBox = function () {
  ctx
    .penColor(this.borderColor)
    .fillColor(this.bgColor)
    .rect(this.startPosition.x, this.startPosition.y, this.width, this.height);
  utils.clearColors();
};

Menu.prototype.renderTitle = function () {
  if (this.title) {
    text(this.title, this.startPosition.x + 5, this.startPosition.y + 5, this.textColor, null);
  }
};

Menu.prototype.renderOptions = function () {
  if (!this.hasMenuOptions) {
    return;
  }

  for (var i = 0, len = this.menuOptions.length; i < len; i += 1) {
    this.menuOptions[i].render();
  }
};

Menu.prototype.addMenuOption = function (options) {
  var menuOption = new MenuOptions(options);
  this.menuOptions.push(menuOption);
  this.hasMenuOptions = true;
  return menuOption;
};

module.exports = Menu;
