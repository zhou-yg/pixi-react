import * as utils from './utils.js';
const {isUndef, isDef,log} = utils;

export function mountComponent(parentNode, parentComponent, contextComponent) {
  if(typeof parentNode === 'string'){
    return parentNode;
  } else {
    const props = parentNode.props;
    const {ref} = props;

    const instance = new parentNode.type(parentNode.props, parentNode.slots);
    const vNode = instance.render();

    parentNode.instance = instance;

    // console.log('mountComponent 0', parentComponent, contextComponent);

    if(utils.isPixiObj(vNode)){
      instance.pixiEl = vNode;
      instance.isMounted = true;
      parentComponent.pixiEl.addChild(vNode);

      if(ref){
        contextComponent.refs[ref] = vNode;
      }

    } else if(utils.isVNode(vNode)){

      instance.vNode = vNode;
      instance.pixiEl = parentComponent.pixiEl;
      instance.isMounted = true;

      if(ref){
        contextComponent.refs[ref] = instance;
      }

      const rootInstance = mountComponent(vNode, instance, instance);

    }else{
      throw new Error('mountComponent 卧槽');
    }

    parentNode.children.map(childNode => {

      const childInstance = mountComponent(childNode, instance, parentComponent);
      instance.children.push(childInstance);
    });

    instance.didMounted();

    return instance;
  }
}
