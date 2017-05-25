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
} from '../src/pixi-react';

class SecondComponent extends PactComponent {
  render(){
    return (
      <c>
      </c>
    );
  }
}

class MyComponent extends PactComponent{
  render(){
    const {name} = this.props;
    const m3Name = `m3-${name}`;

    return (
      <c key="myComponent" >
        <c key="m0" />
        {this.slots}
        <SecondComponent key="m3" name={m3Name}/>
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
        {a ? <c / > : ''}
        <MyComponent name={name2} >
          <c />
          <c />
        </MyComponent>
        {c2 ? <c key = "c2" ></c> : <c key="c3"></c>}
        {c4 ? <c name={name2} /> : ''}
      </c>
    );
  }
}

describe('更新props', function() {

  describe('初始化', function() {
    const tVNode = h(T);
    const topContainer = new PIXI.Container();
    const tInstance = renderTo(tVNode, topContainer);
    const childrenLen = 4;

    it('vNode', function() {
      // body...
      equal(tInstance.vNode.children.length , childrenLen , 'length of vNode children');
      equal(tInstance.vNode.props.name, 'c' , 'name in vNode');
      equal(tInstance.vNode.children[0], '' , '第一个是空字符串');
      equal(tInstance.vNode.children[1].props.name, 'myComponent' , 'name of first child');
    });
    it('instance', function(){

      equal(tInstance.children, 0, 'cur instance children');
      equal(tInstance.vNode.instance.props.name, 'c', 'root instance name');
      equal(tInstance.vNode.instance.children[1].props.name, 'myComponent', 'first child instance name');
      equal(tInstance.vNode.instance.children[1].vNode.instance.children[3].props.name, 'm3-myComponent', 'first child instance name');
    });
  });
  describe('更新name', function() {
    const tVNode = h(T);
    const topContainer = new PIXI.Container();
    const tInstance = renderTo(tVNode, topContainer);
    const childrenLen = 4;

    const oldMyComponentInst = tInstance.vNode.instance.children[1];
    const oldSecondVNode = tInstance.vNode.instance.children[1].vNode.children[3];
    const oldSecondInst = tInstance.vNode.instance.children[1].vNode.instance.children[3];

    console.log('==========更新name==========');

    tInstance.setState({
      name1: 'newName1',
      name2: 'newName2',
    });

    it('vNode', function() {
      // body...
      equal(tInstance.vNode.children.length , childrenLen , 'length of vNode children');
      equal(tInstance.vNode.props.name, 'newName1' , 'name in vNode');
      equal(tInstance.vNode.children[1].props.name, 'newName2' , 'name of first child');
      equal(oldSecondVNode.type, SecondComponent, 'child child compoennt type');
    });
    it('instance', function() {
      const newCh = tInstance.vNode.instance.children;
      // body...
      equal(tInstance.vNode.instance.props.name, 'newName1', 'root instance name');
      equal(tInstance.vNode.instance.children[1].props.name, 'newName2', 'first child instance name');
      equal(tInstance.vNode.instance.children[1].vNode.instance.children[3].props.name, 'm3-newName2', 'first child instance name');
      equal(oldMyComponentInst, newCh[1], 'instace keep');
    });
  })
});
