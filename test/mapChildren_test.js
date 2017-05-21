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
      </c>
    );
  }
}

describe('数组子节点', function () {

  describe('初始化', function () {
    const tVNode = h(T);
    const topContainer = new PIXI.Container();
    const tInstance = renderTo(tVNode, topContainer);

    it('vNode', () => {

      equal(tInstance.vNode.type, Container, '顶层vNode的type类型');
      equal(tInstance.vNode.children.length, 2, 'vNode的儿子们的长度');
      equal(tInstance.vNode.children[0].props.name, 'name', '第1个vNode的名字');
      equal(tInstance.vNode.children[1].props.name, 'xx', '第2个vNode的名字');
    });
  });
});
