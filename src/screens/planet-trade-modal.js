'use strict';

var utils = require('../utils');
var colors = require('../colors');
var Menu = require('../menu');

function TradeModal(options) {
  this.screen = options.screen;
  this.primary = options.primary;
  this.secondary = options.secondary;

  if (options.onClickBack) {
    this.onClickBack(options.onClickBack);
  } else {
    this.onClickBack(function () {});
  }
}

TradeModal.prototype.create = function () {
  var self = this;
  var screen = this.screen;

  var modal = this.modal = screen.addChild(new Menu({
    title: '',
    x: Math.floor((320 - 160)/6),
    y: Math.floor((200 - 100)/2),
    width: 160,
    height: 100,
    textColor: this.primary,
    bgColor: colors.black,
    borderColor: this.secondary
  }));

  this.buyInput = this.createInput({
    x: 120,
    y: 35
  });

  this.sellInput = this.createInput({
    x: 120,
    y: 55
  });

  this.header = this.modal.createGroup('header', [
    modal.addText({
      text: 'Price    Amount',
      x: 155,
      y: 20,
      align: 'right',
      textColor: this.secondary
    }),
    modal.addLine({
      startX: 5,
      startY: 30,
      endX: 155,
      endY: 30,
      color: this.secondary
    }),
    this.buyInput,
    this.sellInput
  ]);

};

TradeModal.prototype.createInput = function (options) {
  var input = this.modal.addChildMenu({
    x: options.x,
    y: options.y,
    width: 35,
    height: 15,
    textColor: this.primary,
    bgColor: colors.black,
    borderColor: this.secondary
  });

  var amount = input.amount = input.addText({
    text: 0,
    x: 33,
    y: 4,
    textColor: this.primary,
    align: 'right',
    visible: true
  });

  input.addPolygon({
    x: -14,
    y: 5,
    points: [0, 0, 5, -5, 10, 0],
    color: this.secondary,
    hoverColor: this.primary,
    visible: true,
    onClick: function () {
      amount.setText(parseInt(amount.text, 10) + 1);
    }
  });

  input.addPolygon({
    x: -14,
    y: 9,
    points: [0, 0, 5, 5, 10, 0],
    color: this.secondary,
    hoverColor: this.primary,
    visible: true,
    onClick: function () {
      var count = parseInt(amount.text, 10) - 1;
      if (count < 0) {
        count = 0;
      }
      amount.setText(count);
    }
  });

  return input;
};

TradeModal.prototype.toggle = function (toggle) {
  this.modal.visible(toggle);
  this.header.visible(toggle);
};

TradeModal.prototype.showModal = function (resource) {
  this.resource = resource;

  this.modal.title = 'Trade ' + this.resource.name;
  this.toggle(true);
};

TradeModal.prototype.onClickBack = function (handler, context) {
  this.clickBack = utils.bind(context || this, handler);
};

module.exports = TradeModal;
