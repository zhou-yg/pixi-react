'use strict';
//import PIXI from 'pixi.js'
import pixiLib from 'pixi-lib';
import * as utils from './utils.js';
import _ from 'lodash'

const {isUndef, isDef,log} = utils;

var PactComponentI = 0;
class PactComponent {
  constructor (props, slots) {
    this.state = {};
    this.props = {};

    Object.assign(this.props, props);

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

    this.state = Object.assign({},_.merge(this.state, obj));
    // this.state = Object.assign({},this.state, obj);

    //@TODO 同步更新组件
    updateComponent(this);
  }

  setProps (newProps) {

    this.props = Object.assign({},_.merge(this.props, newProps));
    // this.props = Object.assign({},this.props, newProps);

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
function syncProps(oldVNode, newVNode) {
  oldVNode.props = Object.assign({}, oldVNode.props, newVNode.props);
  oldVNode.instance.setProps(Object.assign({}, oldVNode.props));
}

function replaceVNode(parentVNode, newVNode, replaceIndex) {
  //...@TODO
  // log('replaceVNode:', replaceIndex, newVNode.key);

  const newInstance = mountComponent(newVNode, parentVNode.instance);

  parentVNode.instance.children[replaceIndex] = newInstance;
  parentVNode.children[replaceIndex] = newVNode;

  if(!newInstance.vNode){
    parentVNode.instance.pixiEl.removeChildAt(replaceIndex);
    parentVNode.instance.pixiEl.addChildAt(newInstance.pixiEl, replaceIndex);
  }
}
function addVNode(parentVNode, newVNode, targetIndex) {
  log('addVNode:', targetIndex, newVNode.key);
  const newInstance = mountComponent(newVNode, parentVNode.instance);

  parentVNode.instance.children.splice(targetIndex, 0 , newInstance);
  parentVNode.children.splice(targetIndex,0 , newVNode);

  // log(targetIndex,parentVNode.instance);
  // log('=== addVNode ===');

  if(!newInstance.vNode){
    parentVNode.instance.pixiEl.addChildAt(newInstance.pixiEl, targetIndex);
  }
}

function removeVNode(parentVNode, oldVNode, removeFromIndex) {
  log('removeVNode:', removeFromIndex, oldVNode.key);
  parentVNode.instance.children.splice(removeFromIndex, 1);
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

    log('newVNode:',newVNode.key, newStartIndex, oldChIndex);

    //oldCh [old1, old2, old3....]
    while(oldChIndex <= oldLen - 1){
      let oldVNode = oldCh[oldChIndex];
      if(utils.equalVNode(oldVNode, newVNode)){
        oldStartIndex = oldChIndex+1;

        log('finalMatchOldNode:',oldVNode.key, oldChIndex);
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
          log(newStartIndex, newVNode.key);
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


  // log('=== updateChildren ===')
}

function patchVnode(oldVNode, newVNode) {

  let isEquivalentNodeWithChildren = utils.equalVNode(oldVNode, newVNode, true);

  // log(`isEquivalentNodeWithChildren:`,oldVNode.key,isEquivalentNodeWithChildren);
  // log(oldVNode);
  // log(newVNode);
  // log('== patchVnode ==');


  if(isEquivalentNodeWithChildren){
    // 完全等价的节点，不同替换。但props可能变化
    // 非顶级
    log(3,'patch inst',oldVNode.key,oldVNode.type, oldVNode.instance.props, newVNode.key,newVNode.props);
    if(!utils.compareObject(oldVNode.props, newVNode.props)){
      syncProps(oldVNode, newVNode);
      updateComponent(oldVNode.instance);
    }


    // 继续检查子节点
    oldVNode.children.slice().forEach((oldChildVNode, i) => {
      patchVnode(oldChildVNode, newVNode.children[i]);
    });
  } else {
    updateChildren(oldVNode, newVNode);
  }
}

function updateComponent(instance) {
  const newVNode = instance.render();
  // log(`updateComponent:`, newVNode);
  if(utils.isPixiObj(newVNode)){
  } else if(utils.isVNode(newVNode)){
    var isEquivalentNode = utils.equalVNode(instance.vNode, newVNode);
    if (isEquivalentNode){
      patchVnode(instance.vNode, newVNode)
    } else {
      //...
    }
  }

  instance.children.forEach(childInstance => {
    updateComponent(childInstance);
  });
}

function mountComponent(node, parentComponent) {
  const instance = new node.type(node.props, node.slots);
  const vNode = instance.render();

  node.instance = instance;

  if(utils.isPixiObj(vNode)){
    instance.pixiEl = vNode;
    instance.isMounted = true;
    parentComponent.pixiEl.addChild(vNode);

  } else if(utils.isVNode(vNode)){
    instance.vNode = vNode;
    instance.pixiEl = parentComponent.pixiEl;
    instance.isMounted = true;

    const rootInstance = mountComponent(vNode, instance);

    // if(!vNode){
    //   instance.pixiEl.addChild(pixiEl);
    // }

  }else{
    throw new Error('mountComponent 卧槽');
  }

  node.children.map(childNode => {
    log(`childMountComponent:`,childNode.key, instance);
    const childInstance = mountComponent(childNode, instance);
    instance.children.push(childInstance);
    // 这里的childNode木有instance
    childNode.instance = childInstance;

    if(childInstance.pixiEl){
      instance.pixiEl.addChild(childInstance.pixiEl);
    }
    // if(!childInstance.vNode){
    //   instance.pixiEl.addChild(childInstance.pixiEl);
    // }
  });

  return instance;
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
