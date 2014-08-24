'use strict';

var ctx = require('./ctx');
var colors = require('./colors');
var utils = require('./utils');

module.exports = function (text, x, y, penColor, fillColor) {
  fillColor = utils.isUndefined(fillColor) ? colors.black : fillColor;
  ctx
    .penColor(penColor)
    .fillColor(fillColor)
    .text(text, Math.floor(x), Math.floor(y));
  utils.clearColors();
};

module.exports.onReady = function (init) {
  ctx.addFont(window.fontRetro, function () {
    ctx.font('retro');
    init();
  });
};
