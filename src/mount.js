import * as utils from './utils.js';
const {isUndef, isDef,log} = utils;

export function mountComponent(parentNode, parentComponent) {
  if(typeof parentNode === 'string'){
    return parentNode;
  } else {
    const instance = new parentNode.type(parentNode.props, parentNode.slots);
    const vNode = instance.render();

    parentNode.instance = instance;

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

    parentNode.children.map(childNode => {

      const childInstance = mountComponent(childNode, instance);
      instance.children.push(childInstance);
    });

    instance.didMounted();

    return instance;
  }
}
