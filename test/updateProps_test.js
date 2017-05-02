'use strict';
import {
  equal,
  ok,
  ifError
} from 'assert';
import {
  h,
  renderTo,
  PactComponent,
  Container
} from '../src/react-pixi';

class MyComponent extends PactComponent{
  render(){
    const {name} = this.props;
    const m3Name = `m3-${name}`;

    return (
      <c key="myComponent" >
        <c key="m0" />
        {this.slots}
        <c key="m3" name={m3Name}/>
      </c>
    )
  }
}

class T extends PactComponent {
  constructor() {
    super({});
    this.state = {
      a: false,
      c2: true,
      c4: true,
      name1: 'c',
      name2: 'myComponent',
    }
  }
  render() {
    const {
      a,
      c2,
      c4,
      name1,
      name2,
    } = this.state;

    return (
      <c key="top" name={name1} >
        {a ? <c key = "a" / > : ''}
        <MyComponent key="c1" name={name2} >
          <c key ="m1" />
          <c key ="m2" />
        </MyComponent>
        {c2 ? <c key = "c2" ></c> : <c key="c3"></c>}
        {c4 ? <c key="c4" /> : ''}
      </c>
    );
  }
}

describe('更新props', function() {

  describe('初始化', function() {
    const tVNode = h(T);
    const topContainer = new PIXI.Container();
    const tInstance = renderTo(tVNode, topContainer);
    const childrenLen = 3;

    it('vNode', function() {
      // body...
      equal(tInstance.vNode.children.length , 3 , 'length of vNode children');
      equal(tInstance.vNode.props.name, 'c' , 'name in vNode');
      equal(tInstance.vNode.children[0].props.name, 'myComponent' , 'name of first child');
    });
    it('instance', function(){

      equal(tInstance.children, 0, 'cur instance children');
      equal(tInstance.rootInstance.props.name, 'c', 'root instance name');
      equal(tInstance.rootInstance.children[0].props.name, 'myComponent', 'first child instance name');
      equal(tInstance.rootInstance.children[0].rootInstance.children[3].props.name, 'm3-myComponent', 'first child instance name');
    });
  });
  describe('更新name', function() {
    const tVNode = h(T);
    const topContainer = new PIXI.Container();
    const tInstance = renderTo(tVNode, topContainer);
    const childrenLen = 3;

    tInstance.setState({
      name1: 'newName1',
      name2: 'newName2',
    });

    it('vNode', function() {
      // body...
      equal(tInstance.vNode.children.length , 3 , 'length of vNode children');
      equal(tInstance.vNode.props.name, 'newName1' , 'name in vNode');
      equal(tInstance.vNode.children[0].props.name, 'newName2' , 'name of first child');
    });
    it('instance', function() {
      // body...
      equal(tInstance.rootInstance.props.name, 'c', 'root instance name');
      equal(tInstance.rootInstance.children[0].props.name, 'newName1', 'first child instance name');
      equal(tInstance.rootInstance.children[0].rootInstance.children[3].props.name, 'm3-newName2', 'first child instance name');
    });
  })
});
