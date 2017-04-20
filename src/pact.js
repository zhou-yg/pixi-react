'use strict';
//import PIXI from 'pixi.js'
import * as utils from './utils.js';


export class PactComponent {
  constructor (props, children) {
    this.state = {};
    this.props = {};

    Object.assign(this.props, props);

    this.isMounted = false;

    this.el;
    this.pixiEl;
    this.children = children;

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

class Container extends PactComponent {
  constructor (props) {
    super(props);
  }

  render () {
    return {
      addChild:()=>{},
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

export function renderTo(node, pixiContainer) {
  const instance = new node.type(node.props, node.children);

  console.log(instance);

  pixiContainer.addChild(instance.pixiEl);
}
