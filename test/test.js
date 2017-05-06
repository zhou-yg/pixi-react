import {h, renderTo,PactComponent} from '../src/pixi-react';

var i=0;
function show(obj) {
  if(obj.children.length > 0){
    console.log(`${i++}:`, obj.children);
    obj.children.forEach(show);
  }
}


class T2 extends PactComponent {

  click () {
    return 1;
  }

  render () {
    return (
      <c key="t2root">
        <c key="t2C1" ></c>
        <c key="t2c2"></c>
      </c>
    );
  }
}

class T extends PactComponent {

  click () {
    return 1;
  }

  render () {
    return (
      <T2>
        <c key="c1" onClick={this.click}></c>
        <c></c>
      </T2>
    );
  }
}

const ele = h(T);

const topContainer = {
  children:[],
  addChild(c){
    this.children.push(c)
  },
}
const instance = renderTo(ele,topContainer);

console.log('=== show ===');
//show(topContainer);
show(instance);

console.log('=== setState ===')

instance.setState({
  name: 1,
});
