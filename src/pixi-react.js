'use strict';
//import PIXI from 'pixi.js'
import pixiLib from 'pixi-lib';
import * as utils from './utils.js';
import _ from 'lodash'
import {updateComponentSync} from './updator';
import {mountComponent} from './mount';

const {isUndef, isDef,log} = utils;

var PactComponentI = 0;
class PactComponent {
  constructor (props, slots) {
    this.state = {};
    this.props = {};

    this.props = _.cloneDeep(props);

    this.displayName = 'PactComponent.' + (PactComponentI++);
    this.isMounted = false;
    this.vNode = null; //render产生的虚拟node
    this.pixiEl; //pixi对象
    this.rootInstance; //根实例对象
    this.children = []; //子PactComponent对象
    this.slots = slots || []; //插槽
    this.isTop = false; //是否为顶级
  }
  setState (obj) {

    this.state = _.merge(_.cloneDeep(this.state), obj);

    //@TODO 同步更新组件
    updateComponentSync(this);
  }

  setProps (newProps) {

    this.props = _.merge(_.cloneDeep(this.props),newProps);

    if(this.pixiEl){
      pixiLib.setConfig(this.pixiEl, newProps.member);
    }
  }

  update () {
    // @TODO
  }

  addChild (pactObj, i) {
  }
  removeChild (pactObj) {
  }
  didMount () {

  }
  unmount () {

  }

  render () {

  }
}

class PixiComponent extends PactComponent{
  constructor(props) {
    super(props)

    this.texture = props.texture;
  }
}

var j = 0;
class Container extends PixiComponent {
  constructor (props) {
    super(props);
  }
  render () {
    const c = new PIXI.Container(this.texture);
    pixiLib.setConfig(c,this.props.member);
    return c;
  }
}
class Sprite extends PixiComponent {
  constructor(props) {
    super(props);
  }
  render () {
    const sp = new PIXI.Sprite(this.texture);
    pixiLib.setConfig(sp,this.props.member);
    return sp;
  }
}

const primitiveMap = {
  c: Container,
  container:Container,
  sprite: Sprite,
}

function isReservedType(name) {
  return !!primitiveMap[name] || Object.keys(primitiveMap).some(k => {
    return primitiveMap[k] === name;
  })
}

/**

node -> inst -> node2 -> inst2

**/
function renderTo(node, pixiContainer) {
  const instance = new node.type(node.props, node.slots);
  const instanceVNode = instance.render();

  node.instance = instance;

  node.isTop = true;
  instance.isTop = true;

  instance.pixiEl = pixiContainer;
  instance.vNode = instanceVNode;

  const rootInstance = mountComponent(instanceVNode, instance);

  return instance;
}


function h(componentClass, props, ...children) {
  if(!props){
    props = {};
  }
  children = children.filter(child => {
    return !!child && typeof child === 'object';
  }).reduce((prev, next) => {
    // 带slots情况下,children是个二维数组
    return prev.concat(next);
  },[]);

  var slots = [];

  // @TODO
  if(isReservedType(componentClass)){
    componentClass = primitiveMap[componentClass];
  } else if(typeof componentClass === 'function'){
    //暂时忽略 props.children
    slots = children.slice();
    children = [];
  } else {
    console.error(componentClass);
    throw new Error('the compoennt muse be a PactComponent');
  }

  const key = props.key;
  delete props.key;

  const node = {
    type: componentClass,
    key,
    instance: null,
    props,
    children,
    slots,
    isTop: false,
  };

  // log(`node:`, node);
  return node;
}

module.exports.Container = Container;
module.exports.renderTo = renderTo;
module.exports.PactComponent = PactComponent;
module.exports.h = h;
