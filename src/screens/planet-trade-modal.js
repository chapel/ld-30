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
  var screen = this.screen;

  var modal = this.modal = screen.addChild(new Menu({
    title: '',
    x: (320 - 160)/6,
    y: (200 - 100)/2,
    width: 160,
    height: 100,
    textColor: this.primary,
    bgColor: colors.black,
    borderColor: this.secondary
  }));

  this.header = this.modal.createGroup('header', [
    modal.addText({
      text: 'Price  Amount',
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
    })
  ]);

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
