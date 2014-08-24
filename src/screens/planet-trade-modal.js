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
    x: Math.floor((320 - 160)/6),
    y: Math.floor((200 - 100)/2),
    width: 160,
    height: 100,
    textColor: this.primary,
    bgColor: colors.black,
    borderColor: this.secondary
  }));


  /**
   * HEADERS/INTERFACE
   */
  this.interface = this.modal.createGroup('interface', [
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
    modal.addText({
      text: 'Buy',
      x: 10,
      y: 39,
      textColor: this.secondary
    }),
    modal.addText({
      text: 'Sell',
      x: 10,
      y: 59,
      textColor: this.secondary
    }),
    modal.addText({
      text: 'Totals',
      x: 10,
      y: 79,
      textColor: this.secondary
    }),
    modal.addLine({
      startX: 5,
      startY: 74,
      endX: 155,
      endY: 74,
      color: this.secondary
    })
  ]);


  /**
   * PRICES
   */
  var buyPrice = this.buyPrice = this.createPrice({
    x: 95,
    y: 39
  });

  var sellPrice = this.sellPrice = this.createPrice({
    x: 95,
    y: 59
  });

  var totalPrice = this.totalPrice = this.createPrice({
    x: 95,
    y: 79
  });

  this.prices = this.modal.createGroup('prices', [
    this.buyPrice,
    this.sellPrice,
    this.totalPrice
  ]);


  /**
   * INPUTS
   */
  var totalAmount = this.totalAmount = this.createPrice({
    x: 154,
    y: 79
  });

  var buyInput = this.buyInput = this.createInput({
    x: 120,
    y: 35,
    onClick: function (amount) {
      totalAmount.setText(amount);
      totalPrice.setText(-amount * buyPrice.getPrice());
      sellInput.setAmount(0);
    }
  });

  var sellInput = this.sellInput = this.createInput({
    x: 120,
    y: 55,
    onClick: function (amount) {
      totalAmount.setText(-amount);
      totalPrice.setText(amount * sellPrice.getPrice());
      buyInput.setAmount(0);
    }
  });

  this.inputs = this.modal.createGroup('inputs', [
    this.buyInput,
    this.sellInput,
    this.totalAmount
  ]);

};

TradeModal.prototype.createPrice = function (options) {
  var price = this.modal.addText({
    text: '0',
    x: options.x,
    y: options.y,
    align: 'right',
    textColor: this.primary
  });

  price.getPrice = function () {
    return parseInt(price.text, 10);
  };

  price.setPrice = function (amount) {
    price.setText(amount);
  };

  return price;
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
      var number = input.getAmount() + 1;
      amount.setText(number);
      if (options.onClick) {
        options.onClick(number);
      }
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
      var count = input.getAmount() - 1;
      if (count < 0) {
        count = 0;
      }
      amount.setText(count);
      if (options.onClick) {
        options.onClick(count);
      }
    }
  });

  input.getAmount = function () {
    return parseInt(amount.text, 10);
  };

  input.setAmount = function (count) {
    amount.setText(count);
  };

  return input;
};

TradeModal.prototype.toggle = function (toggle) {
  this.modal.visible(toggle);
  this.interface.visible(toggle);
  this.prices.visible(toggle);
  this.inputs.visible(toggle);
};

TradeModal.prototype.showModal = function (resource) {
  this.resource = resource;

  this.modal.title = 'Trade ' + this.resource.name;

  var buyPrice = Math.round(this.resource.value());
  if (buyPrice <= 0) {
    buyPrice = 1;
  }
  this.buyPrice.setPrice(buyPrice);
  this.sellPrice.setPrice(Math.round(this.resource.value() * utils.random(0.4, 0.75)));
  this.toggle(true);
};

TradeModal.prototype.onClickBack = function (handler, context) {
  this.clickBack = utils.bind(context || this, handler);
};

module.exports = TradeModal;
