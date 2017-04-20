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

export function compareObject(obj1, obj2) {
  if(obj1 === obj2){
    return true;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if(keys1.join('') === keys2.join('')){
    return keys1.every(k=>{
      return obj1[k] === obj2[k];
    })
  }
  return false;
}
