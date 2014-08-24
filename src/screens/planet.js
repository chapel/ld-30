'use strict';

var Screen = require('../screen');
var colors = require('../colors');

var Starfield = require('../elements/starfield');
var Planet = require('../elements/planet');
var FlavorText = require('./planet-flavor-text');
var TradeMenu = require('./planet-trade-menu');
var Menu = require('../menu');

exports.createScreen = function () {

  var screen = new Screen({
    bgColor: colors.black
  });

  screen.field = screen.addChild(new Starfield(200));

  screen.planet = screen.addChild(new Planet({
    visible: true,
    x: 95,
    y: 100,
    size: 90,
    showName: false
  }));

  var primary = screen.planet.color.fill || colors.orange;
  var secondary = screen.planet.color.outline || colors.sage;

  var bottom = 165;

  screen.menu = screen.addChild(new Menu({
    title: 'Planet ' + screen.planet.name,
    x: 190,
    y: 10,
    width: 120,
    height: 180,
    textColor: primary,
    bgColor: colors.black,
    borderColor: secondary
  }));

  screen.flavorText = new FlavorText({
    screen: screen,
    primary: primary,
    secondary: secondary,
    bottom: bottom,
    onClickTrade: function () {
      this.toggle(false);
      screen.tradeMenu.toggle(true);
    },
    onClickLeave: function () {
    }
  });

  screen.tradeMenu = new TradeMenu({
    screen: screen,
    primary: primary,
    secondary: secondary,
    bottom: bottom,
    onClickBack: function () {
      this.toggle(false);
      screen.flavorText.toggle(true);
    }
  });

  screen.flavorText.create();
  screen.tradeMenu.create();

  screen.onInit(function () {
    screen.flavorText.toggle(true);
  });

  screen.onRemove(function () {
    screen.flavorText.toggle(false);
    screen.tradeMenu.toggle(false);
  });

  return screen;
};
