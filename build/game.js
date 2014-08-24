(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/main.js":[function(require,module,exports){
'use strict';

var Game = require('./game');

var util = require('util');
var utils = require('./utils');
var colors = require('./colors');
var Screen = require('./screen');
var events = require('./events');
var Menu = require('./menu');
var Planet = require('./elements/planet');
var Starfield = require('./elements/starfield');

var game = new Game();

game.onReady(function () {
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

    var option = this.menu.addMenuOption({
      text: 'Foo',
      x: 105,
      y: 20,
      textColor: colors.white
    });

    option.on('mouseover', function (e) {
      option.bgColor = colors.green;
    }, this);

    option.on('mouseout', function (e) {
      option.bgColor = colors.black;
    }, this);

    this.ctx.bgColor(colors.black);
  }

  util.inherits(Test, Screen);

  Test.prototype.onRender = function (delta) {
  };

  var test = new Test();

  game.setScreen(test);

  game.render();
});
/*
test.ctx.onclick = function (e) {
  test.planet.move(e.x, e.y, 80);
  test.planet2.move(e.x, e.y, 80);
  //test.planet.resize(test.planet.size + 5);
};
*/

},{"./colors":"/Users/jchapel/Projects/ld-30/src/colors.js","./elements/planet":"/Users/jchapel/Projects/ld-30/src/elements/planet.js","./elements/starfield":"/Users/jchapel/Projects/ld-30/src/elements/starfield.js","./events":"/Users/jchapel/Projects/ld-30/src/events.js","./game":"/Users/jchapel/Projects/ld-30/src/game.js","./menu":"/Users/jchapel/Projects/ld-30/src/menu.js","./screen":"/Users/jchapel/Projects/ld-30/src/screen.js","./utils":"/Users/jchapel/Projects/ld-30/src/utils.js","util":"/Users/jchapel/Projects/ld-30/node_modules/browserify/node_modules/util/util.js"}],"/Users/jchapel/Projects/ld-30/node_modules/browserify/node_modules/inherits/inherits_browser.js":[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],"/Users/jchapel/Projects/ld-30/node_modules/browserify/node_modules/process/browser.js":[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],"/Users/jchapel/Projects/ld-30/node_modules/browserify/node_modules/util/support/isBufferBrowser.js":[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],"/Users/jchapel/Projects/ld-30/node_modules/browserify/node_modules/util/util.js":[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":"/Users/jchapel/Projects/ld-30/node_modules/browserify/node_modules/util/support/isBufferBrowser.js","_process":"/Users/jchapel/Projects/ld-30/node_modules/browserify/node_modules/process/browser.js","inherits":"/Users/jchapel/Projects/ld-30/node_modules/browserify/node_modules/inherits/inherits_browser.js"}],"/Users/jchapel/Projects/ld-30/node_modules/readable-random/lib/readable-random.js":[function(require,module,exports){
/*
 * readable-random
 * https://github.com/anthonyringoet/readable-random
 *
 * Copyright (c) 2012 Anthony Ringoet
 * Licensed under the MIT license.
 */

exports.getString = function(length) {
  var priv = {};
  priv.consonants = ['b','c','d','f','g','h','j','k','l','m','n','p','r','s','t','v','w'];
  priv.vowels = ['a', 'e', 'i', 'o', 'u'];
  priv.result = '';

  priv.getLetter = function(datasource){
    var key = Math.floor(Math.random() * datasource.length);
    return datasource[key];
  };

  // default and go
  var loopStat = 0;
  if(!length){
    length = 6;
  }

  while (loopStat < length){
    if(loopStat === null || loopStat % 2){
      priv.result += priv.getLetter(priv.vowels);
    }
    else{
      priv.result += priv.getLetter(priv.consonants);
    }
    loopStat++;
  }

  return priv.result;
};

},{}],"/Users/jchapel/Projects/ld-30/src/colors.js":[function(require,module,exports){
'use strict';

var utils = require('./utils');
var palette = new retro.Palette('APPLEII');

var count = 15;

module.exports = {
  black: palette.getColor(0),
  magenta: palette.getColor(1),
  purple: palette.getColor(2),
  pink: palette.getColor(3),
  forestGreen: palette.getColor(4),
  grey: palette.getColor(5),
  blue: palette.getColor(6),
  violet: palette.getColor(7),
  sage: palette.getColor(8),
  orange: palette.getColor(9),
  lightGrey: palette.getColor(10),
  salmon: palette.getColor(11),
  green: palette.getColor(12),
  lightGreen: palette.getColor(13),
  aqua: palette.getColor(14),
  white: palette.getColor(15),
  palette: palette,
  random: function randomColor(min, max) {
    min = min || 0;
    max = max || count;
    var index = utils.random(min, max);

    return palette.getColor(index);
  }
};

module.exports.blues = [
  module.exports.blue,
  module.exports.aqua
];

module.exports.greys = [
  module.exports.grey,
  module.exports.lightGrey,
  module.exports.white
];

module.exports.greens = [
  module.exports.forestGreen,
  module.exports.sage,
  module.exports.green,
  module.exports.lightGreen
];

module.exports.purples = [
  module.exports.magenta,
  module.exports.purple,
  module.exports.pink,
  module.exports.violet,
];

module.exports.randomGroup = function () {
  var groups = ['blues', 'greys', 'greens', 'purples'];
  var index = utils.random(0, groups.length);
  var name = groups[index];
  return module.exports[name];
};

},{"./utils":"/Users/jchapel/Projects/ld-30/src/utils.js"}],"/Users/jchapel/Projects/ld-30/src/ctx.js":[function(require,module,exports){
var canvas = document.getElementById('game');
var ctx = canvas.getContext('retro');

module.exports = ctx;

},{}],"/Users/jchapel/Projects/ld-30/src/elements/planet.js":[function(require,module,exports){
'use strict';

var ctx = require('../ctx');
var utils = require('../utils');
var colors = require('../colors');
var resources = require('../objects/resource-types');
var text = require('../text');

function Planet(options) {
  options = options || {};

  this.name = utils.randomName();

  this.point = new utils.Point(options.x, options.y);
  this.velocity = new utils.Vector(0, 0);

  this.type = options.type;
  this.size = options.size;
  this.color = {
    outline: colors.random(1),
    fill: colors.random(1)
  };

  this.visible = options.visible || false;

  this.resources = resources.cloneAll(0);

  this.targetPoint = null;
  this.targetSize = null;
}

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
  this.renderText();
};

Planet.prototype.renderObject = function () {
  ctx
    .penColor(this.color.outline)
    .fillColor(this.color.fill)
    .circle(this.point.x, this.point.y, this.size);
  utils.clearColors();
};

Planet.prototype.renderText = function () {
  text(this.name, this.point.x + this.size + 5, this.point.y - 3, colors.white);
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

module.exports = Planet;

},{"../colors":"/Users/jchapel/Projects/ld-30/src/colors.js","../ctx":"/Users/jchapel/Projects/ld-30/src/ctx.js","../objects/resource-types":"/Users/jchapel/Projects/ld-30/src/objects/resource-types.js","../text":"/Users/jchapel/Projects/ld-30/src/text.js","../utils":"/Users/jchapel/Projects/ld-30/src/utils.js"}],"/Users/jchapel/Projects/ld-30/src/elements/starfield.js":[function(require,module,exports){
'use strict';

var ctx = require('../ctx');
var utils = require('../utils');
var colors = require('../colors');

function Star(x, y) {
  this.x = x;
  this.y = y;
  this.colors = colors.randomGroup();
  this.color = this.colors[utils.random(0, this.colors.length)];
  this.change = utils.random(0, 10000);
}

Star.prototype.updateColor = function () {
  if (this.change > 9999) {
    this.color = this.colors[utils.random(0, this.colors.length)];
    this.change = utils.random(0, 5000);
  }
  this.change += 1;
};

Star.prototype.render = function () {
  this.updateColor();
  ctx
    .penColor(this.color)
    .setPixel(this.x, this.y);
  utils.clearColors();
};

function Field(count) {
  this.count = count;
  this.stars = [];
  for (var i = 0; i < this.count; i += 1) {
    this.stars.push(new Star(utils.random(0, 320), utils.random(0, 200)));
  }
}

Field.prototype.render = function () {
  for (var i = 0; i < this.count; i += 1) {
    this.stars[i].render();
  }
};

module.exports = Field;

},{"../colors":"/Users/jchapel/Projects/ld-30/src/colors.js","../ctx":"/Users/jchapel/Projects/ld-30/src/ctx.js","../utils":"/Users/jchapel/Projects/ld-30/src/utils.js"}],"/Users/jchapel/Projects/ld-30/src/events.js":[function(require,module,exports){
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

},{"./ctx":"/Users/jchapel/Projects/ld-30/src/ctx.js","./utils":"/Users/jchapel/Projects/ld-30/src/utils.js"}],"/Users/jchapel/Projects/ld-30/src/game.js":[function(require,module,exports){
'use strict';

var ctx = require('./ctx');
var text = require('./text');
var utils = require('./utils');

function Game() {
  this.screen = null;
  this.time = null;
  this.delta = null;

  var self = this;
  text.onReady(function () {
    self.init();
  });
}

Game.prototype.onReady = function (init) {
  this.init = init || function () {};
};

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

  ctx.autoCommit(false);
  this.screen.clear();
  this.screen.render(this.delta);
  ctx
    .commit()
    .autoCommit(true);

  // Kick off new Request Animation Frame
  this.raf();
};

Game.prototype.raf = function () {
  window.requestAnimationFrame(utils.bind(this, this.render));
};

module.exports = Game;

},{"./ctx":"/Users/jchapel/Projects/ld-30/src/ctx.js","./text":"/Users/jchapel/Projects/ld-30/src/text.js","./utils":"/Users/jchapel/Projects/ld-30/src/utils.js"}],"/Users/jchapel/Projects/ld-30/src/menu.js":[function(require,module,exports){
'use strict';

var ctx = require('./ctx');
var text = require('./text');
var colors = require('./colors');
var events = require('./events');
var utils = require('./utils');

function MenuOptions(options) {
  this.text = options.text;
  this.position = new utils.Point(options.x, options.y);
  this.textColor = options.textColor;
  this.bgColor = options.bgColor;

  var textMeasure = ctx.measureText(this.text);
  this.width = textMeasure.width;
  this.height = textMeasure.height;
}

MenuOptions.prototype.render = function () {
  text(this.text, this.position.x, this.position.y, this.textColor, this.bgColor);
};

MenuOptions.prototype.on = function (event, handler, context) {
  events.on(event, {
    parent: this,
    position: this.position,
    width: this.width,
    height: this.height,
    handler: context ? utils.bind(context, handler) : handler
  });
};

function Menu(options) {
  this.title = options.title;

  this.startPosition = new utils.Point(options.x, options.y);
  this.width = options.width;
  this.height = options.height;
  this.textColor = options.textColor || colors.black;
  this.borderColor = options.borderColor || colors.grey;
  this.bgColor = options.bgColor || colors.white;

  this.hasMenuOptions = false;
  this.menuOptions = [];
}

Menu.prototype.render = function () {
 this.renderBox();
 this.renderTitle();
 this.renderOptions();
};

Menu.prototype.renderBox = function () {
  ctx
    .penColor(this.borderColor)
    .fillColor(this.bgColor)
    .rect(this.startPosition.x, this.startPosition.y, this.width, this.height);
  utils.clearColors();
};

Menu.prototype.renderTitle = function () {
  if (this.title) {
    text(this.title, this.startPosition.x + 5, this.startPosition.y + 5, this.textColor, null);
  }
};

Menu.prototype.renderOptions = function () {
  if (!this.hasMenuOptions) {
    return;
  }

  for (var i = 0, len = this.menuOptions.length; i < len; i += 1) {
    this.menuOptions[i].render();
  }
};

Menu.prototype.addMenuOption = function (options) {
  var menuOption = new MenuOptions(options);
  this.menuOptions.push(menuOption);
  this.hasMenuOptions = true;
  return menuOption;
};

module.exports = Menu;

},{"./colors":"/Users/jchapel/Projects/ld-30/src/colors.js","./ctx":"/Users/jchapel/Projects/ld-30/src/ctx.js","./events":"/Users/jchapel/Projects/ld-30/src/events.js","./text":"/Users/jchapel/Projects/ld-30/src/text.js","./utils":"/Users/jchapel/Projects/ld-30/src/utils.js"}],"/Users/jchapel/Projects/ld-30/src/objects/resource-types.js":[function(require,module,exports){
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

},{"./resource":"/Users/jchapel/Projects/ld-30/src/objects/resource.js"}],"/Users/jchapel/Projects/ld-30/src/objects/resource.js":[function(require,module,exports){
'use strict';

function Resource(options) {
  this.id = options.id;
  this.name = options.name;
  this.description = options.description;
  this.baseValue = options.baseValue;
  this.valueWeight = options.valueWeight || 1;
  this.amount = options.amount || 1;
}

Resource.prototype.value = function () {
  return Math.floor(this.baseValue * this.valueWeight);
};

Resource.prototype.weight = function (valueWeight) {
  this.valueWeight = valueWeight;
};

Resource.prototype.add = function (amount) {
  this.amount += amount;
};

Resource.prototype.subtract = function (amount) {
  this.add(-amount);
};

Resource.prototype.totalValue = function () {
  return this.value * this.amount;
};

Resource.prototype.clone = function (amount) {
  var resource =  new Resource(this.toJSON());
  if (amount >= 0) {
    resource.amount = amount;
  }
  return resource;
};

Resource.prototype.toJSON = function () {
  return {
    id: this.id,
    name: this.name,
    description: this.description,
    baseValue: this.baseValue,
    valueWeight: this.valueWeight,
    amount: this.amount
  };
};

module.exports = Resource;

},{}],"/Users/jchapel/Projects/ld-30/src/screen.js":[function(require,module,exports){
'use strict';

var ctx = require('./ctx');

function Screen() {
  if (!this.onRender) {
    throw new Error('You must register an onRender function');
  }

  this.ctx = ctx;
  this.children = [];
}

Screen.prototype.init = function () {
  this.dirty(true);
};

Screen.prototype.remove = function () {
};

Screen.prototype.dirty = function (isDirty) {
  this.isDirty = isDirty;
};

Screen.prototype.clear = function () {
  if (!this.isDirty) {
    return;
  }
  this.ctx.clear();
};

Screen.prototype.render = function (delta) {
  if (!this.isDirty) {
    return;
  }
  this.onRender(delta);
  for (var i = 0; i < this.childLength; i += 1) {
    this.children[i].render(delta);
  }
  //this.dirty(false);
};

Screen.prototype.addChild = function (child) {
  this.children.push(child);
  this.childLength = this.children.length;
  return child;
};

module.exports = Screen;

},{"./ctx":"/Users/jchapel/Projects/ld-30/src/ctx.js"}],"/Users/jchapel/Projects/ld-30/src/text.js":[function(require,module,exports){
'use strict';

var ctx = require('./ctx');
var colors = require('./colors');
var utils = require('./utils');

module.exports = function (text, x, y, penColor, fillColor) {
  fillColor = utils.isUndefined(fillColor) ? colors.black : fillColor;
  ctx
    .penColor(penColor)
    .fillColor(fillColor)
    .text(text, Math.floor(x), Math.floor(y));
  utils.clearColors();
};

module.exports.onReady = function (init) {
  ctx.addFont(window.fontRetro, function () {
    ctx.font('retro');
    init();
  });
};

},{"./colors":"/Users/jchapel/Projects/ld-30/src/colors.js","./ctx":"/Users/jchapel/Projects/ld-30/src/ctx.js","./utils":"/Users/jchapel/Projects/ld-30/src/utils.js"}],"/Users/jchapel/Projects/ld-30/src/utils.js":[function(require,module,exports){
'use strict';

var ctx = require('./ctx');
var readableRandom = require('readable-random');

exports.random = function (min, max) {
  return Math.min(Math.max(Math.floor(Math.random() * max), min), max);
};

exports.randomName = function () {
  var size = exports.random(3, 9);
  var name = readableRandom.getString(size);
  return name[0].toUpperCase() + name.slice(1);
};

// Simple fast bind
exports.bind = function (context, fn) {
  return function () {
    return fn.apply(context, arguments);
  };
};

exports.isUndefined = function (variable) {
  return typeof variable === 'undefined';
};

exports.clearColors = function () {
  ctx
    .penColor(null)
    .fillColor(null);
};

exports.easeIn = function (t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b;
};

exports.ease = function (current, change, duration) {
  return exports.easeIn(1, current, change, duration);
};


function Vector(p1, p2) {
  this.p1 = p1;
  this.p2 = p2;
}

function normalize(value) {
  return value > 0 ? 1 : value < 0 ? -1 : 0;
}

Vector.prototype.normalize = function () {
  this.p1 = normalize(this.p1);
  this.p2 = normalize(this.p2);
  return this;
};

Vector.prototype.active = function () {
  return this.p1 !== 0 && this.p2 !== 0;
};

exports.Vector = Vector;

function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.relative = function (other) {
  return new Vector(other.x - this.x, other.y - this.y);
};

Point.prototype.move = function (point) {
  this.x = point.x;
  this.y = point.y;
};

exports.Point = Point;

},{"./ctx":"/Users/jchapel/Projects/ld-30/src/ctx.js","readable-random":"/Users/jchapel/Projects/ld-30/node_modules/readable-random/lib/readable-random.js"}]},{},["./src/main.js"]);
