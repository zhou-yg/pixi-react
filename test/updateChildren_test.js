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
} from '../src/pact';

class T extends PactComponent {
  constructor() {
    super({});
    this.state = {
      a: false,
      b: true,
      d: true,
    }
  }
  render() {
    const {
      a,
      b,
      c,
      d
    } = this.state;

    return (
      <c key="top">
        {a ? <c key = "a" / > : ''}
        <c key="c1">< /c>
        {b ? <c key = "c2" ></c> : <c key="c3"></c>}
        {d ? <c key="c4" /> : ''}
      </c>
    );
  }
}

describe('组件生命周期', function() {

  var initChildrenLen = 3;

  describe('初始化', function() {
    const tVNode = h(T);
    const topContainer = new PIXI.Container();
    const tInstance = renderTo(tVNode, topContainer);

    it('vNode', function() {
      // body...
      equal(tInstance.vNode.type, Container, '顶层vNode的type类型');
      equal(tInstance.vNode.children.length, initChildrenLen, 'vNode的儿子们的长度');
      equal(tInstance.vNode.children[0].type, Container, '第一个儿子类型');
      equal(tInstance.vNode.children[0].key, 'c1', '第一个儿子key');
      equal(tInstance.vNode.children[1].type, Container, '第二个儿子类型');
      equal(tInstance.vNode.children[1].key, 'c2', '第二个儿子key');
    });
    it('子节点', function() {
      // body...
      equal(tInstance.children.length, 0, '子节点们的长度');
      equal(tInstance.rootInstance.children.length, initChildrenLen, '子节点们的长度');
      ifError(tInstance.rootInstance.children[0].vNode, '1. pixi对象不存在vnode');
      ok(tInstance.rootInstance.children[0].pixiEl, '1. pixi对象有pixiEl');
      ifError(tInstance.rootInstance.children[1].vNode, '2. pixi对象不存在vnode');
      ok(tInstance.rootInstance.children[1].pixiEl, '2. pixi对象有pixiEl');
    });
  });

  describe('组件更新-添加', function() {
    const tVNode = h(T);

    const topContainer2 = new PIXI.Container();
    const tInstance2 = renderTo(tVNode, topContainer2);

    // body...
    const oldCh = tInstance2.rootInstance.children.slice();
    console.log(tInstance2.vNode.children.slice());
    tInstance2.setState({
      a: true
    });
    console.log(tInstance2.vNode.children.slice());

    it('添加的vNode', function() {
      // body...
      equal(tInstance2.vNode.type, Container, '顶层vNode的type类型');
      equal(tInstance2.vNode.children.length, initChildrenLen + 1, 'vNode的儿子们的长度');
      equal(tInstance2.vNode.children[0].type, Container, '第一个儿子类型');
      equal(tInstance2.vNode.children[0].key, 'a', '第一个儿子key');
      equal(tInstance2.vNode.children[1].type, Container, '第二个儿子类型');
      equal(tInstance2.vNode.children[1].key, 'c1', '第二个儿子key');
      equal(tInstance2.vNode.children[2].type, Container, '第三个儿子类型');
      equal(tInstance2.vNode.children[2].key, 'c2', '第三个儿子key');
    });
    it('添加的instance', function() {
      const newCh = tInstance2.rootInstance.children.slice();
      // body...
      equal(tInstance2.rootInstance.children.length, initChildrenLen + 1, '子节点长度');
      equal(oldCh[0], newCh[1], '第一个节点不变');
      equal(oldCh[1], newCh[2], '第二个节点不变');
    });
  });

  describe('组建更新-替换', function() {
    const tVNode = h(T);

    const topContainer3 = new PIXI.Container();
    const tInstance = renderTo(tVNode, topContainer3);

    const oldCh = tInstance.rootInstance.children.slice();
    tInstance.setState({
      a: true,
      b: false
    });

    // body...
    it('替换的VNode', function() {
      equal(tInstance.vNode.type, Container, '顶层vNode的type类型');
      equal(tInstance.vNode.children.length, initChildrenLen + 1, 'vNode的儿子们的长度');
      equal(tInstance.vNode.children[0].type, Container, '第一个儿子类型');
      equal(tInstance.vNode.children[0].key, 'a', '第一个儿子key');
      equal(tInstance.vNode.children[1].type, Container, '第二个儿子类型');
      equal(tInstance.vNode.children[1].key, 'c1', '第二个儿子key');
      equal(tInstance.vNode.children[2].type, Container, '第三个儿子类型');
      equal(tInstance.vNode.children[2].key, 'c3', '第三个儿子key');
    });
    it('替换的节点', function() {
      const newCh = tInstance.rootInstance.children.slice();

      equal(newCh.length, initChildrenLen + 1, '子实例们的长度');
      equal(oldCh[0], newCh[1], 'key=c1的节点没变');
    });
  });
  describe('组建更新-删除', function() {
    const tVNode = h(T);

    const topContainer3 = new PIXI.Container();
    const tInstance = renderTo(tVNode, topContainer3);

    const oldCh = tInstance.rootInstance.children.slice();
    tInstance.setState({
      a: true,
      b: false,
      d: false,
    });

    it('删除的VNode', function() {
      // body...
      
    });
  }
});
