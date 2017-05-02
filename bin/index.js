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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by zyg on 16/7/15.
 */
module.exports = __webpack_require__(3)

/***/ }),

/***/ 1:
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
    this.isTop = false; //是否为顶级
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

var primitiveMap = {
  c: Container,
  container: Container
};

function isReservedType(name) {
  return !!primitiveMap[name] || Object.keys(primitiveMap).some(function (k) {
    return primitiveMap[k] === name;
  });
}
function syncProps(oldVNode, newVNode) {
  oldVNode.props = Object.assign({}, newVNode.props);
}

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
    // 完全等价的节点，不同替换。但props可能变化
    // 非顶级
    if (!oldVNode.isTop) {
      if (oldVNode.instance.vNode) {
        log(3, 'patch inst', oldVNode.key, oldVNode.type, oldVNode.instance.props, newVNode.key, newVNode.props);
        if (!utils.compareObject(oldVNode.props, newVNode.props)) {
          oldVNode.props = Object.assign({}, oldVNode.props, newVNode.props);
          oldVNode.instance.props = Object.assign({}, oldVNode.props);
          updateComponent(oldVNode.instance);
        }
      } else {
        // log(3,'patch3 inst',oldVNode.key, oldVNode.instance.props);
      }
    }

    // 继续检查子节点
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
    } else {
      //...
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
    // 这里的childNode木有instance
    childNode.instance = childInstance;

    if (!childInstance.vNode) {
      instance.pixiEl.addChild(childInstance.pixiEl);
    }
  });

  return instance;
}

/**

node -> inst -> node2 -> inst2
||
node -> inst <-> node2
node -> inst -> rootInst === inst2

**/
function renderTo(node, pixiContainer) {
  var instance = new node.type(node.props, node.slots);
  var instanceVNode = instance.render();

  instanceVNode.isTop = true;
  instance.isTop = true;
  instance.pixiEl = pixiContainer;
  instance.vNode = instanceVNode;
  instanceVNode.instance = instance;

  var rootInstance = mountComponent(instanceVNode, instance);

  instance.rootInstance = rootInstance;

  return instance;
}

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
  if (isReservedType(componentClass)) {
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
    slots: slots,
    isTop: false
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

/***/ 16:
/***/ (function(module, exports) {



/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isDef = isDef;
exports.isUndef = isUndef;
exports.isVNode = isVNode;
exports.isPixiObj = isPixiObj;
exports.isEqualObj = isEqualObj;
exports.equalVNode = equalVNode;
exports.compareObject = compareObject;
exports.log = log;

var _primitive = __webpack_require__(16);

var _primitive2 = _interopRequireDefault(_primitive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isDef(v) {
  return !!v || v === 0;
}
function isUndef(v) {
  return v === undefined;
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
  if (parseInt(arguments[0]) === 3) {
    console.log.apply(console, arguments);
  }
}

/***/ }),

/***/ 3:
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


/***/ })

/******/ });