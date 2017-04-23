'use strict';
//import PIXI from 'pixi.js'
import * as utils from './utils.js';

const {isUndef, isDef} = utils;

function updateChildren(instanceParentVnode, newParentVnode) {
  const oldCh = instanceParentVnode.children;
  const newCh = newParentVnode.children;

  const oldLen = oldCh.length;
  const newLen = newCh.length;

  var oldStartIndex = 0;
  var oldEndIndex = 0;
  var oldStartVnode = oldCh[0];
  var oldEndVnode = oldCh[oldLen - 1];

  var newStartIndex = 0;
  var newEndIndex = newLen -1;
  var newStartVnode = newCh[0];
  var newEndVnode = newCh[newLen-1];

  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    //...diff
  }
}

function patchVnode(oldVNode, newVNode) {
  let isEquivalentNode = utils.equalVNode(oldVNode, newVNode);

  if(isEquivalentNode){
    let isEquivalentNodeWithChildren = utils.equalVNode(oldVNode, newVNode, true);

    if(isEquivalentNodeWithChildren){
      // 完全等价的节点，不同替换。继续检查子节点
      oldVNode.children.forEach((oldChildVNode, i) => {
        patchVnode(oldChildVNode, newVNode.children[i]);
      });
    } else {
      updateChildren(oldVNode, newVNode);
    }
  }
}

function updateComponent(instance) {
  const newVNode = instance.render();

  if(utils.isPixiObj(newVNode)){

  } else if(utils.isVNode(newVNode)){
    patchVnode(instance.vNode, newVNode)
  }
}

export function mountComponent(node, parentComponent) {
  const instance = new node.type(node.props);
  const vNode = instance.render();


  if(utils.isPixiObj(vNode)){
    instance.pixiEl = vNode;

    parentComponent.children.push(instance);

    parentComponent.pixiEl.addChild(vNode);
  } else if(utils.isVNode(vNode)){
    instance.vNode = vNode;
    instance.pixiEl = parentComponent.pixiEl;
    instance.children = parentComponent.children;
    mountComponent(vNode, instance);
  }

  node.children.map(childNode => {

    mountComponent(childNode, instance);
  });

  return instance;
}

export function renderTo(node, pixiContainer) {

  const instance = new node.type(node.props);
  const instanceVNode = instance.render();
  instance.pixiEl = pixiContainer;
  instance.vNode = instanceVNode;

  mountComponent(instanceVNode, instance);

  return instance;
}


export class PactComponent {
  constructor (props) {
    this.state = {};
    this.props = {};

    Object.assign(this.props, props);

    this.isMounted = false;

    this.vNode; //render产生的虚拟node
    this.pixiEl; //pixi对象
    this.children = []; //子PactComponent对象

  }
  setState (obj) {
    this.state = Object.assign({}, this.state, obj);
    //@TODO 同步更新组件
    updateComponent(this);
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

var j = 0;
class Container extends PactComponent {
  constructor (props) {
    super(props);
  }

  render () {
    return {
      name:j++,
      props: this.props,
      children:[],
      addChild(c){
        this.children.push(c)
      },
    }
  }
}


export function h(componentClass, props, ...children) {
  // @TODO
  if(utils.isReservedType(componentClass)){
    componentClass = Container;
  } else if(1){

  } else {
    console.log(componentClass);
    throw new Error('the compoennt muse be a PactComponent');
  }

  const key = props.key;
  delete props.key;

  const node = {
    type: componentClass,
    key,
    props,
    children,
  };

  return node;
}
