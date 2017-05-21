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
    updateComponent(this);
  }

  setProps (newProps) {

    this.props = _.merge(_.cloneDeep(this.props),newProps);

    if(this.pixiEl){
      pixiLib.setConfig(this.pixiEl, newProps.member);

      if(newProps.member){
        if(newProps.member.play === false){
          this.pixiEl.stop();
        }else{
          this.pixiEl.play();
        }
      }
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

// 支持的事件
const eventsArr = ['onMouseDown', 'onTouch'];

class PixiComponent extends PactComponent{
  constructor(props) {
    super(props)

    this.eventFnMap = new Map();

    this.texture = props.texture;
  }
  setMember (pixiObj) {
    pixiLib.setConfig(pixiObj,this.props.member);

    eventsArr.forEach(eventName => {
      const fn = this.props[eventName];

      if(fn){
        pixiObj.interactive = true;

        eventName = eventName.replace(/^on/, '').toLowerCase();

        const oldFn = this.eventFnMap.get(pixiObj);

        if(oldFn){
          if(oldFn !== fn){
            pixiObj.off(eventName, oldFn);
            pixiObj.on(eventName, fn);
          }
        }else{
          pixiObj.on(eventName, fn);
        }
      }
    })
  }
}

var j = 0;
class Container extends PixiComponent {
  constructor (props) {
    super(props);
  }
  render () {
    const c = new PIXI.Container(this.texture);
    this.setMember(c);
    return c;
  }
}
class Sprite extends PixiComponent {
  constructor(props) {
    super(props);
  }
  render () {
    const sp = new PIXI.Sprite(this.texture);
    this.setMember(sp);
    return sp;
  }
}
class AnimatedSprite extends PixiComponent {
  constructor(props){
    super(props)
  }
  render(){
    const props = this.props;
    const ani = new PIXI.extras.AnimatedSprite(props.textures);

    this.setMember(ani);

    if(props.member){
      if(props.member.play === false){
        ani.stop();
      }else{
        ani.play();
      }
    }

    return ani;
  }
}

const primitiveMap = {
  c: Container,
  container:Container,
  sprite: Sprite,
  'animated-sprite': AnimatedSprite,
  ani: AnimatedSprite,
}

function isReservedType(name) {
  return !!primitiveMap[name] || Object.keys(primitiveMap).some(k => {
    return primitiveMap[k] === name;
  })
}
function syncProps(oldVNode, newVNode) {
  oldVNode.props = _.merge(_.cloneDeep(oldVNode.props), newVNode.props);
  oldVNode.instance.setProps(oldVNode.props);
}

function replaceVNode(parentVNode, newVNode, replaceIndex) {
  log(`replaceVNode`, replaceIndex);
  log(`replaceVNode`, parentVNode.children[replaceIndex], newVNode);
  //...@TODO
  const newInstance = mountComponent(newVNode, parentVNode.instance);

  parentVNode.instance.children[replaceIndex] = newInstance;
  parentVNode.children[replaceIndex] = newVNode;

  if(typeof newInstance !== 'string' && !newInstance.vNode){
    parentVNode.instance.pixiEl.removeChildAt(replaceIndex);
    parentVNode.instance.pixiEl.addChildAt(newInstance.pixiEl, replaceIndex);
  }
}
function addVNode(parentVNode, newVNode, targetIndex) {
  const newInstance = mountComponent(newVNode, parentVNode.instance);

  parentVNode.instance.children.splice(targetIndex, 0 , newInstance);
  parentVNode.children.splice(targetIndex,0 , newVNode);

  if(typeof newInstance !== 'string' && !newInstance.vNode){
    parentVNode.instance.pixiEl.addChildAt(newInstance.pixiEl, targetIndex);
  }
}

function removeVNode(parentVNode, removeFromIndex) {

  parentVNode.instance.children.splice(removeFromIndex, 1);
  parentVNode.children.splice(removeFromIndex, 1);

  if(parentVNode.instance.pixiEl){
    parentVNode.instance.pixiEl.removeChildAt(removeFromIndex);
  }
}

// function updateChildren(instanceParentVnode, newParentVnode) {
//   const oldCh = instanceParentVnode.children.slice();
//   const newCh = newParentVnode.children.slice();
//
//   const oldLen = oldCh.length;
//   const newLen = newCh.length;
//
//   var oldStartIndex = 0;
//   var oldEndIndex = 0;
//   var oldStartVnode = oldCh[0];
//   var oldEndVnode = oldCh[oldLen - 1];
//
//   var newStartIndex = 0;
//   var newEndIndex = newLen -1;
//   var newStartVnode = newCh[0];
//   var newEndVnode = newCh[newLen-1];
//
//   var patchedIndexArr = [];
//   var addedNum = 0;
//   //newCh [new1, new2, new3...]
//   while (newStartIndex <= newEndIndex) {
//     if(patchedIndexArr.indexOf(newStartIndex) !== -1){
//       newStartIndex++;
//       continue;
//     }
//     //...diff
//     let newVNode = newCh[newStartIndex];
//     let oldChIndex = oldStartIndex;
//     let finalMatchOldNode = false;
//
//     //oldCh [old1, old2, old3....]
//     while(oldChIndex <= oldLen - 1){
//       let oldVNode = oldCh[oldChIndex];
//
//       if(utils.equalVNode(oldVNode, newVNode)){
//         oldStartIndex = oldChIndex+1;
//
//         patchVnode(oldVNode, newVNode);
//         finalMatchOldNode = true;
//         break;
//       }else{
//         let findOldVNode = false;
//         let otherNewIndex = newStartIndex + 1;
//         let newVNode2 = null;
//
//         //newCh [new2, new3...]
//         while (otherNewIndex <= newEndIndex) {
//           newVNode2 = newCh[otherNewIndex];
//           if(utils.equalVNode(oldVNode, newVNode2)){
//             patchedIndexArr.push(otherNewIndex);
//             findOldVNode = true;
//             break;
//           }
//           otherNewIndex++;
//         }
//
//         if(findOldVNode){
//           oldStartIndex = oldChIndex + 1;
//           patchVnode(oldVNode, newVNode2);
//           break;
//         }else{
//           removeVNode(instanceParentVnode, oldVNode, oldChIndex + addedNum);
//           addedNum--;
//           oldChIndex++;
//           oldStartIndex++;
//         }
//       }
//     }
//
//     if(!finalMatchOldNode){
//       addVNode(instanceParentVnode, newVNode, oldChIndex);
//       addedNum++;
//     }
//     newStartIndex++;
//   }
// }

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

  //newCh [new1, new2, new3...]
  while (newStartIndex <= newEndIndex) {
    let newVNode = newCh[newStartIndex];
    let oldVNode = oldCh[newStartIndex];

    log('updateChildren', oldVNode, newVNode);
    if(isDef(oldVNode)){
      if(typeof oldVNode === 'string' || typeof newVNode === 'string'){
        replaceVNode(instanceParentVnode, newVNode, newStartIndex);
      }else{
        if(utils.equalVNode(oldVNode, newVNode)){
          patchVnode(oldVNode, newVNode);
        }else{
          if(oldVNode.type === newVNode.type && oldVNode.key === newVNode.key){
            patchVnode(oldVNode, newVNode);
          }else{
            replaceVNode(instanceParentVnode, newVNode, newStartIndex);
          }
        }
      }
    }else{
      addVNode(instanceParentVnode, newVNode, newStartIndex);
    }
    newStartIndex++;
  }

  while (newStartIndex <= oldEndIndex) {
    removeVNode(instanceParentVnode, newStartIndex)
    newStartIndex++;
  }
}

function patchVnode(oldVNode, newVNode) {
  // 完全等价的节点，不同替换。但props可能变化
  // 非顶级
  if(!utils.compareObject(oldVNode.props, newVNode.props)){
    syncProps(oldVNode, newVNode);
    updateComponent(oldVNode.instance);
  }

  let isEquivalentNodeWithChildren = utils.equalVNodeChildren(oldVNode, newVNode);

  log('patchVnode', isEquivalentNodeWithChildren);

  if(isEquivalentNodeWithChildren){

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
  if(utils.isPixiObj(newVNode)){

  } else if(utils.isVNode(newVNode)){


    var isEquivalentNode = utils.equalVNode(instance.vNode, newVNode);
    log(`updateComponent`,instance.vNode.props, newVNode.props, isEquivalentNode);
    log(`updateComponent`,instance.vNode.key, newVNode.key);
    if (isEquivalentNode){
      patchVnode(instance.vNode, newVNode)
    } else {
      //...
      syncProps(instance.vNode, newVNode);
    }
  }
  // debugger;
  instance.children.forEach(childInstance => {
    if(typeof childInstance === 'object'){
      updateComponent(childInstance);
    }
  });
}
var i = 0;
function mountComponent(node, parentComponent) {
  if(typeof node === 'string'){
    return node;
  } else {
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

    }else{
      throw new Error('mountComponent 卧槽');
    }

    node.children.map(childNode => {

      const childInstance = mountComponent(childNode, instance);
      instance.children.push(childInstance);
    });

    return instance;
  }
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
    return typeof child === 'object' || typeof child === 'string';
  }).reduce((prev, next) => {
    // 带slots情况下,children是个二维数组
    if(__ENV__ === 'dev'){
      if(Array.isArray(next) && !next.isSlot && !next.every(node => {
        return !!node.key;
      })){

        throw new Error('数组返回的每个节点必须含有key');
      }
    }

    return prev.concat(next);
  },[]);

  var slots = [];

  // @TODO
  if(isReservedType(componentClass)){
    componentClass = primitiveMap[componentClass];
  } else if(typeof componentClass === 'function'){
    //暂时忽略 props.children
    slots = children.slice();
    slots.isSlot = true;
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

  return node;
}

module.exports.Container = Container;
module.exports.renderTo = renderTo;
module.exports.PactComponent = PactComponent;
module.exports.h = h;
