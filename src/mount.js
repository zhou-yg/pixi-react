import * as utils from './utils.js';
const {isUndef, isDef,log} = utils;

export function mountComponent(node, parentComponent) {
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
