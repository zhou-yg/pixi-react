'use strict';
//import PIXI from 'pixi.js'
import * as utils from './utils.js';

function updateChildren() {

}

function updateComponent(instance) {
  const newVNode = instance.render();

  if(utils.isPixiObj(newVNode)){

  } else if(utils.isVNode(newVNode)){

    let isEquivalentNode = utils.equalVNode(instance.vNode, newVNode);
    console.log(instance, isEquivalentNode);

    if(isEquivalentNode){
      let isEquivalentNodeWithChildren = utils.equalVNode(instance.vNode, newVNode, true);

      if(isEquivalentNodeWithChildren){
        // 完全等价的节点，不同替换
      } else {
        let newChildren = updateChildren(instanceVNode, newVNode);
      }
    }
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

  var node = {
    type: componentClass,
    props,
    children,
  };

  return node;
}
