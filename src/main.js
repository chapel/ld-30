'use strict';

var Game = require('./game');

var util = require('util');
var utils = require('./utils');
var colors = require('./colors');
var Screen = require('./screen');
var Menu = require('./menu');
var Planet = require('./elements/planet');
var Starfield = require('./elements/starfield');

function Test() {
  Screen.call(this, arguments);

  this.field = this.addChild(new Starfield(200));
  this.planet = this.addChild(new Planet({
    type: 'normal',
    visible: true,
    x: 50,
    y: 50,
    size: utils.random(10, 20)
  }));
  this.planet2 = this.addChild(new Planet({
    type: 'normal',
    visible: true,
    x: 200,
    y: 50,
    size: utils.random(10, 20)
  }));
  this.planet3 = this.addChild(new Planet({
    type: 'normal',
    visible: true,
    x: 50,
    y: 100,
    size: utils.random(10, 20)
  }));

  this.menu = this.addChild(new Menu({
    title: 'Test',
    x: 100,
    y: 10,
    width: 100,
    height: 150
  }));

  this.ctx.bgColor(colors.black);
}

util.inherits(Test, Screen);

Test.prototype.onRender = function (delta) {
};

var test = new Test();
var game = new Game();

game.setScreen(test);

game.render();

test.ctx.onclick = function (e) {
  test.planet.move(e.x, e.y, 80);
  test.planet.resize(test.planet.size + 5);
};