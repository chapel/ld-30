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

  this.ctx = ctx;
  this.children = [];
}

Screen.prototype.init = function () {
  this.dirty(true);
};

Screen.prototype.remove = function () {
};

Screen.prototype.onRender = function (onRender, context) {
  this._onRender = utils.bind(context || this, onRender);
};

Screen.prototype.dirty = function (isDirty) {
  this.isDirty = isDirty;
};

Screen.prototype.clear = function () {
  if (!this.isDirty) {
    return;
  }
  this.ctx.clear();
};

Screen.prototype.render = function (delta) {
  if (!this.isDirty) {
    return;
  }
  this._onRender(delta);
  for (var i = 0; i < this.childLength; i += 1) {
    this.children[i].render(delta);
  }
  //this.dirty(false);
};

Screen.prototype.addChild = function (child) {
  this.children.push(child);
  this.childLength = this.children.length;
  return child;
};

module.exports = Screen;
