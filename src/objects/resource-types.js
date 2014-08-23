'use strict';

var Resource = require('./resource');

var list = [];

exports.Protrudium = new Resource({
  id: 'Protrudium',
  name: 'Protrudium',
  description: 'Highly radioactive, Protrudium is a refined ore from the center of planets, commonly used for weapons.',
  baseValue: 10
});
list.push(exports.Protrudium);

exports.Mindworms = new Resource({
  id: 'Mindworms',
  name: 'Mindworms',
  description: 'Commonly used as biological weapons, mindworms are popular in the war torn areas of the universe.',
  baseValue: 20
});
list.push(exports.Mindworms);

exports.VespeneGas = new Resource({
  id: 'VespeneGas',
  name: 'Vespene Gas',
  description: 'Vespene gas is commonly used as an energy source for ships and machinary, but some races live off of it.',
  baseValue: 5
});
list.push(exports.VespeneGas);

exports.DenseCarbon = new Resource({
  id: 'DenseCarbon',
  name: 'Dense Carbon',
  description: 'On some planets carbon is the building block of life, but it normally rare across the universe.',
  baseValue: 15
});
list.push(exports.DenseCarbon);

exports.Dilithium = new Resource({
  id: 'Dilithium',
  name: 'Dilithium Crystals',
  description: 'Necessary for containing warp drive anti-matter reactions.',
  value: 30
});
list.push(exports.Dilithium);

exports.cloneAll = function () {
  var resources = {};
  var resource;
  for (var i = 0, len = list.length; i < len; i += 1) {
    resource = list[i];
    resources[resource.id] = resource.clone();
  }
  return resources;
};
