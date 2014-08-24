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

  this.modal = screen.addChild(new Menu({
    title: 'How many?',
    x: (320 - 100)/2,
    y: (200 - 100)/2,
    width: 100,
    height: 100,
    textColor: this.primary,
    bgColor: colors.black,
    borderColor: this.secondary
  }));
};

TradeModal.prototype.toggle = function (toggle) {
  this.modal.visible(toggle);
};

TradeModal.prototype.showModal = function (resource) {
  this.resource = resource;
  this.toggle(true);
};

TradeModal.prototype.onClickBack = function (handler, context) {
  this.clickBack = utils.bind(context || this, handler);
};

module.exports = TradeModal;
