'use strict';
//import PIXI from 'pixi.js'
import * as utils from './utils.js';

const {isUndef, isDef} = utils;

function replaceVNode() {
  //...@TODO
}
function addVNode(parentVNode, newVNode, targetIndex) {
  const newInstance = mountComponent(newVNode, parentVNode.instance);
  parentVNode.instance.children.splice(targetIndex, 0 , newInstance);

  if(!newInstance.vNode){
    parentVNode.pixiEl.addChildAt(newInstance.pixiEl, targetIndex);
  }
}

function updateChildren(instanceParentVnode, newParentVnode) {
  const oldCh = instanceParentVnode.children.slice();
  const newCh = newParentVnode.children.slice();

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

  while (newStartIndex <= newEndIndex) {
    //...diff
    //
    let newVNode = newCh[newStartIndex];
    let newIndex = 0;
    while(newIndex < oldLen - 1){
      let oldVNode = oldCh[newIndex];
      if(utils.equalVNode(oldVNode, newVNode)){
        patchVnode(oldVNode, newVNode);
        break;
      }else{
        let findOldVNode = false;
        let j = newStartIndex + 1;
        while (j < newEndIndex) {
          let newVNode2 = newCh[j];
          if(utils.equalVNode(oldVNode, newVNode2)){
            addVNode(instanceParentVnode, newVNode, newIndex);
            findOldVNode = true;
            newIndex++;
          }
          j++;
        }
        if(!findOldVNode){
          replaceVNode(instanceParentVnode,)
          newIndex++;
        }
      }
    }
  }
}

function patchVnode(oldVNode, newVNode) {
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

function updateComponent(instance) {
  const newVNode = instance.render();

  if(utils.isPixiObj(newVNode)){

  } else if(utils.isVNode(newVNode)){
    var isEquivalentNode = utils.equalVNode(instance.vNode, newVNode);
    if (isEquivalentNode){
      patchVnode(instance.vNode, newVNode)
    }
  }
}

function mountComponent(node, parentComponent) {
  const instance = new node.type(node.props);
  const vNode = instance.render();
  vNode.instance = instance;

  if(utils.isPixiObj(vNode)){
    instance.pixiEl = vNode;

  } else if(utils.isVNode(vNode)){
    instance.vNode = vNode;
    instance.pixiEl = parentComponent.pixiEl;

    const childInstance = mountComponent(vNode, instance);

    if(!childInstance.vNode){
      instance.pixiEl.addChild(childInstance.pixiEl);
      instance.children.push(childInstance);
    }
  }

  node.children.map(childNode => {

    const childInstance = mountComponent(childNode, instance);
    if(!childInstance.vNode){
      instance.pixiEl.addChild(childInstance.pixiEl);
      instance.children.push(childInstance);
    }
  });

  return instance;
}

function renderTo(node, pixiContainer) {

  const instance = new node.type(node.props);
  const instanceVNode = instance.render();
  instance.pixiEl = pixiContainer;
  instance.vNode = instanceVNode;

  const childInstance = mountComponent(instanceVNode, instance);

  instance.children.push(childInstance);

  return instance;
}


class PactComponent {
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


function h(componentClass, props, ...children) {
  if(!props){
    props = {};
  }
  children = children.filter(child => !!child);

  // @TODO
  if(utils.isReservedType(componentClass)){
    componentClass = Container;
  } else if(typeof componentClass === 'function'){
    //暂时忽略 props.children
    children = [];
  } else {
    console.log(componentClass);
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
  };

  return node;
}
module.exports.Container = Container;
module.exports.renderTo = renderTo;
module.exports.PactComponent = PactComponent;
module.exports.h = h;
