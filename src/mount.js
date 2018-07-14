import * as utils from './utils.js';
import { NullSprite} from './primitiveComponents';

const {isUndef, isDef,log} = utils;

export function mountComponent(parentNode, parentComponent, contextComponent, contextParent, index = 0) {
  if(typeof parentNode === 'string'){

    parentComponent.pixiEl.addChildAt(new NullSprite(), index);

    return parentNode;
  } else {
    const props = parentNode.props;
    const {ref} = props;

    const instance = new parentNode.type(parentNode.props, parentNode.slots);
    const vNode = instance.render();

    parentNode.instance = instance;

    if(parentNode.isSlot){
      parentNode.contextInstance = contextComponent;
    }else{
      parentNode.contextInstance = parentComponent;
    }

    // console.log('mountComponent 0', vNode, utils.isPixiObj(vNode));

    if(utils.isPixiObj(vNode)){

      instance.pixiEl = vNode;
      instance.isMounted = true;
      parentComponent.pixiEl.addChildAt(vNode, index);

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

      const rootInstance = mountComponent(vNode, instance, instance, contextComponent, index);

    }else{
      throw new Error('mountComponent 卧槽');
    }

    parentNode.children.map((childNode, i) => {

      var childContextComponent;

      if(childNode.isSlot){
        childContextComponent = contextParent;
      }else{
        childContextComponent = contextComponent;
      }

      const childInstance = mountComponent(childNode, instance, childContextComponent, contextParent, i);

      instance.children.push(childInstance);
    });

    instance.didMounted();

    return instance;
  }
}
