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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by zyg on 16/7/15.
 */
module.exports = __webpack_require__(3)

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(PIXI) {
//import PIXI from 'pixi.js'

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(2);

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isUndef = utils.isUndef,
    isDef = utils.isDef,
    log = utils.log;


function replaceVNode(parentVNode, newVNode, replaceIndex) {
  //...@TODO
  // log('replaceVNode:', replaceIndex, newVNode.key);

  var newInstance = mountComponent(newVNode, parentVNode.instance);

  parentVNode.instance.rootInstance.children[replaceIndex] = newInstance;
  parentVNode.children[replaceIndex] = newVNode;

  if (!newInstance.vNode) {
    parentVNode.instance.pixiEl.removeChildAt(replaceIndex);
    parentVNode.instance.pixiEl.addChildAt(newInstance.pixiEl, replaceIndex);
  }
}
function addVNode(parentVNode, newVNode, targetIndex) {
  log('addVNode:', targetIndex, newVNode.key);
  var newInstance = mountComponent(newVNode, parentVNode.instance);

  parentVNode.instance.rootInstance.children.splice(targetIndex, 0, newInstance);
  parentVNode.children.splice(targetIndex, 0, newVNode);

  // log(targetIndex,parentVNode.instance);
  // log('=== addVNode ===');

  if (!newInstance.vNode) {
    parentVNode.instance.pixiEl.addChildAt(newInstance.pixiEl, targetIndex);
  }
}

function removeVNode(parentVNode, oldVNode, removeFromIndex) {
  log('removeVNode:', removeFromIndex, oldVNode.key);
  parentVNode.instance.rootInstance.children.splice(removeFromIndex, 1);
  parentVNode.children.splice(removeFromIndex, 1);
}

function updateChildren(instanceParentVnode, newParentVnode) {
  var oldCh = instanceParentVnode.children.slice();
  var newCh = newParentVnode.children.slice();

  var oldLen = oldCh.length;
  var newLen = newCh.length;

  var oldStartIndex = 0;
  var oldEndIndex = 0;
  var oldStartVnode = oldCh[0];
  var oldEndVnode = oldCh[oldLen - 1];

  var newStartIndex = 0;
  var newEndIndex = newLen - 1;
  var newStartVnode = newCh[0];
  var newEndVnode = newCh[newLen - 1];

  var patchedIndexArr = [];
  var addedNum = 0;
  //newCh [new1, new2, new3...]
  while (newStartIndex <= newEndIndex) {
    if (patchedIndexArr.indexOf(newStartIndex) !== -1) {
      newStartIndex++;
      continue;
    }
    //...diff
    var newVNode = newCh[newStartIndex];
    var oldChIndex = oldStartIndex;

    var finalMatchOldNode = false;

    log('newVNode:', newVNode.key, newStartIndex, oldChIndex);

    //oldCh [old1, old2, old3....]
    while (oldChIndex <= oldLen - 1) {
      var oldVNode = oldCh[oldChIndex];
      if (utils.equalVNode(oldVNode, newVNode)) {
        oldStartIndex = oldChIndex + 1;
        log('finalMatchOldNode:', oldVNode.key, oldChIndex);
        patchVnode(oldVNode, newVNode);
        finalMatchOldNode = true;
        break;
      } else {
        var findOldVNode = false;
        var otherNewIndex = newStartIndex + 1;
        var newVNode2 = null;

        //newCh [new2, new3...]
        while (otherNewIndex <= newEndIndex) {
          newVNode2 = newCh[otherNewIndex];
          if (utils.equalVNode(oldVNode, newVNode2)) {
            patchedIndexArr.push(otherNewIndex);
            findOldVNode = true;
            break;
          }
          otherNewIndex++;
        }

        if (findOldVNode) {
          oldStartIndex = oldChIndex + 1;
          patchVnode(oldVNode, newVNode2);
          break;
        } else {
          log(newStartIndex, newVNode.key);
          removeVNode(instanceParentVnode, oldVNode, oldChIndex + addedNum);
          addedNum--;
          oldChIndex++;
          oldStartIndex++;
        }
      }
    }

    if (!finalMatchOldNode) {
      addVNode(instanceParentVnode, newVNode, oldChIndex);
      addedNum++;
    }
    newStartIndex++;
  }

  // log('=== updateChildren ===')
}

function patchVnode(oldVNode, newVNode) {
  var isEquivalentNodeWithChildren = utils.equalVNode(oldVNode, newVNode, true);

  // log(`isEquivalentNodeWithChildren:`,oldVNode.key,isEquivalentNodeWithChildren);
  // log(oldVNode);
  // log(newVNode);
  // log('== patchVnode ==');

  if (isEquivalentNodeWithChildren) {
    // 完全等价的节点，不同替换。继续检查子节点
    oldVNode.children.slice().forEach(function (oldChildVNode, i) {
      patchVnode(oldChildVNode, newVNode.children[i]);
    });
  } else {
    updateChildren(oldVNode, newVNode);
  }
}

function updateComponent(instance) {
  var newVNode = instance.render();
  // log(`updateComponent:`, newVNode);
  if (utils.isPixiObj(newVNode)) {} else if (utils.isVNode(newVNode)) {
    var isEquivalentNode = utils.equalVNode(instance.vNode, newVNode);
    if (isEquivalentNode) {
      patchVnode(instance.vNode, newVNode);
    }
  }

  instance.children.forEach(function (childInstance) {
    updateComponent(childInstance);
  });
}

function mountComponent(node, parentComponent) {
  var instance = new node.type(node.props, node.slots);
  var vNode = instance.render();
  vNode.instance = instance;

  if (utils.isPixiObj(vNode)) {
    instance.pixiEl = vNode;
    instance.isMounted = true;
  } else if (utils.isVNode(vNode)) {
    instance.vNode = vNode;
    instance.pixiEl = parentComponent.pixiEl;
    instance.isMounted = true;

    var rootInstance = mountComponent(vNode, instance);

    if (!rootInstance.vNode) {
      instance.pixiEl.addChild(rootInstance.pixiEl);
    }
    instance.rootInstance = rootInstance;
  } else {
    throw new Error('mountComponent 卧槽');
  }

  node.children.map(function (childNode) {
    log('childMountComponent:', childNode.key, instance);
    var childInstance = mountComponent(childNode, instance);
    instance.children.push(childInstance);
    if (!childInstance.vNode) {
      instance.pixiEl.addChild(childInstance.pixiEl);
    }
  });

  return instance;
}

function renderTo(node, pixiContainer) {
  var instance = new node.type(node.props, node.slots);
  var instanceVNode = instance.render();

  instance.pixiEl = pixiContainer;
  instance.vNode = instanceVNode;
  instanceVNode.instance = instance;

  var rootInstance = mountComponent(instanceVNode, instance);

  instance.rootInstance = rootInstance;

  return instance;
}

var PactComponent = function () {
  function PactComponent(props, slots) {
    _classCallCheck(this, PactComponent);

    this.state = {};
    this.props = {};

    Object.assign(this.props, props);

    this.isMounted = false;
    this.vNode = null; //render产生的虚拟node
    this.pixiEl; //pixi对象
    this.rootInstance; //根实例对象
    this.children = []; //子PactComponent对象
    this.slots = slots || []; //插槽
  }

  _createClass(PactComponent, [{
    key: 'setState',
    value: function setState(obj) {
      this.state = Object.assign({}, this.state, obj);
      //@TODO 同步更新组件
      updateComponent(this);
    }
  }, {
    key: 'update',
    value: function update() {
      // @TODO
    }
  }, {
    key: 'addChild',
    value: function addChild(pactObj, i) {}
  }, {
    key: 'removeChild',
    value: function removeChild(pactObj) {}
  }, {
    key: 'didMount',
    value: function didMount() {}
  }, {
    key: 'unmount',
    value: function unmount() {}
  }, {
    key: 'render',
    value: function render() {}
  }]);

  return PactComponent;
}();

var j = 0;

var Container = function (_PactComponent) {
  _inherits(Container, _PactComponent);

  function Container(props) {
    _classCallCheck(this, Container);

    return _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));
  }

  _createClass(Container, [{
    key: 'render',
    value: function render() {
      return new PIXI.Container(this.props);
    }
  }]);

  return Container;
}(PactComponent);

function h(componentClass, props) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  if (!props) {
    props = {};
  }
  children = children.filter(function (child) {
    return !!child && (typeof child === 'undefined' ? 'undefined' : _typeof(child)) === 'object';
  }).reduce(function (prev, next) {
    // 带slots情况下,children是个二维数组
    return prev.concat(next);
  }, []);

  var slots = [];

  // @TODO
  if (utils.isReservedType(componentClass)) {
    componentClass = Container;
  } else if (typeof componentClass === 'function') {
    //暂时忽略 props.children
    slots = children.slice();
    children = [];
  } else {
    console.error(componentClass);
    throw new Error('the compoennt muse be a PactComponent');
  }

  var key = props.key;
  delete props.key;

  var node = {
    type: componentClass,
    key: key,
    instance: null,
    props: props,
    children: children,
    slots: slots
  };

  // log(`node:`, node);
  return node;
}

module.exports.Container = Container;
module.exports.renderTo = renderTo;
module.exports.PactComponent = PactComponent;
module.exports.h = h;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isDef = isDef;
exports.isUndef = isUndef;
exports.isReservedType = isReservedType;
exports.isVNode = isVNode;
exports.isPixiObj = isPixiObj;
exports.isEqualObj = isEqualObj;
exports.equalVNode = equalVNode;
exports.compareObject = compareObject;
exports.log = log;
function isDef(v) {
  return !!v || v === 0;
}
function isUndef(v) {
  return v === undefined;
}

function isReservedType(name) {
  return name === 'c' || name === 'container';
}

function isVNode(obj) {
  var keys = Object.keys(obj);

  return ['props', 'type', 'children'].every(function (k) {
    return keys.indexOf(k) !== -1;
  });
}

function isPixiObj(obj) {
  return obj && obj.addChild;
}

function isEqualObj(obj1, obj2) {}

function equalVNode(obj1, obj2, checkChildren) {
  var isSameNode;

  if (isDef(obj1.key) || isDef(obj2.key)) {
    isSameNode = obj1.key === obj2.key;
  } else {
    if (obj1.type === obj2.type) {
      isSameNode = compareObject(obj1.props, obj2.props);
    }
  }

  if (isSameNode && checkChildren) {
    var len = obj1.children.length;
    isSameNode = len === obj2.children.length;
    if (isSameNode) {
      var i = 0;
      var isSameChild = true;

      while (i < len) {
        var childObj1 = obj1.children[i];
        var childObj2 = obj2.children[i];

        isSameChild = equalVNode(childObj1, childObj2);
        if (!isSameChild) {
          break;
        }
        i++;
      }
      isSameNode = isSameChild;
    }
  }

  return isSameNode;
}

function compareObject(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }

  var keys1 = Object.keys(obj1);
  var keys2 = Object.keys(obj2);

  if (keys1.join('') === keys2.join('')) {
    return keys1.every(function (k) {
      var type1 = _typeof(obj1[k]);
      var type2 = _typeof(obj2[k]);
      if (type1 !== type2) {
        return false;
      } else if (type1 === 'object') {
        return compareObject(obj1[k], obj2[k]);
      } else if (type1 === 'function') {
        var r = obj1[k].toString() === obj2[k].toString();
        return r;
      }
      return obj1[k] === obj2[k];
    });
  }
  return false;
}

function log() {
  //console.log.apply(console,arguments);
}

/***/ }),
/* 3 */
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
/* 4 */
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

var util = __webpack_require__(14);
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./updateChildrenComponent_test.js": 9,
	"./updateChildren_test.js": 10
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
webpackContext.id = 6;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var testsContext = __webpack_require__(6);
testsContext.keys().forEach(function (k) {
  testsContext(k);
});

/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(PIXI) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = __webpack_require__(4);

var _reactPixi = __webpack_require__(1);

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
      return (0, _reactPixi.h)(
        'c',
        { key: 'myComponent' },
        (0, _reactPixi.h)('c', { key: 'm0' }),
        this.slots,
        (0, _reactPixi.h)('c', { key: 'm3' })
      );
    }
  }]);

  return MyComponent;
}(_reactPixi.PactComponent);

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


      return (0, _reactPixi.h)(
        'c',
        { key: 'top' },
        a ? (0, _reactPixi.h)('c', { key: 'a' }) : '',
        (0, _reactPixi.h)(
          MyComponent,
          { key: 'c1' },
          (0, _reactPixi.h)('c', { key: 'm1' }),
          (0, _reactPixi.h)('c', { key: 'm2' })
        ),
        c2 ? (0, _reactPixi.h)('c', { key: 'c2' }) : (0, _reactPixi.h)('c', { key: 'c3' }),
        c4 ? (0, _reactPixi.h)('c', { key: 'c4' }) : ''
      );
    }
  }]);

  return T;
}(_reactPixi.PactComponent);

describe('复杂嵌套的组件', function () {

  var initChildrenLen = 3;

  describe('初始化', function () {
    var tVNode = (0, _reactPixi.h)(T);
    var topContainer = new PIXI.Container();
    var tInstance = (0, _reactPixi.renderTo)(tVNode, topContainer);

    console.log('===============================Compoennt组件更新-初始化=====================================');

    it('vNode', function () {
      // body...
      (0, _assert.equal)(tInstance.vNode.type, _reactPixi.Container, '顶层vNode的type类型');
      (0, _assert.equal)(tInstance.vNode.children.length, initChildrenLen, 'vNode的儿子们的长度');
      (0, _assert.equal)(tInstance.vNode.children[0].type, MyComponent, '第一个儿子类型');

      (0, _assert.equal)(tInstance.vNode.children[0].key, 'c1', '第一个儿子key');
      // equal(tInstance.vNode.children[0].children[0], 'm0', '第一个儿子key');
      // equal(tInstance.vNode.children[0].children[1], 'm3', '第一个儿子key');
      (0, _assert.equal)(tInstance.vNode.children[0].slots[0].type, _reactPixi.Container, '组件的第一个slot类型');
      (0, _assert.equal)(tInstance.vNode.children[0].slots[0].key, 'm1', '组件的第一个key');
      (0, _assert.equal)(tInstance.vNode.children[0].slots[1].type, _reactPixi.Container, '组件的第二个slot类型');
      (0, _assert.equal)(tInstance.vNode.children[0].slots[1].key, 'm2', '组件的第二个key');

      (0, _assert.equal)(tInstance.vNode.children[1].type, _reactPixi.Container, '第二个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[1].key, 'c2', '第二个儿子key');
      (0, _assert.equal)(tInstance.vNode.children[2].type, _reactPixi.Container, '第3个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[2].key, 'c4', '第3个儿子key');
    });
    it('根的子节点', function () {
      // body...
      (0, _assert.equal)(tInstance.children.length, 0, '子节点们的长度');
      (0, _assert.equal)(tInstance.rootInstance.children.length, initChildrenLen, '子节点们的长度');
      (0, _assert.ok)(tInstance.rootInstance.children[0].vNode, 'MyComponent对象存在vnode');
      (0, _assert.ok)(tInstance.rootInstance.children[0].pixiEl, 'MyComponent对象有pixiEl');
      (0, _assert.equal)(tInstance.rootInstance.children[0].pixiEl, tInstance.rootInstance.pixiEl, 'MyComponent对象的pixiEl等于父亲的pixiEl');

      (0, _assert.ok)(!tInstance.rootInstance.children[1].vNode, '2 pixi对象不存在vnode');
      (0, _assert.ok)(tInstance.rootInstance.children[1].pixiEl, '2 pixi对象有pixiEl');
      (0, _assert.ok)(!tInstance.rootInstance.children[2].vNode, '3 pixi对象不存在vnode');
      (0, _assert.ok)(tInstance.rootInstance.children[2].pixiEl, '3 pixi对象有pixiEl');
    });

    it('MyComponent的子节点', function () {
      // body...
      var myComponent = tInstance.rootInstance.children[0];

      (0, _assert.ok)(myComponent instanceof MyComponent, 'MyComponent的类型');
      (0, _assert.equal)(myComponent.slots.length, 2, 'MyComponent的slots长度');
      (0, _assert.equal)(myComponent.slots[0].key, 'm1', 'slots[0]的key');
      (0, _assert.equal)(myComponent.slots[1].key, 'm2', 'slots[1]的key');
      (0, _assert.equal)(myComponent.rootInstance.children.length, 4, 'MyComponent的根下的子节点');
      (0, _assert.equal)(myComponent.vNode.children[0].key, 'm0', 'MyComponent的根下的子VNode 1');
      (0, _assert.equal)(myComponent.vNode.children[1].key, 'm1', 'MyComponent的根下的子VNode 2');
      (0, _assert.equal)(myComponent.vNode.children[2].key, 'm2', 'MyComponent的根下的子VNode 3');
      (0, _assert.equal)(myComponent.vNode.children[3].key, 'm3', 'MyComponent的根下的子VNode 4');
    });
  });

  describe('组件更新-添加', function () {
    var tVNode = (0, _reactPixi.h)(T);

    var topContainer2 = new PIXI.Container();
    var tInstance2 = (0, _reactPixi.renderTo)(tVNode, topContainer2);

    // body...
    var oldCh = tInstance2.rootInstance.children.slice();

    tInstance2.setState({
      a: true
    });

    console.log('===============================Compoennt组件更新-添加=====================================');

    it('添加的vNode', function () {
      // body...
      (0, _assert.equal)(tInstance2.vNode.type, _reactPixi.Container, '顶层vNode的type类型');
      (0, _assert.equal)(tInstance2.vNode.children.length, initChildrenLen + 1, 'vNode的儿子们的长度');
      (0, _assert.equal)(tInstance2.vNode.children[0].type, _reactPixi.Container, '第一个儿子类型');
      (0, _assert.equal)(tInstance2.vNode.children[0].key, 'a', '第一个儿子key');
      (0, _assert.equal)(tInstance2.vNode.children[1].type, _reactPixi.Container, '第二个儿子类型');
      (0, _assert.equal)(tInstance2.vNode.children[1].key, 'c1', '第二个儿子key');
      (0, _assert.equal)(tInstance2.vNode.children[2].type, _reactPixi.Container, '第三个儿子类型');
      (0, _assert.equal)(tInstance2.vNode.children[2].key, 'c2', '第三个儿子key');
    });
    it('添加的instance', function () {
      var newCh = tInstance2.rootInstance.children.slice();
      // body...
      (0, _assert.equal)(tInstance2.rootInstance.children.length, initChildrenLen + 1, '子节点长度');
      (0, _assert.equal)(oldCh[0], newCh[1], '第一个节点不变');
      (0, _assert.equal)(oldCh[1], newCh[2], '第二个节点不变');
    });
  });

  describe('组建更新-替换', function () {
    var tVNode = (0, _reactPixi.h)(T);

    var topContainer3 = new PIXI.Container();
    var tInstance = (0, _reactPixi.renderTo)(tVNode, topContainer3);

    var oldCh = tInstance.rootInstance.children.slice();
    tInstance.setState({
      a: true,
      c2: false
    });
    console.log('==============================Compoennt组建更新-替换======================================');

    // body...
    it('替换的VNode', function () {
      (0, _assert.equal)(tInstance.vNode.type, _reactPixi.Container, '顶层vNode的type类型');
      (0, _assert.equal)(tInstance.vNode.children.length, initChildrenLen + 1, 'vNode的儿子们的长度');
      (0, _assert.equal)(tInstance.vNode.children[0].type, _reactPixi.Container, '第一个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[0].key, 'a', '第一个儿子key');
      (0, _assert.equal)(tInstance.vNode.children[1].type, _reactPixi.Container, '第二个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[1].key, 'c1', '第二个儿子key');
      (0, _assert.equal)(tInstance.vNode.children[2].type, _reactPixi.Container, '第三个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[2].key, 'c3', '第三个儿子key');
    });
    it('替换的instance', function () {
      var newCh = tInstance.rootInstance.children.slice();

      (0, _assert.equal)(newCh.length, initChildrenLen + 1, '子实例们的长度');
      (0, _assert.equal)(oldCh[0], newCh[1], 'key=c1的节点没变');
    });
  });
  describe('组建更新-删除', function () {
    var tVNode = (0, _reactPixi.h)(T);

    var topContainer3 = new PIXI.Container();
    var tInstance = (0, _reactPixi.renderTo)(tVNode, topContainer3);

    var oldCh = tInstance.rootInstance.children.slice();
    tInstance.setState({
      a: true,
      c2: false,
      c4: false
    });
    console.log('==============================Compoennt组建更新-删除======================================');

    it('删除的VNode', function () {
      // body...
      (0, _assert.equal)(tInstance.vNode.type, _reactPixi.Container, '顶层vNode的type类型');
      (0, _assert.equal)(tInstance.vNode.children.length, 3, 'vNode的儿子们长度');
      (0, _assert.equal)(tInstance.vNode.children[0].type, _reactPixi.Container, '第一个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[0].key, 'a', '第一个儿子key');
      (0, _assert.equal)(tInstance.vNode.children[1].type, _reactPixi.Container, '第二个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[1].key, 'c1', '第二个儿子key');
      (0, _assert.equal)(tInstance.vNode.children[2].type, _reactPixi.Container, '第三个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[2].key, 'c3', '第三个儿子key');
    });
    it('删除的instance', function () {
      var newCh = tInstance.rootInstance.children;
      (0, _assert.equal)(newCh.length, 3, '实例的长度');
      (0, _assert.equal)(oldCh[0], newCh[1]);
    });
  });
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(PIXI) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = __webpack_require__(4);

var _reactPixi = __webpack_require__(1);

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


      return (0, _reactPixi.h)(
        'c',
        { key: 'top' },
        a ? (0, _reactPixi.h)('c', { key: 'a' }) : '',
        (0, _reactPixi.h)('c', { key: 'c1' }),
        c2 ? (0, _reactPixi.h)('c', { key: 'c2' }) : (0, _reactPixi.h)('c', { key: 'c3' }),
        c4 ? (0, _reactPixi.h)('c', { key: 'c4' }) : ''
      );
    }
  }]);

  return T;
}(_reactPixi.PactComponent);

describe('基础组件', function () {

  var initChildrenLen = 3;

  describe('初始化', function () {
    var tVNode = (0, _reactPixi.h)(T);
    var topContainer = new PIXI.Container();
    var tInstance = (0, _reactPixi.renderTo)(tVNode, topContainer);

    it('vNode', function () {
      // body...
      (0, _assert.equal)(tInstance.vNode.type, _reactPixi.Container, '顶层vNode的type类型');
      (0, _assert.equal)(tInstance.vNode.children.length, initChildrenLen, 'vNode的儿子们的长度');
      (0, _assert.equal)(tInstance.vNode.children[0].type, _reactPixi.Container, '第一个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[0].key, 'c1', '第一个儿子key');
      (0, _assert.equal)(tInstance.vNode.children[1].type, _reactPixi.Container, '第二个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[1].key, 'c2', '第二个儿子key');
    });
    it('子节点', function () {
      // body...
      (0, _assert.equal)(tInstance.children.length, 0, '子节点们的长度');
      (0, _assert.equal)(tInstance.rootInstance.children.length, initChildrenLen, '子节点们的长度');
      (0, _assert.ifError)(tInstance.rootInstance.children[0].vNode, '1. pixi对象不存在vnode');
      (0, _assert.ok)(tInstance.rootInstance.children[0].pixiEl, '1. pixi对象有pixiEl');
      (0, _assert.ifError)(tInstance.rootInstance.children[1].vNode, '2. pixi对象不存在vnode');
      (0, _assert.ok)(tInstance.rootInstance.children[1].pixiEl, '2. pixi对象有pixiEl');
    });
  });

  describe('组件更新-添加', function () {
    var tVNode = (0, _reactPixi.h)(T);

    var topContainer2 = new PIXI.Container();
    var tInstance2 = (0, _reactPixi.renderTo)(tVNode, topContainer2);

    // body...
    var oldCh = tInstance2.rootInstance.children.slice();

    tInstance2.setState({
      a: true
    });

    // console.log('===============================组件更新-添加=====================================')

    it('添加的vNode', function () {
      // body...
      (0, _assert.equal)(tInstance2.vNode.type, _reactPixi.Container, '顶层vNode的type类型');
      (0, _assert.equal)(tInstance2.vNode.children.length, initChildrenLen + 1, 'vNode的儿子们的长度');
      (0, _assert.equal)(tInstance2.vNode.children[0].type, _reactPixi.Container, '第一个儿子类型');
      (0, _assert.equal)(tInstance2.vNode.children[0].key, 'a', '第一个儿子key');
      (0, _assert.equal)(tInstance2.vNode.children[1].type, _reactPixi.Container, '第二个儿子类型');
      (0, _assert.equal)(tInstance2.vNode.children[1].key, 'c1', '第二个儿子key');
      (0, _assert.equal)(tInstance2.vNode.children[2].type, _reactPixi.Container, '第三个儿子类型');
      (0, _assert.equal)(tInstance2.vNode.children[2].key, 'c2', '第三个儿子key');
    });
    it('添加的instance', function () {
      var newCh = tInstance2.rootInstance.children.slice();
      // body...
      (0, _assert.equal)(tInstance2.rootInstance.children.length, initChildrenLen + 1, '子节点长度');
      (0, _assert.equal)(oldCh[0], newCh[1], '第一个节点不变');
      (0, _assert.equal)(oldCh[1], newCh[2], '第二个节点不变');
    });
  });

  describe('组建更新-替换', function () {
    var tVNode = (0, _reactPixi.h)(T);

    var topContainer3 = new PIXI.Container();
    var tInstance = (0, _reactPixi.renderTo)(tVNode, topContainer3);

    var oldCh = tInstance.rootInstance.children.slice();
    tInstance.setState({
      a: true,
      c2: false
    });
    console.log('==============================组建更新-替换======================================');

    // body...
    it('替换的VNode', function () {
      (0, _assert.equal)(tInstance.vNode.type, _reactPixi.Container, '顶层vNode的type类型');
      (0, _assert.equal)(tInstance.vNode.children.length, initChildrenLen + 1, 'vNode的儿子们的长度');
      (0, _assert.equal)(tInstance.vNode.children[0].type, _reactPixi.Container, '第一个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[0].key, 'a', '第一个儿子key');
      (0, _assert.equal)(tInstance.vNode.children[1].type, _reactPixi.Container, '第二个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[1].key, 'c1', '第二个儿子key');
      (0, _assert.equal)(tInstance.vNode.children[2].type, _reactPixi.Container, '第三个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[2].key, 'c3', '第三个儿子key');
    });
    it('替换的instance', function () {
      var newCh = tInstance.rootInstance.children.slice();
      (0, _assert.equal)(newCh.length, initChildrenLen + 1, '子实例们的长度');
      (0, _assert.equal)(oldCh[0], newCh[1], 'key=c1的节点没变');
    });
  });
  describe('组建更新-删除', function () {
    var tVNode = (0, _reactPixi.h)(T);

    var topContainer3 = new PIXI.Container();
    var tInstance = (0, _reactPixi.renderTo)(tVNode, topContainer3);

    var oldCh = tInstance.rootInstance.children.slice();
    tInstance.setState({
      a: true,
      c2: false,
      c4: false
    });
    console.log('==============================组建更新-删除======================================');

    it('删除的VNode', function () {
      // body...
      (0, _assert.equal)(tInstance.vNode.type, _reactPixi.Container, '顶层vNode的type类型');
      (0, _assert.equal)(tInstance.vNode.children.length, 3, 'vNode的儿子们长度');
      (0, _assert.equal)(tInstance.vNode.children[0].type, _reactPixi.Container, '第一个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[0].key, 'a', '第一个儿子key');
      (0, _assert.equal)(tInstance.vNode.children[1].type, _reactPixi.Container, '第二个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[1].key, 'c1', '第二个儿子key');
      (0, _assert.equal)(tInstance.vNode.children[2].type, _reactPixi.Container, '第三个儿子类型');
      (0, _assert.equal)(tInstance.vNode.children[2].key, 'c3', '第三个儿子key');
    });
    it('删除的instance', function () {
      var newCh = tInstance.rootInstance.children;
      (0, _assert.equal)(newCh.length, 3, '实例的长度');
      (0, _assert.equal)(oldCh[0], newCh[1]);
    });
  });
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 11 */
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
/* 12 */
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
/* 13 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 14 */
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

exports.isBuffer = __webpack_require__(13);

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
exports.inherits = __webpack_require__(12);

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5), __webpack_require__(11)))

/***/ })
/******/ ]);