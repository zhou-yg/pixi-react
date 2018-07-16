import * as utils from './utils.js';
const {isUndef, isDef,log, isStr, cloneProps} = utils;
import {mountComponent} from './mount.js';
import {isPrimitiveClass, NullSprite} from './primitiveComponents';

const updateQueue = []; //等待更新

function removeRef(vNode){
  if(typeof vNode === 'object' && vNode.props.ref) {
    delete vNode.contextInstance.refs[vNode.props.ref];
  }
}

function appendRef(vNode){
  if(typeof vNode === 'object' && vNode.props.ref){
    vNode.contextInstance.refs[vNode.props.ref] = isPrimitiveClass(vNode.instance) ? vNode.instance.pixiEl : vNode;
  }
}

function syncProps(oldVNode, newVNode) {
  log('syncProps', oldVNode);
  log('syncProps', newVNode);

  removeRef(oldVNode);

  oldVNode.props = cloneProps(newVNode.props);
  oldVNode.instance.setProps(oldVNode.props);

  updateComponent(oldVNode.instance);

  appendRef(oldVNode);
}

function replaceVNode(parentVNode, newVNode, replaceIndex) {
  const pixiEl = parentVNode.instance.pixiEl;

  log(`replaceVNode`, replaceIndex);
  log(`replaceVNode`,'new',newVNode);

  const newInstance = mountComponent(newVNode, parentVNode.instance, parentVNode.contextInstance, parentVNode.contextInstance, replaceIndex);
  const oldVNode = parentVNode.children[replaceIndex];

  removeRef(oldVNode);
  pixiEl.removeChildAt(replaceIndex);

  appendRef(newVNode);

  log(`replaceVNode`,'isntance.chidlren[i]', !!parentVNode.instance.children[replaceIndex]);
  if (parentVNode.instance.children[replaceIndex]) {
    parentVNode.instance.children[replaceIndex].unmount();
  }

  parentVNode.instance.children[replaceIndex] = newInstance;
  parentVNode.children[replaceIndex] = newVNode;

  // if (typeof newInstance === 'string') {
  //   log(`replaceVNode`,'str', pixiEl.children, !!pixiEl.children[replaceIndex]);
  //
  //   // if(pixiEl.children[replaceIndex]){
  //   //   pixiEl.removeChildAt(replaceIndex);
  //   // }
  //   // pixiEl.addChildAt(new NullSprite(), replaceIndex);
  // } else if(/* typeof newInstance !== 'string' &&  */!newInstance.vNode){
  //   // pixiEl.addChildAt(newInstance.pixiEl, replaceIndex);
  // }
}
function addVNode(parentVNode, newVNode, targetIndex) {
  const newInstance = mountComponent(newVNode, parentVNode.instance, parentVNode.contextInstance, parentVNode.contextInstance);

  appendRef(newVNode);

  parentVNode.instance.children.splice(targetIndex, 0 , newInstance);
  parentVNode.children.splice(targetIndex,0 , newVNode);

  log(`addVNode`, newInstance)

  if(isStr(newInstance)){
    parentVNode.instance.pixiEl.addChildAt(new NullSprite(), targetIndex);
  } else if(!newInstance.vNode){
    parentVNode.instance.pixiEl.addChildAt(newInstance.pixiEl, targetIndex);
  }
}

function removeVNode(parentVNode, removeFromIndex) {
  const pixiEl = parentVNode.instance.pixiEl;
  const removedVNode = parentVNode.children[removeFromIndex];

  removeRef(removedVNode);

  removedVNode.unmount();

  parentVNode.instance.children.splice(removeFromIndex, 1);
  parentVNode.children.splice(removeFromIndex, 1);

  if(pixiEl){
    pixiEl.removeChildAt(removeFromIndex);
  }
}

function updateChildren(instanceParentVnode, newParentVnode) {
  const oldCh = instanceParentVnode.children.slice();
  const newCh = newParentVnode.children.slice();

  log('updateChildren', 'old', oldCh);
  log('updateChildren', 'newCh', newCh);

  const oldLen = oldCh.length;
  const newLen = newCh.length;

  var oldStartIndex = 0;
  var oldEndIndex = 0;
  var oldStartVnode = oldCh[0];
  var oldEndVnode = oldCh[oldLen - 1];

  var newStartIndex = 0;
  var newEndIndex = newLen -1;
  var newStartVnode = newCh[0];
  var newEndVnode = newCh[newLen-1];

  //newCh [new1, new2, new3...]
  while (newStartIndex <= newEndIndex) {
    let newVNode = newCh[newStartIndex];
    let oldVNode = oldCh[newStartIndex];

    log('updateChildren', oldVNode, newVNode);
    if(isDef(oldVNode)){
      if(isStr(oldVNode) || isStr(newVNode)){
        replaceVNode(instanceParentVnode, newVNode, newStartIndex);
      }else{
        if(utils.equalVNode(oldVNode, newVNode)){
          patchVnode(oldVNode, newVNode);
        }else{
          if(oldVNode.type === newVNode.type && oldVNode.key === newVNode.key){
            patchVnode(oldVNode, newVNode);
          }else{
            replaceVNode(instanceParentVnode, newVNode, newStartIndex);
          }
        }
      }
    }else{
      addVNode(instanceParentVnode, newVNode, newStartIndex);
    }
    newStartIndex++;
  }

  while (newStartIndex <= oldEndIndex) {
    removeVNode(instanceParentVnode, newStartIndex)
    newStartIndex++;
  }
}

function patchVnode(oldVNode, newVNode) {
  // 完全等价的节点，不用替换。但props可能变化
  // 非顶级
  if(!utils.compareObject(oldVNode.props, newVNode.props)){
    syncProps(oldVNode, newVNode);
  }

  let isEquivalentNodeWithChildren = utils.equalVNodeChildren(oldVNode, newVNode);

  log('patchVnode', isEquivalentNodeWithChildren);

  if(isEquivalentNodeWithChildren){

    // 继续检查子节点
    oldVNode.children.slice().forEach((oldChildVNode, i) => {
      patchVnode(oldChildVNode, newVNode.children[i]);
    });
    if (!oldVNode.props.slots) {
      console.log(oldVNode.props.slots, oldVNode);
    }
    oldVNode.props.slots.slice().forEach((oldSlotVNode, i) => {
      patchVnode(oldSlotVNode, newVNode.props.slots[i]);
    });
  } else {
    updateChildren(oldVNode, newVNode);
  }
}

function updateComponent(instance) {
  const newVNode = instance.render();
  if(utils.isPixiObj(newVNode)){

    log('updateComponent', 'inst', instance);
    log('updateComponent', 'pixiEl', instance.pixiEl);

    const parent = instance.pixiEl.parent;

    if(parent){
      const oldPixiEl = instance.pixiEl;
      const pixiElIndex = parent.getChildIndex(oldPixiEl);

      parent.removeChildAt(pixiElIndex);
      parent.addChildAt(newVNode, pixiElIndex);

      oldPixiEl.children.slice().forEach((child , i)=> {
        newVNode.addChild(child);
      });

    }
    instance.pixiEl = newVNode;

  } else if(utils.isVNode(newVNode)){

    // var isEquivalentNode = utils.equalVNode(instance.vNode, newVNode);
    log(`updateComponent`,instance.vNode.props, newVNode.props);
    log(`updateComponent`,instance.vNode.key, newVNode.key);

    // if (isEquivalentNode){
    //   syncProps(instance.vNode, newVNode);
    // } else {
    //   //...
    //   // syncProps(instance.vNode, newVNode);
    //   log(`updateComponent`, instance.vNode, newVNode);
    // }
    patchVnode(instance.vNode, newVNode);
  }
  // debugger;
  instance.children.forEach(childInstance => {
    if(typeof childInstance === 'object'){
      updateComponent(childInstance);
    }
  });
}

function startUpdate () {

  requestAnimationFrame(() => {
    const currentComponentInstance = updateQueue.shift();

    updateComponent(currentComponentInstance);

    if(updateQueue.length > 0) {
      startUpdate();
    }
  });
}

export function updateComponentSync(componentInstance) {
  updateComponent(componentInstance)
}

export function updateComponentAsync(componentInstance) {
  updateQueue.push(componentInstance);

  startUpdate();
}
