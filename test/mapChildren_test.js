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
      ],
    }
  }
  render() {
    const {
      list,
    } = this.state;

    return (
      <c>
      {list.map(name => {
        return (
          <c key={name} name={name} />
        );
      })}
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
      equal(tInstance.vNode.children.length, 2, 'vNode的儿子们的长度');
      equal(tInstance.vNode.children[0].props.name, 'name', '第1个vNode的名字');
      equal(tInstance.vNode.children[1].props.name, 'xx', '第2个vNode的名字');
    });
  });
});
