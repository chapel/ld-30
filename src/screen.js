'use strict';

var ctx = require('./ctx');
var utils = require('./utils');

function Screen(options) {
  this.bgColor = options.bgColor;

  ctx.bgColor(this.bgColor);

  if (options.onRender) {
    this.onRender(options.onRender);
  } else {
    this._onRender = function () {};
  }

  if (options.onInit) {
    this.onInit(options.onInit);
  } else {
    this.init = function () {};
  }

  if (options.onRemove) {
    this.onRemove(options.onRemove);
  } else {
    this.remove = function () {};
  }

  this.ctx = ctx;
  this.children = [];
}

Screen.prototype.onInit = function (init, context) {
  this.init = utils.bind(context || this, init);
};

Screen.prototype.onRemove = function (remove, context) {
  this.remove = utils.bind(context || this, remove);
};

Screen.prototype.onRender = function (onRender, context) {
  this._onRender = utils.bind(context || this, onRender);
};

Screen.prototype.dirty = function (isDirty) {
  this.isDirty = isDirty;
};

Screen.prototype.clear = function () {
  this.ctx.clear();
};

Screen.prototype.render = function (delta) {
  this._onRender(delta);
  for (var i = 0; i < this.childLength; i += 1) {
    this.children[i].render(delta);
  }
};

Screen.prototype.addChild = function (child) {
  this.children.push(child);
  this.childLength = this.children.length;
  return child;
};

module.exports = Screen;
