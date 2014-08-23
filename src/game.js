'use strict';

var utils = require('./utils');

function Game() {
  this.screen = null;
  this.time = null;
  this.delta = null;
}

Game.prototype.setScreen = function (screen) {
  if (this.screen) {
    // Remove old screen so it can clean up
    this.screen.remove();
  }

  // Set screen to new screen
  this.screen = screen;

  // Tell screen it has been added
  this.screen.init();
};

Game.prototype.render = function (time) {
  if (time && this.time === null) {
    this.time = time;
  } else if (time) {
    this.delta = time - this.time;
    this.time = time;
  }

  if (this.screen === null) {
    return;
  }

  this.screen.clear();
  this.screen.render(this.delta);

  // Kick off new Request Animation Frame
  this.raf();
};

Game.prototype.raf = function () {
  window.requestAnimationFrame(utils.bind(this, this.render));
};

module.exports = Game;
