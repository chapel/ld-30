'use strict';

var Game = require('./game');

var util = require('util');
var utils = require('./utils');
var colors = require('./colors');
var Screen = require('./screen');
var events = require('./events');
var Menu = require('./menu');
var planet = require('./screens/planet');
var Starfield = require('./elements/starfield');

var game = new Game();

game.onReady(function () {
  game.setScreen(planet.createScreen());

  game.render();
});
/*
test.ctx.onclick = function (e) {
  test.planet.move(e.x, e.y, 80);
  test.planet2.move(e.x, e.y, 80);
  //test.planet.resize(test.planet.size + 5);
};
*/
