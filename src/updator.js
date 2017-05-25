import * as utils from './utils.js';
const {isUndef, isDef,log} = utils;
import {mountComponent} from './mount.js';

const updateQueue = []; //等待更新

function syncProps(oldVNode, newVNode) {
  oldVNode.props = _.merge(_.cloneDeep(oldVNode.props), newVNode.props);
  oldVNode.instance.setProps(oldVNode.props);
}

function addVNode(parentVNode, newVNode, targetIndex) {
  log(3,'addVNode', targetIndex, newVNode.key);
  const newInstance = mountComponent(newVNode, parentVNode.instance);

  parentVNode.instance.children.splice(targetIndex, 0 , newInstance);
  parentVNode.children.splice(targetIndex,0 , newVNode);

  // log(targetIndex,parentVNode.instance);
  // log('=== addVNode ===');

  if(!newInstance.vNode){
    parentVNode.instance.pixiEl.addChildAt(newInstance.pixiEl, targetIndex);
  }
}

function removeVNode(parentVNode, oldVNode, removeFromIndex) {
  log(3,'removeVNode', removeFromIndex, oldVNode.key);

  parentVNode.instance.children.splice(removeFromIndex, 1);
  parentVNode.children.splice(removeFromIndex, 1);

  if(parentVNode.instance.pixiEl){
    parentVNode.instance.pixiEl.removeChildAt(removeFromIndex);
  }
}

function updateChildren(instanceParentVnode, newParentVnode) {
  const oldCh = instanceParentVnode.children.slice();
  const newCh = newParentVnode.children.slice();

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

  var patchedIndexArr = [];
  var addedNum = 0;
  //newCh [new1, new2, new3...]
  while (newStartIndex <= newEndIndex) {
    if(patchedIndexArr.indexOf(newStartIndex) !== -1){
      newStartIndex++;
      continue;
    }
    //...diff
    let newVNode = newCh[newStartIndex];
    let oldChIndex = oldStartIndex;
    let finalMatchOldNode = false;

    log('newVNode:',newVNode.key, newStartIndex, oldChIndex);

    //oldCh [old1, old2, old3....]
    while(oldChIndex <= oldLen - 1){
      let oldVNode = oldCh[oldChIndex];
      if(utils.equalVNode(oldVNode, newVNode)){
        oldStartIndex = oldChIndex+1;

        log('finalMatchOldNode:',oldVNode.key, oldChIndex);
        patchVnode(oldVNode, newVNode);
        finalMatchOldNode = true;
        break;
      }else{
        let findOldVNode = false;
        let otherNewIndex = newStartIndex + 1;
        let newVNode2 = null;

        //newCh [new2, new3...]
        while (otherNewIndex <= newEndIndex) {
          newVNode2 = newCh[otherNewIndex];
          if(utils.equalVNode(oldVNode, newVNode2)){
            patchedIndexArr.push(otherNewIndex);
            findOldVNode = true;
            break;
          }
          otherNewIndex++;
        }

        if(findOldVNode){
          oldStartIndex = oldChIndex + 1;
          patchVnode(oldVNode, newVNode2);
          break;
        }else{
          log(newStartIndex, newVNode.key);
          removeVNode(instanceParentVnode, oldVNode, oldChIndex + addedNum);
          addedNum--;
          oldChIndex++;
          oldStartIndex++;
        }
      }
    }

    if(!finalMatchOldNode){
      addVNode(instanceParentVnode, newVNode, oldChIndex);
      addedNum++;
    }
    newStartIndex++;
  }


  // log('=== updateChildren ===')
}

function patchVnode(oldVNode, newVNode) {

  let isEquivalentNodeWithChildren = utils.equalVNode(oldVNode, newVNode, true);

  // log(`isEquivalentNodeWithChildren:`,oldVNode.key,isEquivalentNodeWithChildren);
  // log(oldVNode);
  // log(newVNode);
  // log('== patchVnode ==');


  if(isEquivalentNodeWithChildren){
    // 完全等价的节点，不同替换。但props可能变化
    // 非顶级
    log(3,'patch node', oldVNode.key, oldVNode.props, newVNode.props);
    if(!utils.compareObject(oldVNode.props, newVNode.props)){
      log(3,'compare', 1);
      syncProps(oldVNode, newVNode);
      updateComponent(oldVNode.instance);
    }


    // 继续检查子节点
    oldVNode.children.slice().forEach((oldChildVNode, i) => {
      patchVnode(oldChildVNode, newVNode.children[i]);
    });
  } else {
    updateChildren(oldVNode, newVNode);
  }
}

function updateComponent(instance) {
  const newVNode = instance.render();
  // log(`updateComponent:`, newVNode);
  if(utils.isPixiObj(newVNode)){

  } else if(utils.isVNode(newVNode)){
    var isEquivalentNode = utils.equalVNode(instance.vNode, newVNode);
    if (isEquivalentNode){
      patchVnode(instance.vNode, newVNode)
    } else {
      //...
    }
  }

  instance.children.forEach(childInstance => {
    updateComponent(childInstance);
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
