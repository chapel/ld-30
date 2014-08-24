'use strict';

var ctx = require('./ctx');
var utils = require('./utils');

module.exports = function (options) {
  var text = options.text;
  var x = options.x;
  var y = options.y;
  var color = options.color;
  var bgColor = options.bgColor;
  var align = options.align;

  if (align) {
    ctx.textAlign(align);
  }

  ctx
    .penColor(color)
    .fillColor(bgColor)
    .text(text, Math.floor(x), Math.floor(y));

  ctx.textAlign('left');
  utils.clearColors();
};

module.exports.onReady = function (init) {
  ctx.addFont(window.fontRetro, function () {
    ctx.font('retro');
    init();
  });
};
