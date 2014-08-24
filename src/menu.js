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
    this.items[i].visible(visible);
  }
};

function Base(options, parent) {
  this.parent = parent;
  this._visible = null;
  this.visible(utils.isUndefined(options.visible) ? false : options.visible);
}

Base.prototype.createRelativePoint = function (x, y, parentPoint) {
  return new utils.Point(x + parentPoint.x, y + parentPoint.y);
};

Base.prototype.visible = function (toggle) {
  if (utils.isUndefined(toggle)) {
    return this._visible;
  }

  this._visible = toggle;
};

events.extendProto(Base.prototype);

function Polygon(options, parent) {
  Base.call(this, options, parent);

  this.attach = this.createRelativePoint(options.x, options.y, parent.startPosition);

  this.points = this.createRelativePoints(options.points);

  this.color = options.color;
  this.borderColor = options.borderColor;

  if (options.hoverColor) {
    this.on('mouseover', function () {
      this.color = options.hoverColor;
    });

    this.on('mouseout', function () {
      this.color = options.color;
    });
  }

  if (options.onClick) {
    this.on('click', options.onClick);
  }
}

util.inherits(Polygon, Base);

Polygon.prototype.createRelativePoints = function (points) {
  var relativePoints = [];

  var lowestX = Infinity;
  var lowestY = Infinity;
  var highestX = -Infinity;
  var highestY = -Infinity;
  var point;
  for (var i = 0, len = points.length; i < len; i += 2) {
    point = points.slice(i, i + 2);
    point = this.createRelativePoint(point[0], point[1], this.attach);
    if (point.x < lowestX) {
      lowestX = point.x;
    }
    if (point.y < lowestY) {
      lowestY = point.y;
    }
    if (point.x > highestX) {
      highestX = point.x;
    }
    if (point.y > highestY) {
      highestY = point.y;
    }
    relativePoints = relativePoints.concat(point.toArray());
  }
  this.position = new utils.Point(lowestX, lowestY);
  this.width = highestX - lowestX;
  this.height = highestY - lowestY;
  return relativePoints;
};

Polygon.prototype.render = function () {
  if (this.visible()) {
    ctx
      .fillColor(this.color)
      .polygon(this.points);
    utils.clearColors();
  }
};

function Line(options, parent) {
  Base.call(this, options, parent);

  this.start = this.createRelativePoint(options.startX, options.startY, parent.startPosition);
  this.end = this.createRelativePoint(options.endX, options.endY, parent.startPosition);
  this.color = options.color;
}

util.inherits(Line, Base);

Line.prototype.render = function () {
  if (this.visible()) {
    ctx
      .penColor(this.color)
      .line(this.start.x, this.start.y, this.end.x, this.end.y);
    utils.clearColors();
  }
};

function Text(options, parent) {
  Base.call(this, options, parent);

  this.text = '' + options.text;
  this.position = this.createRelativePoint(options.x, options.y, parent.startPosition);
  this.textColor = options.textColor;
  this.bgColor = options.bgColor;
  this.align = options.align;
}

util.inherits(Text, Base);

Text.prototype.setText = function (text) {
  this.text = '' + text;
};

Text.prototype.render = function () {
  if (this.visible()) {
    text({
      text: this.text,
      x: this.position.x,
      y: this.position.y,
      color: this.textColor,
      bgColor: this.bgColor,
      align: this.align
    });
  }
};

function MenuOption(options, parent) {
  Text.call(this, options, parent);

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

util.inherits(MenuOption, Text);

function Menu(options, parent) {
  Base.call(this, options, parent);

  this.title = options.title;

  if (this.parent) {
    this.startPosition = this.createRelativePoint(options.x, options.y, parent.startPosition);
  } else {
    this.startPosition = new utils.Point(options.x, options.y);
  }
  this.width = options.width;
  this.height = options.height;
  this.textColor = options.textColor || colors.black;
  this.borderColor = options.borderColor || colors.grey;
  this.bgColor = options.bgColor || colors.white;

  this.children = [];
}

util.inherits(Menu, Base);

Menu.prototype.render = function () {
  if (this.visible()) {
    this.renderBox();
    this.renderTitle();
    this.renderChildren();
  }
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
    text({
      text: this.title,
      x: this.startPosition.x + 5,
      y: this.startPosition.y + 5,
      color: this.textColor
    });
  }
};

Menu.prototype.renderChildren = function () {
  for (var i = 0, len = this.children.length; i < len; i += 1) {
    this.children[i].render();
  }
};

Menu.prototype.addPolygon = function (options) {
  var polygon = new Polygon(options, this);
  this.children.push(polygon);
  return polygon;
};

Menu.prototype.addLine = function (options) {
  var line = new Line(options, this);
  this.children.push(line);
  return line;
};

Menu.prototype.addText = function (options) {
  var textLine = new Text(options, this);
  this.children.push(textLine);
  return textLine;
};

Menu.prototype.addMenuOption = function (options) {
  var menuOption = new MenuOption(options, this);
  this.children.push(menuOption);
  return menuOption;
};

Menu.prototype.addChildMenu = function (options) {
  var menu = new Menu(options, this);
  this.children.push(menu);
  return menu;
};

Menu.prototype.createGroup = function (name, items) {
  var group = new Group({
    name: name,
    items: items
  });
  return group;
};

Menu.Line = Line;
Menu.Text = Text;
Menu.MenuOption = MenuOption;

module.exports = Menu;
