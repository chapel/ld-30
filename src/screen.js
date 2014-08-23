'use strict';

var ctx = require('./ctx');

function Screen() {
  if (!this.onRender) {
    throw new Error('You must register an onRender function');
  }

  this.ctx = ctx;
  this.children = [];
}

Screen.prototype.init = function () {
  this.dirty(true);
};

Screen.prototype.remove = function () {
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
  this.onRender(delta);
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
