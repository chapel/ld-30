'use strict';

var ctx = require('./ctx');
var text = require('./text');
var colors = require('./colors');
var events = require('./events');
var utils = require('./utils');
var util = require('util');

function Group(options) {
  this.name = options.name;
  this.items = options.items;
  this.visible(utils.isUndefined(options.visible) ? false : options.visible);
}

Group.prototype.visible = function (visible) {
  for (var i = 0, len = this.items.length; i < len; i += 1) {
    this.items[i].visible = visible;
  }
};

function Line(options, parent) {
  this.parent = parent;
  this.text = '' + options.text;
  this.position = this.createRelativePoint(options.x, options.y, parent.startPosition);
  this.textColor = options.textColor;
  this.bgColor = options.bgColor;
  this.visible = utils.isUndefined(options.visible) ? false : options.visible;
}

Line.prototype.createRelativePoint = function (x, y, parentPoint) {
  return new utils.Point(x + parentPoint.x, y + parentPoint.y);
};

Line.prototype.render = function () {
  if (this.visible) {
    text(this.text, this.position.x, this.position.y, this.textColor, this.bgColor);
  }
};

function MenuOption(options) {
  Line.call(this, options);

  var textMeasure = ctx.measureText(this.text);
  this.width = textMeasure.width;
  this.height = textMeasure.height;

  if (options.bgHoverColor) {
    this.on('mouseover', function () {
      this.bgColor = options.bgHoverColor;
    });

    this.on('mouseout', function () {
      this.bgColor = options.bgColor;
    });
  }

  if (options.onClick) {
    this.on('click', options.onClick);
  }
}

events.extendProto(MenuOption.prototype);

util.inherits(MenuOption, Line);

function Menu(options) {
  this.title = options.title;

  this.startPosition = new utils.Point(options.x, options.y);
  this.width = options.width;
  this.height = options.height;
  this.textColor = options.textColor || colors.black;
  this.borderColor = options.borderColor || colors.grey;
  this.bgColor = options.bgColor || colors.white;

  this.children = [];
}

Menu.prototype.render = function () {
 this.renderBox();
 this.renderTitle();
 this.renderChildren();
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

Menu.prototype.renderChildren = function () {
  for (var i = 0, len = this.children.length; i < len; i += 1) {
    this.children[i].render();
  }
};

Menu.prototype.addText = function (options) {
  var line = new Line(options, this);
  this.children.push(line);
  return line;
};

Menu.prototype.addMenuOption = function (options) {
  var menuOption = new MenuOption(options, this);
  this.children.push(menuOption);
  return menuOption;
};

Menu.prototype.createGroup = function (name, items) {
  var group = new Group({
    name: name,
    items: items
  });
  return group;
};

Menu.Line = Line;
Menu.MenuOption = MenuOption;

module.exports = Menu;
