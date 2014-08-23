'use strict';

var utils = require('./utils');
var palette = new retro.Palette('APPLEII');

var count = 15;

module.exports = {
  black: palette.getColor(0),
  magenta: palette.getColor(1),
  purple: palette.getColor(2),
  pink: palette.getColor(3),
  forestGreen: palette.getColor(4),
  grey: palette.getColor(5),
  blue: palette.getColor(6),
  violet: palette.getColor(7),
  sage: palette.getColor(8),
  orange: palette.getColor(9),
  lightGrey: palette.getColor(10),
  salmon: palette.getColor(11),
  green: palette.getColor(12),
  lightGreen: palette.getColor(13),
  aqua: palette.getColor(14),
  white: palette.getColor(15),
  palette: palette,
  random: function randomColor(min, max) {
    min = min || 0;
    max = max || count;
    var index = utils.random(min, max);

    return palette.getColor(index);
  }
};

module.exports.blues = [
  module.exports.blue,
  module.exports.aqua
];

module.exports.greys = [
  module.exports.grey,
  module.exports.lightGrey,
  module.exports.white
];

module.exports.greens = [
  module.exports.forestGreen,
  module.exports.sage,
  module.exports.green,
  module.exports.lightGreen
];

module.exports.purples = [
  module.exports.magenta,
  module.exports.purple,
  module.exports.pink,
  module.exports.violet,
];

module.exports.randomGroup = function () {
  var groups = ['blues', 'greys', 'greens', 'purples'];
  var index = utils.random(0, groups.length);
  var name = groups[index];
  return module.exports[name];
};
