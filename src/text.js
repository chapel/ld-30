'use strict';

var ctx = require('./ctx');
var colors = require('./colors');
var utils = require('./utils');

var fontReady = false;
ctx.addFont(window.fontRetro, function () {
  ctx.font('retro');
  fontReady = true;
});

module.exports = function (text, x, y, penColor, fillColor) {
  if (fontReady) {
    ctx
      .penColor(penColor)
      .fillColor(fillColor || colors.black)
      .text(text, Math.floor(x), Math.floor(y));
    utils.clearColors();
  }
};
