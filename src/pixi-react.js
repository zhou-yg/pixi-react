'use strict';
import * as utils from './utils.js';

import {mountComponent} from './mount';
import * as p from './primitiveComponents.js';

const {isUndef, isDef,log, cloneProps} = utils;

const primitiveMap = p.primitiveMap;

export const PactComponent = p.PactComponent

export const Container = primitiveMap.c;

export const primitiveComponents = p;

/**

node -> inst -> node2 -> inst2

**/
export function renderTo(node, pixiContainer) {
  const CT = node.type;
  const instance = new CT(node.props, node.slots);
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

export function h(componentClass, props, ...children) {
  if(!props){
    props = {};
  }
  children = children.filter(child => {
    return typeof child === 'object' || typeof child === 'string';
  }).reduce((prev, next) => {
    // 带slots情况下,children是个二维数组, 需要用isSlot区分
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
    slots.map(slotNode => {
      slotNode.isSlot = true;
    });
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
    props: cloneProps(props),
    children,
    slots,
    isSlot: false,
    isTop: false,
    contextInstance: null, // 所在render函数的组件对象
  };

  return node;
}
