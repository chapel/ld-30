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

EventHandler.prototype.getEvent = function (type, parent) {
  var events = this.events[type];
  for (var i = 0, len = events.length; i < len; i += 1) {
    if (events[i].parent === parent && events[i].type === type) {
      return events[i];
    }
  }
};

EventHandler.prototype.addEvent = function (type, options, Event) {
  var event = this.getEvent(type, options.parent);
  if (event) {
    event.addEvent(options.handler);
  } else {
    event = new Event(options);
  }
  this.events[type].push(event);
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
        events[i].triggerEvents(e);
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
  this.parent = options.parent;

  this.position = options.position;
  this.width = options.width;
  this.height = options.height;

  this.events = [];
  this.parent.mouseOver = false;

  this.updateBounds();
  this.addEvent(options.handler);
}

MouseEvent.prototype.addEvent = function (handler) {
  this.events.push({
    trigger: handler
  });
};

MouseEvent.prototype.triggerEvents = function (e) {
  for (var i = 0, len = this.events.length; i < len; i += 1) {
    if (!this.events[i].trigger(e)) {
      break;
    }
  }
};

MouseEvent.prototype.updateBounds = function () {
  this.left = this.position.x;
  this.top = this.position.y;
  this.right = this.left + this.width;
  this.bottom = this.top + this.height;
};

MouseEvent.prototype.shouldHandle = function (e) {
  var shouldHandle = false;
  var isWithin = this.isWithin(e);

  if (this.type === 'mouseover') {

    if (isWithin) {
      shouldHandle = isWithin;
      this.parent.mouseOver = true;
    }

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
  this.updateBounds();
  return this.right >= e.x &&
         this.left <= e.x &&
         this.bottom >= e.y &&
         this.top <= e.y;
};

var eventHandler = new EventHandler();

exports.on = function (type, options) {
  options.type = type;
  if (eventHandler.isMouseEvent(type)) {
    eventHandler.addEvent(type, options, MouseEvent);
  } else {
    eventHandler.addEvent(type, options, KeyEvent);
  }
};

function wrapHandler(handler, context) {
  return function () {
    var returns = handler.apply(context, arguments);

    return utils.isUndefined(returns) ? true : returns;
  };
}

function onProto(event, handler, context) {
  context = context || this;
  exports.on(event, {
    parent: this,
    position: this.position,
    width: this.width,
    height: this.height,
    handler: this.wrapHandler(handler, context)
  });
}

exports.extendProto = function (proto) {
  proto.wrapHandler = wrapHandler;
  proto.on = onProto;
  return proto;
};

ctx.onclick = eventHandler.on('click');
ctx.onmousemove = eventHandler.on('mousemove');
