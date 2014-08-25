'use strict';

var utils = require('../utils');

function Resource(options) {
  this.id = options.id;
  this.name = options.name;
  this.description = options.description;
  this.baseValue = options.baseValue;
  this.valueWeight = options.valueWeight || 1;
  this.amount = options.amount || 1;

  this.events = [];
}

Resource.prototype.value = function () {
  return Math.floor(this.baseValue * this.valueWeight);
};

Resource.prototype.weight = function (valueWeight) {
  this.valueWeight = valueWeight;
};

Resource.prototype.add = function (amount) {
  this.amount += amount;
  this.triggerChange();
};

Resource.prototype.subtract = function (amount) {
  this.add(-amount);
  this.triggerChange();
};

Resource.prototype.onChange = function (handler, context) {
  this.events.push({
    trigger: utils.bind(context || this, handler)
  });
};

Resource.prototype.triggerChange = function () {
  for (var i = 0, len = this.events.length; i < len; i += 1) {
    this.events[i].trigger();
  }
};

Resource.prototype.totalValue = function () {
  return this.value * this.amount;
};

Resource.prototype.clone = function (amount) {
  var resource =  new Resource(this.toJSON());
  if (amount >= 0) {
    resource.amount = amount;
  }
  return resource;
};

Resource.prototype.toJSON = function () {
  return {
    id: this.id,
    name: this.name,
    description: this.description,
    baseValue: this.baseValue,
    valueWeight: this.valueWeight,
    amount: this.amount
  };
};

module.exports = Resource;
