var palette = new retro.Palette('APPLEII');
var canvas = document.getElementById('game');
var ctx = canvas.getContext('retro');


ctx.addFont(fontRetro, function () {
  var text = require('./text');
  text('foo', 10, 10, [0, 0, 0]);
});
