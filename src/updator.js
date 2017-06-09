import * as utils from './utils.js';
import _ from 'lodash';
const {isUndef, isDef,log} = utils;
import {mountComponent} from './mount.js';

const updateQueue = []; //等待更新

function syncProps(oldVNode, newVNode) {
  log('syncProps', oldVNode)
  log('syncProps', newVNode);

  if(oldVNode.props.ref){
    delete oldVNode.contextInstance.refs[oldVNode.props.ref];
  }

  oldVNode.props = _.cloneDeep(newVNode.props);
  oldVNode.instance.setProps(oldVNode.props);

  updateComponent(oldVNode.instance);

  if(newVNode.props.ref){
    oldVNode.contextInstance.refs[newVNode.props.ref] = oldVNode.instance.pixiEl ? oldVNode.instance.pixiEl : oldVNode;
  }
}

function replaceVNode(parentVNode, newVNode, replaceIndex) {
  log(`replaceVNode`, replaceIndex);
  log(`replaceVNode`,'new',newVNode);
  //...@TODO
  const newInstance = mountComponent(newVNode, parentVNode.instance, parentVNode.instance, parentVNode.instance);
  const oldVNode = parentVNode.children[replaceIndex];

  parentVNode.instance.children[replaceIndex] = newInstance;
  parentVNode.children[replaceIndex] = newVNode;

  if(typeof newInstance !== 'string' && !newInstance.vNode){
    parentVNode.instance.pixiEl.removeChildAt(replaceIndex);
    parentVNode.instance.pixiEl.addChildAt(newInstance.pixiEl, replaceIndex);
  }
}
function addVNode(parentVNode, newVNode, targetIndex) {
  const newInstance = mountComponent(newVNode, parentVNode.instance, parentVNode.instance, parentVNode.instance);

  parentVNode.instance.children.splice(targetIndex, 0 , newInstance);
  parentVNode.children.splice(targetIndex,0 , newVNode);

  if(typeof newInstance !== 'string' && !newInstance.vNode){
    parentVNode.instance.pixiEl.addChildAt(newInstance.pixiEl, targetIndex);
  }
}

function removeVNode(parentVNode, removeFromIndex) {
  parentVNode.instance.children[removeFromIndex].unmount();

  parentVNode.instance.children.splice(removeFromIndex, 1);
  parentVNode.children.splice(removeFromIndex, 1);

  if(parentVNode.instance.pixiEl){
    parentVNode.instance.pixiEl.removeChildAt(removeFromIndex);
  }
}

function updateChildren(instanceParentVnode, newParentVnode) {
  const oldCh = instanceParentVnode.children.slice();
  const newCh = newParentVnode.children.slice();

  log('updateChildren', 'old',oldCh);
  log('updateChildren', 'newCh',newCh);

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
      if(typeof oldVNode === 'string' || typeof newVNode === 'string'){
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
    oldVNode.slots.slice().forEach((oldSlotVNode, i) => {
      patchVnode(oldSlotVNode, newVNode.slots[i]);
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
      const pixiElIndex = parent.getChildIndex(instance.pixiEl);
      parent.removeChildAt(pixiElIndex);
      parent.addChildAt(newVNode, pixiElIndex);

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
