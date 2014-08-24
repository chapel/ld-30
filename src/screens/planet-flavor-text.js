'use strict';

var utils = require('../utils');

function FlavorText(options) {
  this.screen = options.screen;
  this.primary = options.primary;
  this.secondary = options.secondary;
  this.bottom = options.bottom;

  if (options.onClickTrade) {
    this.onClickTrade(options.onClickTrade);
  } else {
    this.onClickTrade(function () {});
  }

  if (options.onClickLeave) {
    this.onClickLeave(options.onClickLeave);
  } else {
    this.onClickLeave(function () {});
  }
}

FlavorText.prototype.create = function () {
  var screen = this.screen;
  var self = this;

  this.text = screen.menu.createGroup('flavorText', [
    screen.menu.addText({
      text: 'Diameter',
      x: 5,
      y: 20,
      textColor: this.secondary
    }),
    screen.menu.addText({
      text: utils.formatMeters(screen.planet.diameter),
      x: 5,
      y: 30,
      textColor: this.primary
    }),
    screen.menu.addText({
      text: 'Population',
      x: 5,
      y: 40,
      textColor: this.secondary
    }),
    screen.menu.addText({
      text: utils.formatNumber(screen.planet.population),
      x: 5,
      y: 50,
      textColor: this.primary
    }),
    screen.menu.addText({
      text: 'Main Export',
      x: 5,
      y: 60,
      textColor: this.secondary
    }),
    screen.menu.addText({
      text: screen.planet.mainExport.name,
      x: 5,
      y: 70,
      textColor: this.primary
    }),
    screen.menu.addText({
      text: 'Main Import',
      x: 5,
      y: 80,
      textColor: this.secondary
    }),
    screen.menu.addText({
      text: screen.planet.mainImport.name,
      x: 5,
      y: 90,
      textColor: this.primary
    })
  ]);

  this.options = screen.menu.createGroup('mainOptions', [
    screen.menu.addMenuOption({
      text: '* Trade',
      x: 5,
      y: this.bottom - 15,
      textColor: this.primary,
      bgHoverColor: this.secondary,
      onClick: function () {
        self.clickTrade();
      }
    }),
    screen.menu.addMenuOption({
      text: '* Leave Orbit',
      x: 5,
      y: this.bottom,
      textColor: this.primary,
      bgHoverColor: this.secondary,
      onClick: function () {
        self.clickLeave();
      }
    })
  ]);
};

FlavorText.prototype.toggle = function (toggle) {
  this.text.visible(toggle);
  this.options.visible(toggle);
};

FlavorText.prototype.onClickTrade = function (handler, context) {
  this.clickTrade = utils.bind(context || this, handler);
};

FlavorText.prototype.onClickLeave = function (handler, context) {
  this.clickLeave = utils.bind(context || this, handler);
};

module.exports = FlavorText;
