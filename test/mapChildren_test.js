'use strict';
import {
  equal,
  notEqual,
  ok,
  ifError
} from 'assert';
import {
  h,
  renderTo,
  PactComponent,
  Container
} from '../src/pixi-react';

class MyComponent extends PactComponent{
  render(){
    return (
      <c key="myComponent" ref="rootInComponent">
        <c keyName="m0" />
        {this.slots}
        <c keyName="m3" />
      </c>
    )
  }
}

class T extends PactComponent {
  constructor() {
    super({});
    this.state = {
      list: [
        'name',
        'xx',
      ]
    }
  }
  render() {
    const {
      list
    } = this.state;

    return (
      <c>
      {list.map(name => {
        return (
          <c key={name} name={name} />
        );
      })}
      <MyComponent ref="myComponent">
        <c ref="childInComponent" name="childIn"/>
      </MyComponent>
      </c>
    );
  }
}

describe('组件特性', function () {

  var tVNode;
  var topContainer;
  var tInstance;

  beforeEach(function () {
    tVNode = h(T);
    topContainer = new PIXI.Container();
    tInstance = renderTo(tVNode, topContainer);
  })

  describe('数组子节点', function () {

    it('vNode', () => {

      equal(tInstance.vNode.type, Container, '顶层vNode的type类型');
      equal(tInstance.vNode.children.length, 3, 'vNode的儿子们的长度');
      equal(tInstance.vNode.children[0].props.name, 'name', '第1个vNode的名字');
      equal(tInstance.vNode.children[1].props.name, 'xx', '第2个vNode的名字');
    });
  });

  describe('ref特性', function () {
    it('实例refs', () => {
      const myComponentInst = tInstance.vNode.instance.children[2];

      equal(tInstance.refs.myComponent, myComponentInst, '自定义组件的ref为组件实例');
      equal(myComponentInst.refs.rootInComponent, myComponentInst.vNode.instance.pixiEl , 'pixi组件的ref为pixi对象');
      equal(tInstance.refs.childInComponent, myComponentInst.vNode.instance.children[1].pixiEl , '嵌套组件的ref在 声明时所在的实例下');
    });
  });
});
