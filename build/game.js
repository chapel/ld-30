(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/main.js":[function(require,module,exports){
'use strict';

var Game = require('./game');

var util = require('util');
var utils = require('./utils');
var colors = require('./colors');
var Screen = require('./screen');
var events = require('./events');
var Menu = require('./menu');
var planet = require('./screens/planet');
var Starfield = require('./elements/starfield');

var game = new Game();

game.onReady(function () {
  game.setScreen(planet.createScreen());

  game.render();
});
/*
test.ctx.onclick = function (e) {
  test.planet.move(e.x, e.y, 80);
  test.planet2.move(e.x, e.y, 80);
  //test.planet.resize(test.planet.size + 5);
};
*/

},{"./colors":"/Users/jchapel/Projects/ld-30/src/colors.js","./elements/starfield":"/Users/jchapel/Projects/ld-30/src/elements/starfield.js","./events":"/Users/jchapel/Projects/ld-30/src/events.js","./game":"/Users/jchapel/Projects/ld-30/src/game.js","./menu":"/Users/jchapel/Projects/ld-30/src/menu.js","./screen":"/Users/jchapel/Projects/ld-30/src/screen.js","./screens/planet":"/Users/jchapel/Projects/ld-30/src/screens/planet.js","./utils":"/Users/jchapel/Projects/ld-30/src/utils.js","util":"/Users/jchapel/Projects/ld-30/node_modules/browserify/node_modules/util/util.js"}],"/Users/jchapel/Projects/ld-30/node_modules/browserify/node_modules/inherits/inherits_browser.js":[function(require,module,exports){
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
},{"./support/isBuffer":"/Users/jchapel/Projects/ld-30/node_modules/browserify/node_modules/util/support/isBufferBrowser.js","_process":"/Users/jchapel/Projects/ld-30/node_modules/browserify/node_modules/process/browser.js","inherits":"/Users/jchapel/Projects/ld-30/node_modules/browserify/node_modules/inherits/inherits_browser.js"}],"/Users/jchapel/Projects/ld-30/node_modules/format-number/index.js":[function(require,module,exports){
module.exports = formatter;

function formatter(options) {
  options = options || {};
  options.negative = options.negative === 'R' ? 'R' : 'L';
  options.negativeOut = options.negativeOut === false ? false : true;
  options.prefix = options.prefix || '';
  options.suffix = options.suffix || '';
  options.separator = typeof options.separator === 'string' ? options.separator : ',';
  options.decimal = options.decimal || '.';
  
  function format(number, includeUnits, separate) {
    includeUnits = includeUnits === false ? false : true;
    separate = separate === false ? false : true;
    if (number || number === 0) {
      number = '' + number;//convert number to string if it isn't already
    } else {
      return '';
    }
    var output = [];
    var negative = number.charAt(0) === '-';
    number = number.replace(/^\-/g, '');

    if (!options.negativeOut && includeUnits) {
      output.push(options.prefix);
    }
    if (negative && options.negative === 'L') {
      output.push('-');
    }
    if (options.negativeOut && includeUnits) {
      output.push(options.prefix);
    }

    number = number.split(options.decimal);
    if (options.round != null) round(number, options.round);
    if (options.truncate != null) number[1] = truncate(number[1], options.truncate);
    if (options.padLeft) number[0] = padLeft(number[0], options.padLeft);
    if (options.padRight) number[1] = padRight(number[1], options.padRight);
    if (separate) number[0] = addSeparators(number[0], options.separator);
    output.push(number[0]);
    if (number[1]) {
      output.push(options.decimal);
      output.push(number[1]);
    }


    if (options.negativeOut && includeUnits) {
      output.push(options.suffix);
    }
    if (negative && options.negative === 'R') {
      output.push('-');
    }
    if (!options.negativeOut && includeUnits) {
      output.push(options.suffix);
    }

    return output.join('');
  }

  format.negative = options.negative;
  format.negativeOut = options.negativeOut;
  format.prefix = options.prefix;
  format.suffix = options.suffix;
  format.separate = options.separate;
  format.separator = options.separator;
  format.decimal = options.decimal;
  format.padLeft = options.padLeft;
  format.padRight = options.padRight;
  format.truncate = options.truncate;
  format.round = options.round;

  function unformat(number, allowedSeparators) {
    allowedSeparators = allowedSeparators || [];
    if (options.allowedSeparators) {
      options.allowedSeparators.forEach(function (s) { allowedSeparators.push (s); });
    }
    allowedSeparators.push(options.separator);
    number = number.replace(options.prefix, '');
    number = number.replace(options.suffix, '');
    var newNumber = number;
    do {
      number = newNumber;
      for (var i = 0; i < allowedSeparators.length; i++) {
        newNumber = newNumber.replace(allowedSeparators[i], '');
      }
    } while (newNumber != number);
    return number;
  }
  format.unformat = unformat;

  function validate(number, allowedSeparators) {
    number = unformat(number, allowedSeparators);
    number = number.split(options.decimal);
    if (number.length > 2) {
      return false;
    } else if (options.truncate != null && number[1] && number[1].length > options.truncate) {
      return false;
    }  else if (options.round != null && number[1] && number[1].length > options.round) {
      return false;
    } else {
      return /^-?\d+\.?\d*$/.test(number);
    }
  }
  return format;
}

//where x is already the integer part of the number
function addSeparators(x, separator) {
  x += '';
  if (!separator) return x;
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x)) {
    x = x.replace(rgx, '$1' + separator + '$2');
  }
  return x;
}

function padLeft(x, padding) {
  x = x + '';
  var buf = [];
  while (buf.length + x.length < padding) {
    buf.push('0');
  }
  return buf.join('') + x;
}
function padRight(x, padding) {
  if (x) {
    x += '';
  } else {
    x = '';
  }
  var buf = [];
  while (buf.length + x.length < padding) {
    buf.push('0');
  }
  return x + buf.join('');
}
function truncate(x, length) {
  if (x) {
    x += '';
  }
  if (x && x.length > length) {
    return x.substr(0, length);
  } else {
    return x;
  }
}
function round(number, length) {
  if (!number[1]) return number
  var integ = number[0] + ''
  var decim = number[1] + ''
  if (decim.length > length) {
    var decider = +decim[length]
    if (decider >= 5) {
      decider = 10
      decim = decim.substring(0, length)
    } else if (length === 0) {
      number.pop()
      return number
    } else {
      number[1] = decim.substring(0, length)
      return number
    }
    while (decider === 10 && decim.length) {
      decider = (+decim[decim.length - 1]) + 1
      decim = decim.substring(0, decim.length - 1)
    }
    if (decider < 10) {
      number[1] = decim + decider
    } else {
      integ = (+integ) + 1
      number[0] = integ + ''
      number.pop()
    }
    return number
  } else {
    return number
  }
}
},{}],"/Users/jchapel/Projects/ld-30/node_modules/readable-random/lib/readable-random.js":[function(require,module,exports){
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

},{}],"/Users/jchapel/Projects/ld-30/node_modules/truncate/truncate.js":[function(require,module,exports){
/*global module:true*/
/*jslint nomen:true*/
/**
 * @module Utility
 */
(function (context, undefined) {
    'use strict';

    var DEFAULT_TRUNCATE_SYMBOL = '...',
        URL_REGEX               = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g; // Simple regexp

    function __appendEllipsis(string, options, content){
        if(content.length === string.length || !options.ellipsis){return content;}
        content += options.ellipsis;
        return content;
    }
    /**
     * Truncate HTML string and keep tag safe.
     *
     * @method truncate
     * @param {String} string string needs to be truncated
     * @param {Number} maxLength length of truncated string
     * @param {Object} options (optional)
     * @param {Boolean} [options.keepImageTag] flag to specify if keep image tag, false by default
     * @param {Boolean|String} [options.ellipsis] omission symbol for truncated string, '...' by default
     * @return {String} truncated string
     */
    function truncate(string, maxLength, options) {
        var content = '',         // truncated text storage
            matches = true,
            remainingLength = maxLength,
            result,
            index;

        options          = options || {};
        options.ellipsis = (typeof options.ellipsis === "undefined") ? DEFAULT_TRUNCATE_SYMBOL : options.ellipsis;

        if(!string || string.length === 0){
            return '';
        }

        matches = true;
        while(matches){
            URL_REGEX.lastIndex = content.length;
            matches = URL_REGEX.exec(string);

            if(!matches || (matches.index - content.length) >= remainingLength){
                content += string.substring(content.length, maxLength);
                return __appendEllipsis(string, options, content, maxLength);
            }

            result  = matches[0];
            index   = matches.index;
            content += string.substring(content.length, index + result.length);
            remainingLength -= index + result.length;

            if(remainingLength <= 0){
                break;
            }
        }

        return __appendEllipsis(string, options, content, maxLength);
    }

    if ('undefined' !== typeof module && module.exports) {
        module.exports = truncate;
    } else {
        context.truncate = truncate;
    }
}(String));

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
  },
  randomWithout: function randomWithout(without, min, max) {
    var color = module.exports.random(min, max);
    if (module.exports.equals(without, color)) {
      return randomWithout(without, min, max);
    }
    return color;
  },
  equals: function (source, check) {
    return source.toString() === check.toString();
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
      resource.weight(Math.random() * 1);
    } else if (resource === this.mainImport) {
      resource.amount = utils.random(utils.random(0, 14), utils.random(78, 109));
      resource.weight(Math.random() * 5);
    } else {
      resource.amount = utils.random(utils.random(11, 30), utils.random(96, 234));
      resource.weight(Math.random() * 2.5);
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

},{"../colors":"/Users/jchapel/Projects/ld-30/src/colors.js","../ctx":"/Users/jchapel/Projects/ld-30/src/ctx.js","../events":"/Users/jchapel/Projects/ld-30/src/events.js","../objects/resource-types":"/Users/jchapel/Projects/ld-30/src/objects/resource-types.js","../text":"/Users/jchapel/Projects/ld-30/src/text.js","../utils":"/Users/jchapel/Projects/ld-30/src/utils.js"}],"/Users/jchapel/Projects/ld-30/src/elements/starfield.js":[function(require,module,exports){
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
  if (!this.parent.visible()) {
    return;
  }
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
var util = require('util');

function Group(options) {
  this.name = options.name;
  this.items = options.items;
  this.visible(utils.isUndefined(options.visible) ? false : options.visible);
}

Group.prototype.visible = function (visible) {
  for (var i = 0, len = this.items.length; i < len; i += 1) {
    this.items[i].visible(visible);
  }
};

function Base(options, parent) {
  this.parent = parent;
  this._visible = null;
  this.visible(utils.isUndefined(options.visible) ? false : options.visible);
}

Base.prototype.createRelativePoint = function (x, y, parentPoint) {
  return new utils.Point(x + parentPoint.x, y + parentPoint.y);
};

Base.prototype.visible = function (toggle) {
  if (utils.isUndefined(toggle)) {
    return this._visible;
  }

  this._visible = toggle;
};

events.extendProto(Base.prototype);

function Polygon(options, parent) {
  Base.call(this, options, parent);

  this.attach = this.createRelativePoint(options.x, options.y, parent.startPosition);

  this.points = this.createRelativePoints(options.points);

  this.color = options.color;
  this.borderColor = options.borderColor;

  if (options.hoverColor) {
    this.on('mouseover', function () {
      this.color = options.hoverColor;
    });

    this.on('mouseout', function () {
      this.color = options.color;
    });
  }

  if (options.onClick) {
    this.on('click', options.onClick);
  }
}

util.inherits(Polygon, Base);

Polygon.prototype.createRelativePoints = function (points) {
  var relativePoints = [];

  var lowestX = Infinity;
  var lowestY = Infinity;
  var highestX = -Infinity;
  var highestY = -Infinity;
  var point;
  for (var i = 0, len = points.length; i < len; i += 2) {
    point = points.slice(i, i + 2);
    point = this.createRelativePoint(point[0], point[1], this.attach);
    if (point.x < lowestX) {
      lowestX = point.x;
    }
    if (point.y < lowestY) {
      lowestY = point.y;
    }
    if (point.x > highestX) {
      highestX = point.x;
    }
    if (point.y > highestY) {
      highestY = point.y;
    }
    relativePoints = relativePoints.concat(point.toArray());
  }
  this.position = new utils.Point(lowestX, lowestY);
  this.width = highestX - lowestX;
  this.height = highestY - lowestY;
  return relativePoints;
};

Polygon.prototype.render = function () {
  if (this.visible()) {
    ctx
      .fillColor(this.color)
      .polygon(this.points);
    utils.clearColors();
  }
};

function Line(options, parent) {
  Base.call(this, options, parent);

  this.start = this.createRelativePoint(options.startX, options.startY, parent.startPosition);
  this.end = this.createRelativePoint(options.endX, options.endY, parent.startPosition);
  this.color = options.color;
}

util.inherits(Line, Base);

Line.prototype.render = function () {
  if (this.visible()) {
    ctx
      .penColor(this.color)
      .line(this.start.x, this.start.y, this.end.x, this.end.y);
    utils.clearColors();
  }
};

function Text(options, parent) {
  Base.call(this, options, parent);

  this.text = '' + options.text;
  this.position = this.createRelativePoint(options.x, options.y, parent.startPosition);
  this.textColor = options.textColor;
  this.bgColor = options.bgColor;
  this.align = options.align;
}

util.inherits(Text, Base);

Text.prototype.setText = function (text) {
  this.text = '' + text;
};

Text.prototype.render = function () {
  if (this.visible()) {
    text({
      text: this.text,
      x: this.position.x,
      y: this.position.y,
      color: this.textColor,
      bgColor: this.bgColor,
      align: this.align
    });
  }
};

function MenuOption(options, parent) {
  Text.call(this, options, parent);

  var textMeasure = ctx.measureText(this.text);
  this.width = textMeasure.width;
  this.height = textMeasure.height;

  if (options.bgHoverColor) {
    this.on('mouseover', function () {
      this.bgColor = options.bgHoverColor;
    });

    this.on('mouseout', function () {
      this.bgColor = options.bgColor;
    });
  }

  if (options.onClick) {
    this.on('click', options.onClick);
  }
}

util.inherits(MenuOption, Text);

function Menu(options, parent) {
  Base.call(this, options, parent);

  this.title = options.title;

  if (this.parent) {
    this.startPosition = this.createRelativePoint(options.x, options.y, parent.startPosition);
  } else {
    this.startPosition = new utils.Point(options.x, options.y);
  }
  this.width = options.width;
  this.height = options.height;
  this.textColor = options.textColor || colors.black;
  this.borderColor = options.borderColor || colors.grey;
  this.bgColor = options.bgColor || colors.white;

  this.children = [];
}

util.inherits(Menu, Base);

Menu.prototype.render = function () {
  if (this.visible()) {
    this.renderBox();
    this.renderTitle();
    this.renderChildren();
  }
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
    text({
      text: this.title,
      x: this.startPosition.x + 5,
      y: this.startPosition.y + 5,
      color: this.textColor
    });
  }
};

Menu.prototype.renderChildren = function () {
  for (var i = 0, len = this.children.length; i < len; i += 1) {
    this.children[i].render();
  }
};

Menu.prototype.addPolygon = function (options) {
  var polygon = new Polygon(options, this);
  this.children.push(polygon);
  return polygon;
};

Menu.prototype.addLine = function (options) {
  var line = new Line(options, this);
  this.children.push(line);
  return line;
};

Menu.prototype.addText = function (options) {
  var textLine = new Text(options, this);
  this.children.push(textLine);
  return textLine;
};

Menu.prototype.addMenuOption = function (options) {
  var menuOption = new MenuOption(options, this);
  this.children.push(menuOption);
  return menuOption;
};

Menu.prototype.addChildMenu = function (options) {
  var menu = new Menu(options, this);
  this.children.push(menu);
  return menu;
};

Menu.prototype.createGroup = function (name, items) {
  var group = new Group({
    name: name,
    items: items
  });
  return group;
};

Menu.Line = Line;
Menu.Text = Text;
Menu.MenuOption = MenuOption;

module.exports = Menu;

},{"./colors":"/Users/jchapel/Projects/ld-30/src/colors.js","./ctx":"/Users/jchapel/Projects/ld-30/src/ctx.js","./events":"/Users/jchapel/Projects/ld-30/src/events.js","./text":"/Users/jchapel/Projects/ld-30/src/text.js","./utils":"/Users/jchapel/Projects/ld-30/src/utils.js","util":"/Users/jchapel/Projects/ld-30/node_modules/browserify/node_modules/util/util.js"}],"/Users/jchapel/Projects/ld-30/src/objects/resource-types.js":[function(require,module,exports){
'use strict';

var Resource = require('./resource');

var list = [];

exports.Protrudium = new Resource({
  id: 'Protrudium',
  name: 'Protrudium',
  description: 'Highly radioactive, Protrudium is a refined ore from the center of planets, commonly used for weapons.',
  baseValue: 15
});
list.push(exports.Protrudium);

exports.Mindworms = new Resource({
  id: 'Mindworms',
  name: 'Mindworms',
  description: 'Commonly used as biological weapons, mindworms are popular in the war torn areas of the universe.',
  baseValue: 25
});
list.push(exports.Mindworms);

exports.VespeneGas = new Resource({
  id: 'VespeneGas',
  name: 'Vespene Gas',
  description: 'Vespene gas is commonly used as an energy source for ships and machinary, but some races live off of it.',
  baseValue: 10
});
list.push(exports.VespeneGas);

exports.DenseCarbon = new Resource({
  id: 'DenseCarbon',
  name: 'Dense Carbon',
  description: 'On some planets carbon is the building block of life, but it normally rare across the universe.',
  baseValue: 20
});
list.push(exports.DenseCarbon);

exports.Dilithium = new Resource({
  id: 'Dilithium',
  name: 'Dilithium Crystals',
  description: 'Necessary for containing warp drive anti-matter reactions.',
  baseValue: 35
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
var utils = require('./utils');

function Screen(options) {
  this.bgColor = options.bgColor;

  ctx.bgColor(this.bgColor);

  if (options.onRender) {
    this.onRender(options.onRender);
  } else {
    this._onRender = function () {};
  }

  if (options.onInit) {
    this.onInit(options.onInit);
  } else {
    this.init = function () {};
  }

  if (options.onRemove) {
    this.onRemove(options.onRemove);
  } else {
    this.remove = function () {};
  }

  this.ctx = ctx;
  this.children = [];
}

Screen.prototype.onInit = function (init, context) {
  this.init = utils.bind(context || this, init);
};

Screen.prototype.onRemove = function (remove, context) {
  this.remove = utils.bind(context || this, remove);
};

Screen.prototype.onRender = function (onRender, context) {
  this._onRender = utils.bind(context || this, onRender);
};

Screen.prototype.dirty = function (isDirty) {
  this.isDirty = isDirty;
};

Screen.prototype.clear = function () {
  this.ctx.clear();
};

Screen.prototype.render = function (delta) {
  this._onRender(delta);
  for (var i = 0; i < this.childLength; i += 1) {
    this.children[i].render(delta);
  }
};

Screen.prototype.addChild = function (child) {
  this.children.push(child);
  this.childLength = this.children.length;
  return child;
};

module.exports = Screen;

},{"./ctx":"/Users/jchapel/Projects/ld-30/src/ctx.js","./utils":"/Users/jchapel/Projects/ld-30/src/utils.js"}],"/Users/jchapel/Projects/ld-30/src/screens/planet-flavor-text.js":[function(require,module,exports){
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

},{"../utils":"/Users/jchapel/Projects/ld-30/src/utils.js"}],"/Users/jchapel/Projects/ld-30/src/screens/planet-trade-menu.js":[function(require,module,exports){
'use strict';

var utils = require('../utils');
var truncate = require('truncate');

function TradeMenu(options) {
  this.screen = options.screen;
  this.primary = options.primary;
  this.secondary = options.secondary;
  this.bottom = options.bottom;

  if (options.onClickBack) {
    this.onClickBack(options.onClickBack);
  } else {
    this.onClickBack(function () {});
  }

  if (options.onClickResource) {
    this.onClickResource(options.onClickResource);
  } else {
    this.onClickResource(function () {});
  }
}

TradeMenu.prototype.create = function () {
  var screen = this.screen;
  var self = this;

  var tradeItems = [
    screen.menu.addText({
      text: 'Trade',
      x: 5,
      y: 20,
      textColor: this.secondary
    }),
    screen.menu.addText({
      text: 'Amount',
      x: 115,
      y: 20,
      textColor: this.secondary,
      align: 'right'
    }),
    screen.menu.addLine({
      startX: 5,
      startY: 30,
      endX: 115,
      endY: 30,
      color: this.secondary
    })
  ];

  var startY = 35;
  var toggle = false;
  var resource;
  for (var name in screen.planet.resources) {
    resource = screen.planet.resources[name];
    tradeItems.push(this.createAmount(resource, startY, toggle));
    tradeItems.push(this.createMenuItem(resource, startY, toggle));
    startY += 10;
    toggle = !toggle;
  }

  tradeItems.push(screen.menu.addMenuOption({
    text: '* Back',
    x: 5,
    y: this.bottom,
    textColor: this.primary,
    bgHoverColor: this.secondary,
    onClick: function () {
      self.clickBack();
    }
  }));

  this.list = screen.menu.createGroup('tradeMenu', tradeItems);
};

TradeMenu.prototype.createMenuItem = function (resource, y, toggle) {
  var name = truncate(resource.name, 12);
  var resourceMenu = this.screen.menu.addMenuOption({
    text: name,
    x: 5,
    y: y,
    textColor: toggle ? this.secondary : this.primary,
    bgHoverColor: toggle ? this.primary : this.secondary
  });

  resourceMenu.on('click', function () {
    this.clickResource(resource);
  }, this);

  resourceMenu.on('mouseover', function () {
    this.text = resource.name;
  });
  resourceMenu.on('mouseout', function () {
    this.text = name;
  });
  return resourceMenu;
};

TradeMenu.prototype.createAmount = function (resource, y, toggle) {
  var resourceAmount = this.screen.menu.addMenuOption({
    text: resource.amount,
    x: 115,
    y: y,
    textColor: toggle ? this.secondary : this.primary,
    bgHoverColor: toggle ? this.primary : this.secondary,
    align: 'right'
  });
  return resourceAmount;
};

TradeMenu.prototype.onClickResource = function (handler, context) {
  this.clickResource = utils.bind(context || this, handler);
};

TradeMenu.prototype.toggle = function (toggle) {
  this.list.visible(toggle);
};

TradeMenu.prototype.onClickBack = function (handler, context) {
  this.clickBack = utils.bind(context || this, handler);
};

module.exports = TradeMenu;

},{"../utils":"/Users/jchapel/Projects/ld-30/src/utils.js","truncate":"/Users/jchapel/Projects/ld-30/node_modules/truncate/truncate.js"}],"/Users/jchapel/Projects/ld-30/src/screens/planet-trade-modal.js":[function(require,module,exports){
'use strict';

var utils = require('../utils');
var colors = require('../colors');
var Menu = require('../menu');

function TradeModal(options) {
  this.screen = options.screen;
  this.primary = options.primary;
  this.secondary = options.secondary;

  if (options.onClickBack) {
    this.onClickBack(options.onClickBack);
  } else {
    this.onClickBack(function () {});
  }
}

TradeModal.prototype.create = function () {
  var screen = this.screen;

  var modal = this.modal = screen.addChild(new Menu({
    title: '',
    x: Math.floor((320 - 160)/6),
    y: Math.floor((200 - 100)/2),
    width: 160,
    height: 100,
    textColor: this.primary,
    bgColor: colors.black,
    borderColor: this.secondary
  }));


  /**
   * HEADERS/INTERFACE
   */
  this.interface = this.modal.createGroup('interface', [
    modal.addText({
      text: 'Price    Amount',
      x: 155,
      y: 20,
      align: 'right',
      textColor: this.secondary
    }),
    modal.addLine({
      startX: 5,
      startY: 30,
      endX: 155,
      endY: 30,
      color: this.secondary
    }),
    modal.addText({
      text: 'Buy',
      x: 10,
      y: 39,
      textColor: this.secondary
    }),
    modal.addText({
      text: 'Sell',
      x: 10,
      y: 59,
      textColor: this.secondary
    }),
    modal.addText({
      text: 'Totals',
      x: 10,
      y: 79,
      textColor: this.secondary
    }),
    modal.addLine({
      startX: 5,
      startY: 74,
      endX: 155,
      endY: 74,
      color: this.secondary
    })
  ]);


  /**
   * PRICES
   */
  var buyPrice = this.buyPrice = this.createPrice({
    x: 95,
    y: 39
  });

  var sellPrice = this.sellPrice = this.createPrice({
    x: 95,
    y: 59
  });

  var totalPrice = this.totalPrice = this.createPrice({
    x: 95,
    y: 79
  });

  this.prices = this.modal.createGroup('prices', [
    this.buyPrice,
    this.sellPrice,
    this.totalPrice
  ]);


  /**
   * INPUTS
   */
  var totalAmount = this.totalAmount = this.createPrice({
    x: 154,
    y: 79
  });

  var buyInput = this.buyInput = this.createInput({
    x: 120,
    y: 35,
    onClick: function (amount) {
      totalAmount.setText(amount);
      totalPrice.setText(-amount * buyPrice.getPrice());
      sellInput.setAmount(0);
    }
  });

  var sellInput = this.sellInput = this.createInput({
    x: 120,
    y: 55,
    onClick: function (amount) {
      totalAmount.setText(-amount);
      totalPrice.setText(amount * sellPrice.getPrice());
      buyInput.setAmount(0);
    }
  });

  this.inputs = this.modal.createGroup('inputs', [
    this.buyInput,
    this.sellInput,
    this.totalAmount
  ]);

};

TradeModal.prototype.createPrice = function (options) {
  var price = this.modal.addText({
    text: '0',
    x: options.x,
    y: options.y,
    align: 'right',
    textColor: this.primary
  });

  price.getPrice = function () {
    return parseInt(price.text, 10);
  };

  price.setPrice = function (amount) {
    price.setText(amount);
  };

  return price;
};

TradeModal.prototype.createInput = function (options) {
  var input = this.modal.addChildMenu({
    x: options.x,
    y: options.y,
    width: 35,
    height: 15,
    textColor: this.primary,
    bgColor: colors.black,
    borderColor: this.secondary
  });

  var amount = input.amount = input.addText({
    text: 0,
    x: 33,
    y: 4,
    textColor: this.primary,
    align: 'right',
    visible: true
  });

  input.addPolygon({
    x: -14,
    y: 5,
    points: [0, 0, 5, -5, 10, 0],
    color: this.secondary,
    hoverColor: this.primary,
    visible: true,
    onClick: function () {
      var number = input.getAmount() + 1;
      amount.setText(number);
      if (options.onClick) {
        options.onClick(number);
      }
    }
  });

  input.addPolygon({
    x: -14,
    y: 9,
    points: [0, 0, 5, 5, 10, 0],
    color: this.secondary,
    hoverColor: this.primary,
    visible: true,
    onClick: function () {
      var count = input.getAmount() - 1;
      if (count < 0) {
        count = 0;
      }
      amount.setText(count);
      if (options.onClick) {
        options.onClick(count);
      }
    }
  });

  input.getAmount = function () {
    return parseInt(amount.text, 10);
  };

  input.setAmount = function (count) {
    amount.setText(count);
  };

  return input;
};

TradeModal.prototype.toggle = function (toggle) {
  this.modal.visible(toggle);
  this.interface.visible(toggle);
  this.prices.visible(toggle);
  this.inputs.visible(toggle);
};

TradeModal.prototype.showModal = function (resource) {
  this.resource = resource;

  this.modal.title = 'Trade ' + this.resource.name;

  var buyPrice = Math.round(this.resource.value());
  if (buyPrice <= 0) {
    buyPrice = 1;
  }
  this.buyPrice.setPrice(buyPrice);
  this.sellPrice.setPrice(Math.round(this.resource.value() * utils.random(0.4, 0.75)));
  this.toggle(true);
};

TradeModal.prototype.onClickBack = function (handler, context) {
  this.clickBack = utils.bind(context || this, handler);
};

module.exports = TradeModal;

},{"../colors":"/Users/jchapel/Projects/ld-30/src/colors.js","../menu":"/Users/jchapel/Projects/ld-30/src/menu.js","../utils":"/Users/jchapel/Projects/ld-30/src/utils.js"}],"/Users/jchapel/Projects/ld-30/src/screens/planet.js":[function(require,module,exports){
'use strict';

var Screen = require('../screen');
var colors = require('../colors');

var Starfield = require('../elements/starfield');
var Planet = require('../elements/planet');
var FlavorText = require('./planet-flavor-text');
var TradeMenu = require('./planet-trade-menu');
var TradeModal = require('./planet-trade-modal');
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
    visible: true,
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
    onClickResource: function (resource) {
      screen.tradeModal.showModal(resource);
    },
    onClickBack: function () {
      this.toggle(false);
      screen.tradeModal.toggle(false);
      screen.flavorText.toggle(true);
    }
  });

  screen.tradeModal = new TradeModal({
    screen: screen,
    primary: primary,
    secondary: secondary,
    onClickBack: function () {
      this.toggle(false);
    }
  });

  screen.flavorText.create();
  screen.tradeMenu.create();
  screen.tradeModal.create();

  screen.onInit(function () {
    screen.flavorText.toggle(true);
    screen.tradeModal.showModal(screen.planet.resources.Dilithium);
  });

  screen.onRemove(function () {
    screen.flavorText.toggle(false);
    screen.tradeMenu.toggle(false);
  });

  return screen;
};

},{"../colors":"/Users/jchapel/Projects/ld-30/src/colors.js","../elements/planet":"/Users/jchapel/Projects/ld-30/src/elements/planet.js","../elements/starfield":"/Users/jchapel/Projects/ld-30/src/elements/starfield.js","../menu":"/Users/jchapel/Projects/ld-30/src/menu.js","../screen":"/Users/jchapel/Projects/ld-30/src/screen.js","./planet-flavor-text":"/Users/jchapel/Projects/ld-30/src/screens/planet-flavor-text.js","./planet-trade-menu":"/Users/jchapel/Projects/ld-30/src/screens/planet-trade-menu.js","./planet-trade-modal":"/Users/jchapel/Projects/ld-30/src/screens/planet-trade-modal.js"}],"/Users/jchapel/Projects/ld-30/src/text.js":[function(require,module,exports){
'use strict';

var ctx = require('./ctx');
var utils = require('./utils');

module.exports = function (options) {
  var text = options.text;
  var x = options.x;
  var y = options.y;
  var color = options.color;
  var bgColor = options.bgColor;
  var align = options.align;

  if (align) {
    ctx.textAlign(align);
  }

  ctx
    .penColor(color)
    .fillColor(bgColor)
    .text(text, Math.floor(x), Math.floor(y));

  ctx.textAlign('left');
  utils.clearColors();
};

module.exports.onReady = function (init) {
  ctx.addFont(window.fontRetro, function () {
    ctx.font('retro');
    init();
  });
};

},{"./ctx":"/Users/jchapel/Projects/ld-30/src/ctx.js","./utils":"/Users/jchapel/Projects/ld-30/src/utils.js"}],"/Users/jchapel/Projects/ld-30/src/utils.js":[function(require,module,exports){
'use strict';

var ctx = require('./ctx');
var readableRandom = require('readable-random');
var format = require('format-number');

var numberFormatter = format();
var meterFormatter = format({
  suffix: ' km'
});

exports.random = function (min, max) {
  return Math.min(Math.max(Math.floor(Math.random() * max), min), max);
};

exports.randomName = function () {
  var size;
  if (exports.random(0, 10) > 8) {
    size = exports.random(3, 9);
  } else {
    size = exports.random(5, 9);
  }
  var name = readableRandom.getString(size);
  return name[0].toUpperCase() + name.slice(1);
};

exports.formatMeters = function (number) {
  return meterFormatter(number);
};

exports.formatNumber = function (number) {
  return numberFormatter(number);
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

exports.argSlice = function (argObject) {
  var args = [];
  for (var i = 0, len = argObject.length; i < len; i += 1) {
    args[i] = argObject[i];
  }
  return args;
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

Point.prototype.toArray = function () {
  return [this.x, this.y];
};

exports.Point = Point;

},{"./ctx":"/Users/jchapel/Projects/ld-30/src/ctx.js","format-number":"/Users/jchapel/Projects/ld-30/node_modules/format-number/index.js","readable-random":"/Users/jchapel/Projects/ld-30/node_modules/readable-random/lib/readable-random.js"}]},{},["./src/main.js"]);
