'use strict';
//import PIXI from 'pixi.js'
import * as utils from './utils.js';

const ComponentContext = {
  current: null;
}

export class PactComponent {
  constructor (props) {
    this.state = {};
    this.props = {};

    Object.assign(this.props, props);

    this.isMounted = false;

    this.el = this.render();
    this.children = [];

    if(!this.el){
      throw new Error('render function return undefined');
    }
  }
  setState (obj) {
    this.state = Object.assign({}, this.state, obj);
    this.update();
  }

  update () {
    // @TODO
  }

  addChild (pactObj, i) {
    if(i !== undefined){
      this.children.splice(i, 0 ,pactObj);
      //@WARNING
      this.el.addChildAt(pactObj.el, i);
    }else{
      this.children.push(pactObj);
      this.el.addChild(pactObj.el);
    }
  }
  removeChild (pactObj) {
    const i = this.children.indexOf(pactObj);
    this.children.splice(i, 1);
    this.el.removeChild(pactObj.el);
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


export default function h(componentClass, props, ...children) {
  var instance;

  // @TODO
  if(utils.isReservedType(componentClass)){
    instance = new Container(props);
  } else if(componentClass instanceof PactComponent){
    instance = new componentClass(props);
  } else {
    throw new Error('the compoennt muse be a PactComponent');
  }

  if(children.length > 0){
    instance.children.slice().filter((childInstance) => {
      instance.removeChild(childInstance);
      childInstance.unmount();
      return 0;
    });

    children.forEach(childInstance => {
      instance.addChild(childInstance);
      childInstance.didMount();
      return childInstance;
    });
  }

  return instance;
}
