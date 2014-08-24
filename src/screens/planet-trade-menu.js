'use strict';

var utils = require('../utils');
var truncate = require('truncate');

function TradeMenu(options) {
  this.screen = options.screen;
  this.primary = options.primary;
  this.secondary = options.secondary;
  this.bottom = options.bottom;

  if (options.onClickBack) {
    this.onClickBack(options.onClickBack);
  } else {
    this.onClickBack(function () {});
  }
}

TradeMenu.prototype.create = function () {
  var screen = this.screen;
  var self = this;

  var tradeItems = [
    screen.menu.addText({
      text: 'Trade',
      x: 5,
      y: 20,
      textColor: this.secondary
    }),
    screen.menu.addText({
      text: 'Amount',
      x: 115,
      y: 20,
      textColor: this.secondary,
      align: 'right'
    }),
    screen.menu.addLine({
      startX: 5,
      startY: 30,
      endX: 115,
      endY: 30,
      color: this.secondary
    })
  ];

  var startY = 35;
  var toggle = false;
  var resource;
  for (var name in screen.planet.resources) {
    resource = screen.planet.resources[name];
    tradeItems.push(this.createAmount(resource, startY, toggle));
    tradeItems.push(this.createMenuItem(resource, startY, toggle));
    startY += 10;
    toggle = !toggle;
  }

  tradeItems.push(screen.menu.addMenuOption({
    text: '* Back',
    x: 5,
    y: this.bottom,
    textColor: this.primary,
    bgHoverColor: this.secondary,
    onClick: function () {
      self.clickBack();
    }
  }));

  this.list = screen.menu.createGroup('tradeMenu', tradeItems);
};

TradeMenu.prototype.createMenuItem = function (resource, y, toggle) {
  var name = truncate(resource.name, 12);
  var resourceMenu = this.screen.menu.addMenuOption({
    text: name,
      x: 5,
      y: y,
      textColor: toggle ? this.secondary : this.primary,
      bgHoverColor: toggle ? this.primary : this.secondary
  });
  resourceMenu.on('mouseover', function () {
    this.text = resource.name;
  });
  resourceMenu.on('mouseout', function () {
    this.text = name;
  });
  return resourceMenu;
};

TradeMenu.prototype.createAmount = function (resource, y, toggle) {
  var resourceAmount = this.screen.menu.addMenuOption({
    text: resource.amount,
    x: 115,
    y: y,
    textColor: toggle ? this.secondary : this.primary,
    bgHoverColor: toggle ? this.primary : this.secondary,
    align: 'right'
  });
  return resourceAmount;
};


TradeMenu.prototype.toggle = function (toggle) {
  this.list.visible(toggle);
};

TradeMenu.prototype.onClickBack = function (handler, context) {
  this.clickBack = utils.bind(context || this, handler);
};

module.exports = TradeMenu;
