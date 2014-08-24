'use strict';

var ctx = require('../ctx');
var utils = require('../utils');
var colors = require('../colors');
var events = require('../events');
var resources = require('../objects/resource-types');
var text = require('../text');

function Planet(options) {
  options = options || {};

  this.name = utils.randomName();

  this.showName = utils.isUndefined(options.showName) ? true : false;

  this.point = new utils.Point(options.x, options.y);
  this.velocity = new utils.Vector(0, 0);

  this.type = options.type;
  this.size = options.size;
  var fill = colors.random(1);
  this.color = {
    outline: colors.randomWithout(fill, 1),
    fill: fill
  };

  this.calculateBounds();

  this.visible = options.visible || false;

  this.resources = resources.cloneAll(0);

  this.mainExport = this.getRandomResource();
  this.mainImport = this.getRandomResource(this.mainExport);

  this.randomizeResourceAmounts();

  this.diameter = Math.floor(Math.random() * 1e5) + 2e4;
  this.population = Math.floor(this.diameter * (Math.random() * 1e5)) + 1e9;

  this.targetPoint = null;
  this.targetSize = null;

  if (options.onClick) {
    this.on('click', options.onClick);
  }

  if (options.borderHoverColor) {
    var outline = this.color.outline;
    this.on('mouseover', function () {
      this.color.outline = options.borderHoverColor;
    });

    this.on('mouseout', function () {
      this.color.outline = outline;
    });
  }
}

Planet.prototype.getRandomResource = function (resource) {
  var keys = Object.keys(this.resources);
  var index = utils.random(0, keys.length);
  var key = keys[index];
  var randomResource = this.resources[key];
  if (resource && randomResource === resource) {
    return this.getRandomResource(resource);
  } else {
    return randomResource;
  }
};

Planet.prototype.randomizeResourceAmounts = function () {
  var keys = Object.keys(this.resources);
  var resource;
  for (var i = 0, len = keys.length; i < len; i += 1) {
    resource = this.resources[keys[i]];
    if (resource === this.mainExport) {
      resource.amount = utils.random(utils.random(11, 100), utils.random(414, 602));
    } else if (resource === this.mainImport) {
      resource.amount = utils.random(utils.random(0, 14), utils.random(78, 109));
    } else {
      resource.amount = utils.random(utils.random(11, 30), utils.random(96, 234));
    }
  }

};

Planet.prototype.calculateBounds = function () {
  this.position = new utils.Point(this.point.x - this.size, this.point.y - this.size);
  this.width = this.size * 2;
  this.height = this.size * 2;
};

Planet.prototype.render = function (delta) {
  if (!this.visible) {
    return;
  }
  if (this.targetPoint) {
    this.incrementalMove();
  }
  if (this.targetSize) {
    this.incrementalResize();
  }

  this.renderObject();

  if (this.showName) {
    this.renderText();
  }
};

Planet.prototype.renderObject = function () {
  ctx
    .penColor(this.color.outline)
    .fillColor(this.color.fill)
    .circle(this.point.x, this.point.y, this.size);
  utils.clearColors();
};

Planet.prototype.renderText = function () {
  text({
    name: this.name,
    x: this.point.x + this.size + 5,
    y: this.point.y - 3,
    color: colors.white
  });
};

Planet.prototype.incrementalMove = function () {
  if (this.point.relative(this.targetPoint).normalize().active()) {
    this.point.move({
      x: utils.ease(this.point.x, this.targetPoint.x - this.point.x, this.targetPoint.duration),
      y: utils.ease(this.point.y, this.targetPoint.y - this.point.y, this.targetPoint.duration)
    });
  } else {
    this.targetPoint = null;
  }
};

Planet.prototype.move = function (x, y, duration) {
  this.targetPoint = new utils.Point(x, y);
  this.targetPoint.duration = duration;
};

Planet.prototype.incrementalResize = function () {
  if (this.size !== this.targetSize) {
    this.size += (this.targetSize - this.size) / 100;
  } else {
    this.targetSize = null;
  }
};
Planet.prototype.incrementalResize = function () {
  var done = true;
  if (this.size !== this.targetSize) {
    this.size += this.targetSize > this.size ? 1 : -1;
    done = false;
  }
  if (done) {
    this.targetSize = null;
  }
  this.resizing = !done;
};

Planet.prototype.resize = function (size) {
  this.targetSize = size;
};

events.extendProto(Planet.prototype);

module.exports = Planet;
