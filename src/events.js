'use strict';

var ctx = require('./ctx');
var utils = require('./utils');

function EventHandler() {
  this.events = {
    click: [],
    mouseover: [],
    mouseout: [],
    mousemove: [],
    keypress: [],
  };

  this.mouseEvents = [
    'click',
    'mouseover',
    'mouseout'
  ];
}

EventHandler.prototype.isMouseEvent = function (type) {
  return this.mouseEvents.indexOf(type) !== -1;
};

EventHandler.prototype.addEvent = function (event) {
  this.events[event.type].push(event);
};

EventHandler.prototype.on = function (type) {
  var self = this;
  return function (e) {
    var events;
    if (type === 'mousemove') {
      events = [].concat(self.events.mouseover, self.events.mouseout, self.events.mousemove);
    } else {
      events = self.events[type];
    }

    if (!events || !events.length) {
      return;
    }

    for (var i = 0, len = events.length; i < len; i += 1) {
      if (events[i].shouldHandle(e)) {
        if (!events[i].handler(e)) {
          break;
        }
      }
    }
  };
};

function KeyEvent(options) {
  this.type = options.type;
  this.handler = options.handler;
}

KeyEvent.prototype.shouldHandle = function (e) {
  return true;
};

function MouseEvent(options) {
  this.type = options.type;
  this.handler = options.handler;
  this.parent = options.parent;

  this.position = options.position;
  this.width = options.width;
  this.height = options.height;

  this.left = this.position.x;
  this.top = this.position.y;
  this.right = this.left + this.width;
  this.bottom = this.top + this.height;

  this.parent.mouseOver = false;
}

MouseEvent.prototype.shouldHandle = function (e) {
  var shouldHandle = false;
  var isWithin = this.isWithin(e);

  if (this.type === 'mouseover') {

    shouldHandle = isWithin;
    this.parent.mouseOver = true;

  } else if (this.type === 'mouseout') {

    if (this.parent.mouseOver && !isWithin) {
      shouldHandle = true;
      this.parent.mouseOver = false;
    }

  } else {
    shouldHandle = isWithin;
  }

  return shouldHandle;
};

MouseEvent.prototype.isWithin = function (e) {
  return this.right >= e.x &&
         this.left <= e.x &&
         this.bottom >= e.y &&
         this.top <= e.y;
};

var eventHandler = new EventHandler();

exports.on = function (type, options) {
  options.type = type;
  if (eventHandler.isMouseEvent(type)) {
    eventHandler.addEvent(new MouseEvent(options));
  } else {
    eventHandler.addEvent(new KeyEvent(options));
  }
};

ctx.onclick = eventHandler.on('click');
ctx.onmousemove = eventHandler.on('mousemove');
