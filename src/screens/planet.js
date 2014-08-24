'use strict';

var Screen = require('../screen');
var colors = require('../colors');

var Starfield = require('../elements/starfield');
var Planet = require('../elements/planet');
var Menu = require('../menu');
var utils = require('../utils');

exports.createScreen = function () {

  var screen = new Screen({
    bgColor: colors.black
  });

  screen.field = screen.addChild(new Starfield(200));

  screen.selectedPlanet = screen.addChild(new Planet({
    visible: true,
    x: 95,
    y: 100,
    size: 90,
    showName: false
  }));

  screen.menu = screen.addChild(new Menu({
    title: 'Planet ' + screen.selectedPlanet.name,
    x: 190,
    y: 10,
    width: 120,
    height: 180,
    textColor: colors.white,
    bgColor: colors.black,
    borderColor: colors.white
  }));

  screen.flavorText = screen.menu.createGroup('flavorText', [
    screen.menu.addText({
      text: 'Diameter',
      x: 5,
      y: 20,
      textColor: colors.grey
    }),
    screen.menu.addText({
      text: utils.formatMeters(screen.selectedPlanet.diameter),
      x: 5,
      y: 30,
      textColor: colors.white
    }),
    screen.menu.addText({
      text: 'Population',
      x: 5,
      y: 40,
      textColor: colors.grey
    }),
    screen.menu.addText({
      text: utils.formatNumber(screen.selectedPlanet.population),
      x: 5,
      y: 50,
      textColor: colors.white
    }),
    screen.menu.addText({
      text: 'Main Export',
      x: 5,
      y: 60,
      textColor: colors.grey
    }),
    screen.menu.addText({
      text: screen.selectedPlanet.mainExport.name,
      x: 5,
      y: 70,
      textColor: colors.white
    }),
    screen.menu.addText({
      text: 'Main Import',
      x: 5,
      y: 80,
      textColor: colors.grey
    }),
    screen.menu.addText({
      text: screen.selectedPlanet.mainImport.name,
      x: 5,
      y: 90,
      textColor: colors.white
    })
  ]);

  screen.flavorText.visible(true);


  /*
    this.menu = this.addChild(new Menu({
      title: 'Test',
      x: 100,
      y: 10,
      width: 100,
      height: 150,
      textColor: colors.white,
      bgColor: colors.black,
      borderColor: colors.white
    }));

    var foo = this.menu.addMenuOption({
      text: 'Foo',
      x: 105,
      y: 30,
      textColor: colors.white,
      bgHoverColor: colors.green,
      onClick: function () {
        alert('foo');
      }
    });


    var bar = this.menu.addMenuOption({
      text: 'Bar',
      x: 105,
      y: 40,
      textColor: colors.white,
      bgHoverColor: colors.purple
    });

    this.ctx.bgColor(colors.black);
    */

  return screen;
};
