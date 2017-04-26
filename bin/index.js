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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(PIXI) {
//import PIXI from 'pixi.js'

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(1);

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isUndef = utils.isUndef,
    isDef = utils.isDef;


function replaceVNode() {
  //...@TODO
  console.log('replaceVNode:');
}
function addVNode(parentVNode, newVNode, targetIndex) {
  var newInstance = mountComponent(newVNode, parentVNode.instance);

  parentVNode.instance.rootInstance.children.splice(targetIndex, 0, newInstance);
  parentVNode.children.splice(targetIndex, 0, newVNode);

  console.log(targetIndex, parentVNode.instance);
  console.log('=== addVNode ===');

  if (!newInstance.vNode) {
    parentVNode.instance.pixiEl.addChildAt(newInstance.pixiEl, targetIndex);
  }
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

  while (newStartIndex <= newEndIndex) {
    //...diff
    //
    var newVNode = newCh[newStartIndex];
    var newIndex = 0;
    while (newIndex < oldLen - 1) {
      var oldVNode = oldCh[newIndex];
      if (utils.equalVNode(oldVNode, newVNode)) {
        console.log('equalVNode', oldVNode);
        console.log('equalVNode', newVNode);
        patchVnode(oldVNode, newVNode);
        break;
      } else {
        var findOldVNode = false;
        var _j = newStartIndex + 1;
        while (_j < newEndIndex) {
          var newVNode2 = newCh[_j];
          if (utils.equalVNode(oldVNode, newVNode2)) {
            addVNode(instanceParentVnode, newVNode, newIndex);
            findOldVNode = true;
            newIndex++;
          }
          _j++;
        }
        if (!findOldVNode) {
          replaceVNode(instanceParentVnode);
          newIndex++;
        }
      }
    }
    newStartIndex++;
  }
  console.log('=== updateChildren ===');
}

function patchVnode(oldVNode, newVNode) {
  var isEquivalentNodeWithChildren = utils.equalVNode(oldVNode, newVNode, true);

  console.log('isEquivalentNodeWithChildren:', oldVNode.key, isEquivalentNodeWithChildren);
  console.log(oldVNode);
  console.log(newVNode);
  console.log('== patchVnode ==');

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
  var instance = new node.type(node.props);
  var vNode = instance.render();
  vNode.instance = instance;

  if (utils.isPixiObj(vNode)) {
    instance.pixiEl = vNode;
  } else if (utils.isVNode(vNode)) {
    instance.vNode = vNode;
    instance.pixiEl = parentComponent.pixiEl;

    var rootInstance = mountComponent(vNode, instance);

    if (!rootInstance.vNode) {
      instance.pixiEl.addChild(rootInstance.pixiEl);
      instance.rootInstance = rootInstance;
    }
  }

  node.children.map(function (childNode) {

    var childInstance = mountComponent(childNode, instance);
    if (!childInstance.vNode) {
      instance.pixiEl.addChild(childInstance.pixiEl);
      instance.children.push(childInstance);
    }
  });

  return instance;
}

function renderTo(node, pixiContainer) {

  var instance = new node.type(node.props);
  var instanceVNode = instance.render();

  instance.pixiEl = pixiContainer;
  instance.vNode = instanceVNode;
  instanceVNode.instance = instance;

  var rootInstance = mountComponent(instanceVNode, instance);

  instance.rootInstance = rootInstance;

  return instance;
}

var PactComponent = function () {
  function PactComponent(props) {
    _classCallCheck(this, PactComponent);

    this.state = {};
    this.props = {};

    Object.assign(this.props, props);

    this.isMounted = false;
    this.vNode; //render产生的虚拟node
    this.pixiEl; //pixi对象
    this.rootInstance; //根实例对象
    this.children = []; //子PactComponent对象
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
    return !!child;
  });

  // @TODO
  if (utils.isReservedType(componentClass)) {
    componentClass = Container;
  } else if (typeof componentClass === 'function') {
    //暂时忽略 props.children
    children = [];
  } else {
    console.log(componentClass);
    throw new Error('the compoennt muse be a PactComponent');
  }

  var key = props.key;
  delete props.key;

  var node = {
    type: componentClass,
    key: key,
    instance: null,
    props: props,
    children: children
  };

  return node;
}

module.exports.Container = Container;
module.exports.renderTo = renderTo;
module.exports.PactComponent = PactComponent;
module.exports.h = h;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 1 */
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by zyg on 16/7/15.
 */
module.exports = __webpack_require__(3)

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
}


module.exports = {
  Container,
}


/***/ })
/******/ ]);