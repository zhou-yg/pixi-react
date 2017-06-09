import * as utils from './utils.js';
const {isUndef, isDef,log} = utils;
import {mountComponent} from './mount.js';

const updateQueue = []; //等待更新

function syncProps(oldVNode, newVNode) {
  oldVNode.props = _.merge(_.cloneDeep(oldVNode.props), newVNode.props);
  oldVNode.instance.setProps(oldVNode.props);
}

function replaceVNode(parentVNode, newVNode, replaceIndex) {
  log(`replaceVNode`, replaceIndex);
  log(`replaceVNode`, parentVNode.children[replaceIndex], newVNode);
  //...@TODO
  const newInstance = mountComponent(newVNode, parentVNode.instance);

  parentVNode.instance.children[replaceIndex] = newInstance;
  parentVNode.children[replaceIndex] = newVNode;

  if(typeof newInstance !== 'string' && !newInstance.vNode){
    parentVNode.instance.pixiEl.removeChildAt(replaceIndex);
    parentVNode.instance.pixiEl.addChildAt(newInstance.pixiEl, replaceIndex);
  }
}
function addVNode(parentVNode, newVNode, targetIndex) {
  const newInstance = mountComponent(newVNode, parentVNode.instance);

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

// function updateChildren(instanceParentVnode, newParentVnode) {
//   const oldCh = instanceParentVnode.children.slice();
//   const newCh = newParentVnode.children.slice();
//
//   const oldLen = oldCh.length;
//   const newLen = newCh.length;
//
//   var oldStartIndex = 0;
//   var oldEndIndex = 0;
//   var oldStartVnode = oldCh[0];
//   var oldEndVnode = oldCh[oldLen - 1];
//
//   var newStartIndex = 0;
//   var newEndIndex = newLen -1;
//   var newStartVnode = newCh[0];
//   var newEndVnode = newCh[newLen-1];
//
//   var patchedIndexArr = [];
//   var addedNum = 0;
//   //newCh [new1, new2, new3...]
//   while (newStartIndex <= newEndIndex) {
//     if(patchedIndexArr.indexOf(newStartIndex) !== -1){
//       newStartIndex++;
//       continue;
//     }
//     //...diff
//     let newVNode = newCh[newStartIndex];
//     let oldChIndex = oldStartIndex;
//     let finalMatchOldNode = false;
//
//     //oldCh [old1, old2, old3....]
//     while(oldChIndex <= oldLen - 1){
//       let oldVNode = oldCh[oldChIndex];
//
//       if(utils.equalVNode(oldVNode, newVNode)){
//         oldStartIndex = oldChIndex+1;
//
//         patchVnode(oldVNode, newVNode);
//         finalMatchOldNode = true;
//         break;
//       }else{
//         let findOldVNode = false;
//         let otherNewIndex = newStartIndex + 1;
//         let newVNode2 = null;
//
//         //newCh [new2, new3...]
//         while (otherNewIndex <= newEndIndex) {
//           newVNode2 = newCh[otherNewIndex];
//           if(utils.equalVNode(oldVNode, newVNode2)){
//             patchedIndexArr.push(otherNewIndex);
//             findOldVNode = true;
//             break;
//           }
//           otherNewIndex++;
//         }
//
//         if(findOldVNode){
//           oldStartIndex = oldChIndex + 1;
//           patchVnode(oldVNode, newVNode2);
//           break;
//         }else{
//           removeVNode(instanceParentVnode, oldVNode, oldChIndex + addedNum);
//           addedNum--;
//           oldChIndex++;
//           oldStartIndex++;
//         }
//       }
//     }
//
//     if(!finalMatchOldNode){
//       addVNode(instanceParentVnode, newVNode, oldChIndex);
//       addedNum++;
//     }
//     newStartIndex++;
//   }
// }

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
    updateComponent(oldVNode.instance);
  }

  let isEquivalentNodeWithChildren = utils.equalVNodeChildren(oldVNode, newVNode);

  log('patchVnode', isEquivalentNodeWithChildren);

  if(isEquivalentNodeWithChildren){

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
  if(utils.isPixiObj(newVNode)){

  } else if(utils.isVNode(newVNode)){


    var isEquivalentNode = utils.equalVNode(instance.vNode, newVNode);
    log(`updateComponent`,instance.vNode.props, newVNode.props, isEquivalentNode);
    log(`updateComponent`,instance.vNode.key, newVNode.key);

    if (isEquivalentNode){
      patchVnode(instance.vNode, newVNode)
    } else {
      //...
      // syncProps(instance.vNode, newVNode);
    }
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
