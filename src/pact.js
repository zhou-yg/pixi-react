'use strict';
//import PIXI from 'pixi.js'
import * as utils from './utils.js';

export function renderTo(node, pixiContainer) {

  const instance = new node.type(node.props);
  const instanceVNode = instance.render();
  instance.pixiEl = pixiContainer;

  mountComponent(instanceVNode, instance);

  return instance;
}

export function mountComponent(node, parentComponent) {
  const instance = new node.type(node.props);
  const vNode = instance.render();

  if(utils.isPixiObj(vNode)){
    instance.pixiEl = vNode;

    parentComponent.children.push(instance);

    parentComponent.pixiEl.addChild(vNode);
  } else if(utils.isVNode(vNode)){
    instance.pixiEl = parentComponent.pixiEl;
    instance.children = parentComponent.children;
    mountComponent(vNode, instance);
  }

  node.children.map(childNode => {

    mountComponent(childNode, instance);
  });

  return instance;
}

export class PactComponent {
  constructor (props) {
    this.state = {};
    this.props = {};

    Object.assign(this.props, props);

    this.isMounted = false;

    this.node
    this.el;
    this.pixiEl;
    this.children = [];

  }
  setState (obj) {
    this.state = Object.assign({}, this.state, obj);
    this.update();
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
