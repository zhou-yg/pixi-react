'use strict';
export function isDef(v) {
  return !!v || v === 0;
}
export function isUndef(v) {
  return v === undefined;
}

export function isReservedType(name) {
  return name === 'c' || name === 'container';
}

export function isVNode(obj) {
  const keys = Object.keys(obj);

  return ['props','type', 'children'].every(k => {
    return keys.indexOf(k) !== -1;
  })
}

export function isPixiObj(obj) {
  return obj && obj.addChild
}

export function isEqualObj(obj1,obj2) {

}

export function equalVNode(obj1,obj2,checkChildren) {
  if(isDef(obj1.key) || isDef(obj2.key)){
    return obj1.key === obj2.key;
  }

  if(obj1.type === obj2.type){
    const isSameProps = compareObject(obj1.props,obj2.props);
    // console.log(`isSameProps:`,isSameProps);
    if(isSameProps){
      const len = obj1.children.length;
      // console.log('len:',checkChildren, len, obj2.children.length);
      if(checkChildren && len === obj2.children.length){
        let i = 0;
        let isSameChild = true;

        while (i < len) {
          let childObj1 = obj1.children[i];
          let childObj2 = obj2.children[i];

          isSameChild = equalVNode(childObj1, childObj2);
          if(!isSameChild){
            break;
          }
          i++;
        }
        return isSameChild;
      }
      return true;
    }
  }

  return false;
}

export function compareObject(obj1, obj2) {
  if(obj1 === obj2){
    return true;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if(keys1.join('') === keys2.join('')){
    return keys1.every(k=>{
      const type1 = typeof obj1[k];
      const type2 = typeof obj2[k];
      if(type1 !== type2){
        return false;
      } else if(type1 === 'object'){
        return compareObject(obj1[k], obj2[k]);
      } else if(type1 === 'function'){
        let r = obj1[k].toString() === obj2[k].toString();
        return r;
      }
      return obj1[k] === obj2[k];
    })
  }
  return false;
}
