'use strict';
//import PIXI from 'pixi.js'
import pixiLib from 'pixi-lib';
import * as utils from './utils.js';
import _ from 'lodash';

import {mountComponent} from './mount';
import {PactComponent, primitiveMap} from './primitiveComponents.js';

const {isUndef, isDef,log} = utils;

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

  const rootInstance = mountComponent(instanceVNode, instance, instance);
  rootInstance.didMounted();
  instance.didMounted();

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
  if(utils.isReservedType(componentClass)){
    componentClass = primitiveMap[componentClass];
  } else if(typeof componentClass === 'function'){
    //暂时忽略 props.children
    slots = children.slice();
    slots.isSlot = true;
    children = [];
  } else {
    console.error(componentClass);
    throw new Error(`the compoennt ${componentClass} muse be a PactComponent`);
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

module.exports.renderTo = renderTo;
module.exports.PactComponent = PactComponent;
module.exports.Container = primitiveMap.c;
module.exports.h = h;
