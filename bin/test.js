/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 45);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by zyg on 16/7/15.
 */
module.exports = __webpack_require__(24)

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Duplicate declaration \"mountComponent\"\n\n\u001b[0m \u001b[90m 397 | \u001b[39m}\n \u001b[90m 398 | \u001b[39m\u001b[36mvar\u001b[39m i \u001b[33m=\u001b[39m \u001b[35m0\u001b[39m\u001b[33m;\u001b[39m\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 399 | \u001b[39m\u001b[36mfunction\u001b[39m mountComponent(node\u001b[33m,\u001b[39m parentComponent) {\n \u001b[90m     | \u001b[39m         \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 400 | \u001b[39m  \u001b[36mif\u001b[39m(\u001b[36mtypeof\u001b[39m node \u001b[33m===\u001b[39m \u001b[32m'string'\u001b[39m){\n \u001b[90m 401 | \u001b[39m    \u001b[36mreturn\u001b[39m node\u001b[33m;\u001b[39m\n \u001b[90m 402 | \u001b[39m  } \u001b[36melse\u001b[39m {\u001b[0m\n");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

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
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by zyg on 16/7/15.
 */


var n=0;

class Container {
  constructor(props) {
    this.name = n++;
    this.props = props;
    this.children = [];
  }
  addChild(c){
    this.children.push(c)
  }
  addChildAt(c,i){
    this.children.splice(i,0,c);
  }
  removeChildAt(i){
    this.children.splice(i,1);
  }
}


module.exports = {
  Container,
}


/***/ }),
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = __webpack_require__(52);
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./mapChildren_test.js": 54,
	"./updateChildrenComponent_test.js": 47,
	"./updateChildren_test.js": 48,
	"./updateProps_test.js": 49
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 44;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var testsContext = __webpack_require__(44);
testsContext.keys().forEach(function (k) {
  testsContext(k);
});

/***/ }),
/* 46 */,
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(PIXI) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = __webpack_require__(43);

var _pixiReact = __webpack_require__(18);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MyComponent = function (_PactComponent) {
  _inherits(MyComponent, _PactComponent);

  function MyComponent() {
    _classCallCheck(this, MyComponent);

    return _possibleConstructorReturn(this, (MyComponent.__proto__ || Object.getPrototypeOf(MyComponent)).apply(this, arguments));
  }

  _createClass(MyComponent, [{
    key: 'render',
    value: function render() {
      return (0, _pixiReact.h)(
        'c',
        { key: 'myComponent' },
        (0, _pixiReact.h)('c', { keyName: 'm0' }),
        this.slots,
        (0, _pixiReact.h)('c', { keyName: 'm3' })
      );
    }
  }]);

  return MyComponent;
}(_pixiReact.PactComponent);

var T = function (_PactComponent2) {
  _inherits(T, _PactComponent2);

  function T() {
    _classCallCheck(this, T);

    var _this2 = _possibleConstructorReturn(this, (T.__proto__ || Object.getPrototypeOf(T)).call(this, {}));

    _this2.state = {
      a: false,
      c2: true,
      c4: true
    };
    return _this2;
  }

  _createClass(T, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          a = _state.a,
          c2 = _state.c2,
          c4 = _state.c4;


      return (0, _pixiReact.h)(
        'c',
        { key: 'top' },
        a ? (0, _pixiReact.h)('c', { keyName: 'a' }) : '',
        (0, _pixiReact.h)(
          MyComponent,
          { keyName: 'c1' },
          (0, _pixiReact.h)('c', { keyName: 'm1' }),
          (0, _pixiReact.h)('c', { keyName: 'm2' })
        ),
        c2 ? (0, _pixiReact.h)('c', { keyName: 'c2' }) : (0, _pixiReact.h)('c', { keyName: 'c3' }),
        c4 ? (0, _pixiReact.h)('c', { keyName: 'c4' }) : ''
      );
    }
  }]);

  return T;
}(_pixiReact.PactComponent);

describe('复杂嵌套的组件', function () {

  var initChildrenLen = 4;

  describe('初始化', function () {
    var tVNode = (0, _pixiReact.h)(T);
    var topContainer = new PIXI.Container();
    var tInstance = (0, _pixiReact.renderTo)(tVNode, topContainer);

    console.log('===============================Compoennt组件更新-初始化=====================================');

    it('vNode', function () {
      // body...
      (0, _assert.equal)(tInstance.vNode.type, _pixiReact.Container, '顶层vNode的type类型');
      (0, _assert.equal)(tInstance.vNode.children.length, initChildrenLen, 'vNode的儿子们的长度');
      (0, _assert.equal)(tInstance.vNode.children[0], '', '第1个是空字符串');
      (0, _assert.equal)(tInstance.vNode.children[1].type, MyComponent, '第2个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[1].props.keyName, 'c1', '第2个儿子key');
      // !还没mount
      // equal(tInstance.vNode.children[0].children[0], 'm0', '第一个儿子key');
      // equal(tInstance.vNode.children[0].children[1], 'm3', '第一个儿子key');
      (0, _assert.equal)(tInstance.vNode.children[1].slots[0].type, _pixiReact.Container, '组件的第一个slot类型');
      (0, _assert.equal)(tInstance.vNode.children[1].slots[0].props.keyName, 'm1', '组件的第一个key');
      (0, _assert.equal)(tInstance.vNode.children[1].slots[1].type, _pixiReact.Container, '组件的第二个slot类型');
      (0, _assert.equal)(tInstance.vNode.children[1].slots[1].props.keyName, 'm2', '组件的第二个key');

      (0, _assert.equal)(tInstance.vNode.children[2].type, _pixiReact.Container, '第3个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[2].props.keyName, 'c2', '第3个儿子key');
      (0, _assert.equal)(tInstance.vNode.children[3].type, _pixiReact.Container, '第4个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[3].props.keyName, 'c4', '第4个儿子key');
    });
    it('根的子节点', function () {
      // body...
      (0, _assert.equal)(tInstance.children.length, 0, '子节点们的长度');
      (0, _assert.equal)(tInstance.vNode.instance.children.length, initChildrenLen, '子节点们的长度');
      (0, _assert.ok)(tInstance.vNode.instance.children[1].vNode, 'MyComponent对象存在vnode');
      (0, _assert.ok)(tInstance.vNode.instance.children[1].pixiEl, 'MyComponent对象有pixiEl');
      (0, _assert.equal)(tInstance.vNode.instance.children[1].pixiEl, tInstance.vNode.instance.pixiEl, 'MyComponent对象的pixiEl等于父亲的pixiEl');

      (0, _assert.ok)(!tInstance.vNode.instance.children[2].vNode, '2 pixi对象不存在vnode');
      (0, _assert.ok)(tInstance.vNode.instance.children[2].pixiEl, '2 pixi对象有pixiEl');
      (0, _assert.ok)(!tInstance.vNode.instance.children[3].vNode, '3 pixi对象不存在vnode');
      (0, _assert.ok)(tInstance.vNode.instance.children[3].pixiEl, '3 pixi对象有pixiEl');
    });

    it('MyComponent的子节点', function () {
      // body...
      var myComponent = tInstance.vNode.instance.children[1];

      (0, _assert.ok)(myComponent instanceof MyComponent, 'MyComponent的类型');
      (0, _assert.equal)(myComponent.slots.length, 2, 'MyComponent的slots长度');
      (0, _assert.equal)(myComponent.slots[0].props.keyName, 'm1', 'slots[0]的key');
      (0, _assert.equal)(myComponent.slots[1].props.keyName, 'm2', 'slots[1]的key');
      (0, _assert.equal)(myComponent.vNode.instance.children.length, 4, 'MyComponent的根下的子节点');
      (0, _assert.equal)(myComponent.vNode.children[0].props.keyName, 'm0', 'MyComponent的根下的子VNode 1');
      (0, _assert.equal)(myComponent.vNode.children[1].props.keyName, 'm1', 'MyComponent的根下的子VNode 2');
      (0, _assert.equal)(myComponent.vNode.children[2].props.keyName, 'm2', 'MyComponent的根下的子VNode 3');
      (0, _assert.equal)(myComponent.vNode.children[3].props.keyName, 'm3', 'MyComponent的根下的子VNode 4');
    });
  });

  describe('组件更新-添加', function () {
    var tVNode = (0, _pixiReact.h)(T);

    var topContainer2 = new PIXI.Container();
    var tInstance2 = (0, _pixiReact.renderTo)(tVNode, topContainer2);

    // body...
    var oldCh = tInstance2.vNode.instance.children.slice();

    tInstance2.setState({
      a: true
    });

    console.log('===============================Compoennt组件更新-添加=====================================');

    it('添加的vNode', function () {
      // body...
      (0, _assert.equal)(tInstance2.vNode.type, _pixiReact.Container, '顶层vNode的type类型');
      (0, _assert.equal)(tInstance2.vNode.children.length, initChildrenLen, 'vNode的儿子们的长度');
      (0, _assert.equal)(tInstance2.vNode.children[0].type, _pixiReact.Container, '第一个儿子类型');
      (0, _assert.equal)(tInstance2.vNode.children[0].props.keyName, 'a', '第一个儿子key');
      (0, _assert.equal)(tInstance2.vNode.children[1].type, MyComponent, '第二个儿子类型');
      (0, _assert.equal)(tInstance2.vNode.children[1].props.keyName, 'c1', '第二个儿子key');
      (0, _assert.equal)(tInstance2.vNode.children[2].type, _pixiReact.Container, '第三个儿子类型');
      (0, _assert.equal)(tInstance2.vNode.children[2].props.keyName, 'c2', '第三个儿子key');
      (0, _assert.equal)(tInstance2.vNode.children[3].type, _pixiReact.Container, '第4个儿子类型');
      (0, _assert.equal)(tInstance2.vNode.children[3].props.keyName, 'c4', '第4个儿子key');
    });
    it('添加的instance', function () {
      var newCh = tInstance2.vNode.instance.children.slice();
      // body...
      (0, _assert.equal)(tInstance2.vNode.instance.children.length, initChildrenLen, '子节点长度');
      (0, _assert.equal)(oldCh[1], newCh[1], '第一个节点不变');
      (0, _assert.equal)(oldCh[2], newCh[2], '第二个节点不变');
    });
  });

  describe('组建更新-替换', function () {
    var tVNode = (0, _pixiReact.h)(T);

    var topContainer3 = new PIXI.Container();
    var tInstance = (0, _pixiReact.renderTo)(tVNode, topContainer3);

    var oldCh = tInstance.vNode.instance.children.slice();
    tInstance.setState({
      a: true,
      c2: false
    });
    console.log('==============================Compoennt组建更新-替换======================================');

    // body...
    it('替换的VNode', function () {
      (0, _assert.equal)(tInstance.vNode.type, _pixiReact.Container, '顶层vNode的type类型');
      (0, _assert.equal)(tInstance.vNode.children.length, initChildrenLen, 'vNode的儿子们的长度');
      (0, _assert.equal)(tInstance.vNode.children[0].type, _pixiReact.Container, '第一个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[0].props.keyName, 'a', '第一个儿子key');
      (0, _assert.equal)(tInstance.vNode.children[1].type, MyComponent, '第二个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[1].props.keyName, 'c1', '第二个儿子key');
      (0, _assert.equal)(tInstance.vNode.children[2].type, _pixiReact.Container, '第三个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[2].props.keyName, 'c3', '第三个儿子key');
      (0, _assert.equal)(tInstance.vNode.children[3].type, _pixiReact.Container, '第4个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[3].props.keyName, 'c4', '第4个儿子key');
    });
    it('替换的instance', function () {
      var newCh = tInstance.vNode.instance.children.slice();

      (0, _assert.equal)(newCh.length, initChildrenLen, '子实例们的长度');
      (0, _assert.equal)(oldCh[1], newCh[1], 'key=c1的节点没变');
    });
  });
  describe('组建更新-删除', function () {
    var tVNode = (0, _pixiReact.h)(T);

    var topContainer3 = new PIXI.Container();
    var tInstance = (0, _pixiReact.renderTo)(tVNode, topContainer3);

    var oldCh = tInstance.vNode.instance.children.slice();
    tInstance.setState({
      a: true,
      c2: false,
      c4: false
    });
    console.log('==============================Compoennt组建更新-删除======================================');

    it('删除的VNode', function () {
      // body...
      (0, _assert.equal)(tInstance.vNode.type, _pixiReact.Container, '顶层vNode的type类型');
      (0, _assert.equal)(tInstance.vNode.children.length, initChildrenLen, 'vNode的儿子们长度');
      (0, _assert.equal)(tInstance.vNode.children[0].type, _pixiReact.Container, '第一个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[0].props.keyName, 'a', '第一个儿子key');
      (0, _assert.equal)(tInstance.vNode.children[1].type, MyComponent, '第二个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[1].props.keyName, 'c1', '第二个儿子key');
      (0, _assert.equal)(tInstance.vNode.children[2].type, _pixiReact.Container, '第三个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[2].props.keyName, 'c3', '第三个儿子key');
    });
    it('删除的instance', function () {
      var newCh = tInstance.vNode.instance.children;
      (0, _assert.equal)(newCh.length, initChildrenLen, '实例的长度');
      (0, _assert.equal)(oldCh[1], newCh[1]);
    });
  });
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(PIXI) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = __webpack_require__(43);

var _pixiReact = __webpack_require__(18);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var T = function (_PactComponent) {
  _inherits(T, _PactComponent);

  function T() {
    _classCallCheck(this, T);

    var _this = _possibleConstructorReturn(this, (T.__proto__ || Object.getPrototypeOf(T)).call(this, {}));

    _this.state = {
      a: false,
      c2: true,
      c4: true
    };
    return _this;
  }

  _createClass(T, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          a = _state.a,
          c2 = _state.c2,
          c = _state.c,
          c4 = _state.c4;


      return (0, _pixiReact.h)(
        'c',
        { key: 'top' },
        a ? (0, _pixiReact.h)('c', { keyName: 'a' }) : '',
        (0, _pixiReact.h)('c', { keyName: 'c1' }),
        c2 ? (0, _pixiReact.h)('c', { keyName: 'c2' }) : (0, _pixiReact.h)('c', { keyName: 'c3' }),
        c4 ? (0, _pixiReact.h)('c', { keyName: 'c4' }) : ''
      );
    }
  }]);

  return T;
}(_pixiReact.PactComponent);

describe('基础组件', function () {

  var initChildrenLen = 4;

  describe('初始化', function () {
    var tVNode = (0, _pixiReact.h)(T);
    var topContainer = new PIXI.Container();
    var tInstance = (0, _pixiReact.renderTo)(tVNode, topContainer);

    it('vNode', function () {
      // body...
      (0, _assert.equal)(tVNode.type, T, '初始vNode的type类型');
      (0, _assert.equal)(tInstance.vNode.type, _pixiReact.Container, '顶层vNode的type类型');
      (0, _assert.equal)(tInstance.vNode.children.length, initChildrenLen, 'vNode的儿子们的长度');
      (0, _assert.equal)(tInstance.vNode.children[0], '', '第一个儿子是空字符串');
      (0, _assert.equal)(tInstance.vNode.children[1].type, _pixiReact.Container, '第二个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[1].props.keyName, 'c1', '第二个儿子key');
      (0, _assert.equal)(tInstance.vNode.children[2].type, _pixiReact.Container, '第3个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[2].props.keyName, 'c2', '第3个儿子key');
      (0, _assert.equal)(tInstance.vNode.children[3].type, _pixiReact.Container, '第4个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[3].props.keyName, 'c4', '第4个儿子key');
    });
    it('子节点', function () {
      // body...
      (0, _assert.equal)(tInstance.children.length, 0, '子节点们的长度');
      (0, _assert.equal)(tInstance.vNode.instance.children.length, initChildrenLen, '子节点们的长度');
      (0, _assert.equal)(tInstance.vNode.instance.children[0], '', '第一个子实例是空字符串');
      (0, _assert.ifError)(tInstance.vNode.instance.children[1].vNode, '2. pixi对象不存在vnode');
      (0, _assert.ok)(tInstance.vNode.instance.children[1].pixiEl, '2. pixi对象有pixiEl');
    });
  });

  describe('组件更新-添加', function () {
    var tVNode = (0, _pixiReact.h)(T);

    var topContainer2 = new PIXI.Container();
    var tInstance2 = (0, _pixiReact.renderTo)(tVNode, topContainer2);
    // body...
    var oldCh = tInstance2.vNode.instance.children.slice();

    tInstance2.setState({
      a: true
    });

    // console.log('===============================组件更新-添加=====================================')

    it('添加的vNode', function () {
      // body...
      (0, _assert.equal)(tInstance2.vNode.type, _pixiReact.Container, '顶层vNode的type类型');
      (0, _assert.equal)(tInstance2.vNode.children.length, initChildrenLen, 'vNode的儿子们的长度');
      (0, _assert.equal)(tInstance2.vNode.children[0].type, _pixiReact.Container, '第一个儿子类型');
      (0, _assert.equal)(tInstance2.vNode.children[0].props.keyName, 'a', '第一个儿子key');
      (0, _assert.equal)(tInstance2.vNode.children[1].type, _pixiReact.Container, '第二个儿子类型');
      (0, _assert.equal)(tInstance2.vNode.children[1].props.keyName, 'c1', '第二个儿子key');
      (0, _assert.equal)(tInstance2.vNode.children[2].type, _pixiReact.Container, '第三个儿子类型');
      (0, _assert.equal)(tInstance2.vNode.children[2].props.keyName, 'c2', '第三个儿子key');
    });
    it('添加的instance', function () {
      var newCh = tInstance2.vNode.instance.children.slice();
      // body...
      (0, _assert.equal)(tInstance2.vNode.instance.children.length, initChildrenLen, '子节点长度');
      (0, _assert.equal)(oldCh[1], newCh[1], '第2个节点不变');
      (0, _assert.equal)(oldCh[2], newCh[2], '第3个节点不变');
    });
  });

  describe('组建更新-替换', function () {
    var tVNode = (0, _pixiReact.h)(T);

    var topContainer3 = new PIXI.Container();
    var tInstance = (0, _pixiReact.renderTo)(tVNode, topContainer3);

    var oldCh = tInstance.vNode.instance.children.slice();
    tInstance.setState({
      a: true,
      c2: false
    });
    console.log('==============================组建更新-替换======================================');

    // body...
    it('替换的VNode', function () {
      (0, _assert.equal)(tInstance.vNode.type, _pixiReact.Container, '顶层vNode的type类型');
      (0, _assert.equal)(tInstance.vNode.children.length, initChildrenLen, 'vNode的儿子们的长度');
      (0, _assert.equal)(tInstance.vNode.children[0].type, _pixiReact.Container, '第一个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[0].props.keyName, 'a', '第一个儿子key');
      (0, _assert.equal)(tInstance.vNode.children[1].type, _pixiReact.Container, '第二个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[1].props.keyName, 'c1', '第二个儿子key');
      (0, _assert.equal)(tInstance.vNode.children[2].type, _pixiReact.Container, '第三个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[2].props.keyName, 'c3', '第三个儿子key');
    });
    it('替换的instance', function () {
      var newCh = tInstance.vNode.instance.children.slice();
      (0, _assert.equal)(newCh.length, initChildrenLen, '子实例们的长度');
      (0, _assert.equal)(oldCh[1], newCh[1], 'key=c1的节点没变');
    });
  });
  describe('组建更新-删除', function () {
    var tVNode = (0, _pixiReact.h)(T);

    var topContainer3 = new PIXI.Container();
    var tInstance = (0, _pixiReact.renderTo)(tVNode, topContainer3);

    var oldCh = tInstance.vNode.instance.children.slice();
    tInstance.setState({
      a: true,
      c2: false,
      c4: false
    });
    console.log('==============================组建更新-删除======================================');

    it('删除的VNode', function () {
      // body...
      (0, _assert.equal)(tInstance.vNode.type, _pixiReact.Container, '顶层vNode的type类型');
      (0, _assert.equal)(tInstance.vNode.children.length, initChildrenLen, 'vNode的儿子们长度');
      (0, _assert.equal)(tInstance.vNode.children[0].type, _pixiReact.Container, '第一个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[0].props.keyName, 'a', '第一个儿子key');
      (0, _assert.equal)(tInstance.vNode.children[1].type, _pixiReact.Container, '第二个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[1].props.keyName, 'c1', '第二个儿子key');
      (0, _assert.equal)(tInstance.vNode.children[2].type, _pixiReact.Container, '第三个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[2].props.keyName, 'c3', '第三个儿子key');
    });
    it('删除的instance', function () {
      var newCh = tInstance.vNode.instance.children;
      (0, _assert.equal)(newCh.length, initChildrenLen, '实例的长度');
      (0, _assert.equal)(oldCh[1], newCh[1], '第一个节点实例不变');
      (0, _assert.equal)(newCh[3], '', '第4个节点是空字符串');
    });
  });
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(PIXI) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = __webpack_require__(43);

var _pixiReact = __webpack_require__(18);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SecondComponent = function (_PactComponent) {
  _inherits(SecondComponent, _PactComponent);

  function SecondComponent() {
    _classCallCheck(this, SecondComponent);

    return _possibleConstructorReturn(this, (SecondComponent.__proto__ || Object.getPrototypeOf(SecondComponent)).apply(this, arguments));
  }

  _createClass(SecondComponent, [{
    key: 'render',
    value: function render() {
      return (0, _pixiReact.h)('c', null);
    }
  }]);

  return SecondComponent;
}(_pixiReact.PactComponent);

var MyComponent = function (_PactComponent2) {
  _inherits(MyComponent, _PactComponent2);

  function MyComponent() {
    _classCallCheck(this, MyComponent);

    return _possibleConstructorReturn(this, (MyComponent.__proto__ || Object.getPrototypeOf(MyComponent)).apply(this, arguments));
  }

  _createClass(MyComponent, [{
    key: 'render',
    value: function render() {
      var name = this.props.name;

      var m3Name = 'm3-' + name;

      return (0, _pixiReact.h)(
        'c',
        { key: 'myComponent' },
        (0, _pixiReact.h)('c', { key: 'm0' }),
        this.slots,
        (0, _pixiReact.h)(SecondComponent, { key: 'm3', name: m3Name })
      );
    }
  }]);

  return MyComponent;
}(_pixiReact.PactComponent);

var T = function (_PactComponent3) {
  _inherits(T, _PactComponent3);

  function T() {
    _classCallCheck(this, T);

    var _this3 = _possibleConstructorReturn(this, (T.__proto__ || Object.getPrototypeOf(T)).call(this, {}));

    _this3.state = {
      a: false,
      c2: true,
      c4: true,
      name1: 'c',
      name2: 'myComponent'
    };
    return _this3;
  }

  _createClass(T, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          a = _state.a,
          c2 = _state.c2,
          c4 = _state.c4,
          name1 = _state.name1,
          name2 = _state.name2;


      return (0, _pixiReact.h)(
        'c',
        { key: 'top', name: name1 },
        a ? (0, _pixiReact.h)('c', null) : '',
        (0, _pixiReact.h)(
          MyComponent,
          { name: name2 },
          (0, _pixiReact.h)('c', null),
          (0, _pixiReact.h)('c', null)
        ),
        c2 ? (0, _pixiReact.h)('c', { key: 'c2' }) : (0, _pixiReact.h)('c', { key: 'c3' }),
        c4 ? (0, _pixiReact.h)('c', { name: name2 }) : ''
      );
    }
  }]);

  return T;
}(_pixiReact.PactComponent);

describe('更新props', function () {

  describe('初始化', function () {
    var tVNode = (0, _pixiReact.h)(T);
    var topContainer = new PIXI.Container();
    var tInstance = (0, _pixiReact.renderTo)(tVNode, topContainer);
    var childrenLen = 4;

    it('vNode', function () {
      // body...
      (0, _assert.equal)(tInstance.vNode.children.length, childrenLen, 'length of vNode children');
      (0, _assert.equal)(tInstance.vNode.props.name, 'c', 'name in vNode');
      (0, _assert.equal)(tInstance.vNode.children[0], '', '第一个是空字符串');
      (0, _assert.equal)(tInstance.vNode.children[1].props.name, 'myComponent', 'name of first child');
    });
    it('instance', function () {

      (0, _assert.equal)(tInstance.children, 0, 'cur instance children');
      (0, _assert.equal)(tInstance.vNode.instance.props.name, 'c', 'root instance name');
      (0, _assert.equal)(tInstance.vNode.instance.children[1].props.name, 'myComponent', 'first child instance name');
      (0, _assert.equal)(tInstance.vNode.instance.children[1].vNode.instance.children[3].props.name, 'm3-myComponent', 'first child instance name');
    });
  });
  describe('更新name', function () {
    var tVNode = (0, _pixiReact.h)(T);
    var topContainer = new PIXI.Container();
    var tInstance = (0, _pixiReact.renderTo)(tVNode, topContainer);
    var childrenLen = 4;

    var oldMyComponentInst = tInstance.vNode.instance.children[1];
    var oldSecondVNode = tInstance.vNode.instance.children[1].vNode.children[3];
    var oldSecondInst = tInstance.vNode.instance.children[1].vNode.instance.children[3];

    console.log('==========更新name==========');

    tInstance.setState({
      name1: 'newName1',
      name2: 'newName2'
    });

    it('vNode', function () {
      // body...
      (0, _assert.equal)(tInstance.vNode.children.length, childrenLen, 'length of vNode children');
      (0, _assert.equal)(tInstance.vNode.props.name, 'newName1', 'name in vNode');
      (0, _assert.equal)(tInstance.vNode.children[1].props.name, 'newName2', 'name of first child');
      (0, _assert.equal)(oldSecondVNode.type, SecondComponent, 'child child compoennt type');
    });
    it('instance', function () {
      var newCh = tInstance.vNode.instance.children;
      // body...
      (0, _assert.equal)(tInstance.vNode.instance.props.name, 'newName1', 'root instance name');
      (0, _assert.equal)(tInstance.vNode.instance.children[1].props.name, 'newName2', 'first child instance name');
      (0, _assert.equal)(tInstance.vNode.instance.children[1].vNode.instance.children[3].props.name, 'm3-newName2', 'first child instance name');
      (0, _assert.equal)(oldMyComponentInst, newCh[1], 'instace keep');
    });
  });
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 50 */
/***/ (function(module, exports) {

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


/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
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

exports.isBuffer = __webpack_require__(51);

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
exports.inherits = __webpack_require__(50);

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8), __webpack_require__(19)))

/***/ }),
/* 53 */,
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(PIXI) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = __webpack_require__(43);

var _pixiReact = __webpack_require__(18);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var T = function (_PactComponent) {
  _inherits(T, _PactComponent);

  function T() {
    _classCallCheck(this, T);

    var _this = _possibleConstructorReturn(this, (T.__proto__ || Object.getPrototypeOf(T)).call(this, {}));

    _this.state = {
      list: ['name', 'xx']
    };
    return _this;
  }

  _createClass(T, [{
    key: 'render',
    value: function render() {
      var list = this.state.list;


      return (0, _pixiReact.h)(
        'c',
        null,
        list.map(function (name) {
          return (0, _pixiReact.h)('c', { key: name, name: name });
        })
      );
    }
  }]);

  return T;
}(_pixiReact.PactComponent);

describe('数组子节点', function () {

  describe('初始化', function () {
    var tVNode = (0, _pixiReact.h)(T);
    var topContainer = new PIXI.Container();
    var tInstance = (0, _pixiReact.renderTo)(tVNode, topContainer);

    it('vNode', function () {

      (0, _assert.equal)(tInstance.vNode.type, _pixiReact.Container, '顶层vNode的type类型');
      (0, _assert.equal)(tInstance.vNode.children.length, 2, 'vNode的儿子们的长度');
      (0, _assert.equal)(tInstance.vNode.children[0].props.name, 'name', '第1个vNode的名字');
      (0, _assert.equal)(tInstance.vNode.children[1].props.name, 'xx', '第2个vNode的名字');
    });
  });
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })
/******/ ]);