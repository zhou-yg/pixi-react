'use strict';
//import PIXI from 'pixi.js'
import * as utils from './utils.js';

const {isUndef, isDef} = utils;

function replaceVNode(parentVNode, newVNode, replaceIndex) {
  //...@TODO
  // console.log('replaceVNode:', replaceIndex, newVNode.key);

  const newInstance = mountComponent(newVNode, parentVNode.instance);

  parentVNode.instance.rootInstance.children[replaceIndex] = newInstance;
  parentVNode.children[replaceIndex] = newVNode;

  if(!newInstance.vNode){
    parentVNode.instance.pixiEl.removeChildAt(replaceIndex);
    parentVNode.instance.pixiEl.addChildAt(newInstance.pixiEl, replaceIndex);
  }
}
function addVNode(parentVNode, newVNode, targetIndex) {
  console.log('addVNode:', targetIndex, newVNode.key);
  const newInstance = mountComponent(newVNode, parentVNode.instance);

  parentVNode.instance.rootInstance.children.splice(targetIndex, 0 , newInstance);
  parentVNode.children.splice(targetIndex,0 , newVNode);

  // console.log(targetIndex,parentVNode.instance);
  // console.log('=== addVNode ===');

  if(!newInstance.vNode){
    parentVNode.instance.pixiEl.addChildAt(newInstance.pixiEl, targetIndex);
  }
}

function removeVNode(parentVNode, oldVNode, removeFromIndex) {
  console.log('removeVNode:', removeFromIndex, oldVNode.key);
  parentVNode.instance.rootInstance.children.splice(removeFromIndex, 1);
  parentVNode.children.splice(removeFromIndex, 1);
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

  var patchedIndexArr = [];
  var addedNum = 0;
  //newCh [new1, new2, new3...]
  while (newStartIndex <= newEndIndex) {
    if(patchedIndexArr.indexOf(newStartIndex) !== -1){
      newStartIndex++;
      continue;
    }
    //...diff
    let newVNode = newCh[newStartIndex];
    let oldChIndex = oldStartIndex;

    let finalMatchOldNode = false;

    console.log('newVNode:',newVNode.key, newStartIndex, oldChIndex);

    //oldCh [old1, old2, old3....]
    while(oldChIndex <= oldLen - 1){
      let oldVNode = oldCh[oldChIndex];
      if(utils.equalVNode(oldVNode, newVNode)){
        oldStartIndex = oldChIndex+1;
        console.log('finalMatchOldNode:',oldVNode.key, oldChIndex);
        patchVnode(oldVNode, newVNode);
        finalMatchOldNode = true;
        break;
      }else{
        let findOldVNode = false;
        let otherNewIndex = newStartIndex + 1;
        let newVNode2 = null;

        //newCh [new2, new3...]
        while (otherNewIndex <= newEndIndex) {
          newVNode2 = newCh[otherNewIndex];
          if(utils.equalVNode(oldVNode, newVNode2)){
            patchedIndexArr.push(otherNewIndex);
            findOldVNode = true;
            break;
          }
          otherNewIndex++;
        }

        if(findOldVNode){
          oldStartIndex = oldChIndex + 1;
          patchVnode(oldVNode, newVNode2);
          break;
        }else{
          console.log(newStartIndex, newVNode.key);
          removeVNode(instanceParentVnode, oldVNode, oldChIndex + addedNum);
          addedNum--;
          oldChIndex++;
          oldStartIndex++;
        }
      }
    }

    if(!finalMatchOldNode){
      addVNode(instanceParentVnode, newVNode, oldChIndex);
      addedNum++;
    }
    newStartIndex++;
  }


  // console.log('=== updateChildren ===')
}

function patchVnode(oldVNode, newVNode) {
    let isEquivalentNodeWithChildren = utils.equalVNode(oldVNode, newVNode, true);

    // console.log(`isEquivalentNodeWithChildren:`,oldVNode.key,isEquivalentNodeWithChildren);
    // console.log(oldVNode);
    // console.log(newVNode);
    // console.log('== patchVnode ==');

    if(isEquivalentNodeWithChildren){
      // 完全等价的节点，不同替换。继续检查子节点
      oldVNode.children.slice().forEach((oldChildVNode, i) => {
        patchVnode(oldChildVNode, newVNode.children[i]);
      });
    } else {
      updateChildren(oldVNode, newVNode);
    }
}

function updateComponent(instance) {
  const newVNode = instance.render();
  console.log(`updateComponent:`, newVNode);
  if(utils.isPixiObj(newVNode)){

  } else if(utils.isVNode(newVNode)){
    var isEquivalentNode = utils.equalVNode(instance.vNode, newVNode);
    if (isEquivalentNode){
      patchVnode(instance.vNode, newVNode)
    }
  }

  instance.children.forEach(childInstance => {
    updateComponent(childInstance);
  });
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

    const rootInstance = mountComponent(vNode, instance);

    if(!rootInstance.vNode){
      instance.pixiEl.addChild(rootInstance.pixiEl);
      instance.rootInstance = rootInstance;
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
  instanceVNode.instance = instance;

  const rootInstance = mountComponent(instanceVNode, instance);

  instance.rootInstance = rootInstance;

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
    this.rootInstance; //根实例对象
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
    return new PIXI.Container(this.props);
  }
}


function h(componentClass, props, ...children) {
  if(!props){
    props = {};
  }
  children = children.filter(child => {
    return !!child && typeof child === 'object';
  });

  // @TODO
  if(utils.isReservedType(componentClass)){
    componentClass = Container;
  } else if(typeof componentClass === 'function'){
    //暂时忽略 props.children
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
  };

  // console.log(`node:`, node);
  return node;
}

module.exports.Container = Container;
module.exports.renderTo = renderTo;
module.exports.PactComponent = PactComponent;
module.exports.h = h;
