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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//import PIXI from 'pixi.js'

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PactComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.h = h;
exports.renderTo = renderTo;

var _utils = __webpack_require__(1);

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PactComponent = exports.PactComponent = function () {
  function PactComponent(props, children) {
    _classCallCheck(this, PactComponent);

    this.state = {};
    this.props = {};

    Object.assign(this.props, props);

    this.isMounted = false;

    this.el;
    this.pixiEl;
    this.children = children;
  }

  _createClass(PactComponent, [{
    key: 'setState',
    value: function setState(obj) {
      this.state = Object.assign({}, this.state, obj);
      this.update();
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

var Container = function (_PactComponent) {
  _inherits(Container, _PactComponent);

  function Container(props) {
    _classCallCheck(this, Container);

    return _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));
  }

  _createClass(Container, [{
    key: 'render',
    value: function render() {
      return {
        addChild: function addChild() {}
      };
    }
  }]);

  return Container;
}(PactComponent);

function h(componentClass, props) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  // @TODO
  if (utils.isReservedType(componentClass)) {
    componentClass = Container;
  } else if (1) {} else {
    console.log(componentClass);
    throw new Error('the compoennt muse be a PactComponent');
  }

  var node = {
    type: componentClass,
    props: props,
    children: children
  };

  return node;
}

function renderTo(node, pixiContainer) {
  var instance = new node.type(node.props, node.children);

  console.log(instance);

  pixiContainer.addChild(instance.pixiEl);
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isReservedType = isReservedType;
exports.compareObject = compareObject;
function isReservedType(name) {
  return name === 'c' || name === 'container';
}

function compareObject(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }

  var keys1 = Object.keys(obj1);
  var keys2 = Object.keys(obj2);

  if (keys1.join('') === keys2.join('')) {
    return keys1.every(function (k) {
      return obj1[k] === obj2[k];
    });
  }
  return false;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pact = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var T = function (_PactComponent) {
  _inherits(T, _PactComponent);

  function T() {
    _classCallCheck(this, T);

    return _possibleConstructorReturn(this, (T.__proto__ || Object.getPrototypeOf(T)).apply(this, arguments));
  }

  _createClass(T, [{
    key: 'click',
    value: function click() {
      return 1;
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _pact.h)(
        'c',
        null,
        (0, _pact.h)('c', { onClick: this.click }),
        (0, _pact.h)('c', null)
      );
    }
  }]);

  return T;
}(_pact.PactComponent);

var ele = (0, _pact.h)(T);

(0, _pact.renderTo)(ele, {
  addChild: function addChild() {}
});

/***/ })
/******/ ]);