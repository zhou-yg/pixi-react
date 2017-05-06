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
      a: false,
      c2: true,
      c4: true,
    }
  }
  render() {
    const {
      a,
      c2,
      c,
      c4
    } = this.state;

    return (
      <c key="top">
        {a ? <c key = "a" / > : ''}
        <c key="c1">< /c>
        {c2 ? <c key = "c2" ></c> : <c key="c3"></c>}
        {c4 ? <c key="c4" /> : ''}
      </c>
    );
  }
}

describe('基础组件', function() {

  var initChildrenLen = 3;

  describe('初始化', function() {
    const tVNode = h(T);
    const topContainer = new PIXI.Container();
    const tInstance = renderTo(tVNode, topContainer);

    it('vNode', function() {
      // body...
      equal(tVNode.type, T, '初始vNode的type类型');
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
      equal(tInstance.vNode.instance.children.length, initChildrenLen, '子节点们的长度');
      ifError(tInstance.vNode.instance.children[0].vNode, '1. pixi对象不存在vnode');
      ok(tInstance.vNode.instance.children[0].pixiEl, '1. pixi对象有pixiEl');
      ifError(tInstance.vNode.instance.children[1].vNode, '2. pixi对象不存在vnode');
      ok(tInstance.vNode.instance.children[1].pixiEl, '2. pixi对象有pixiEl');
    });
  });

  describe('组件更新-添加', function() {
    const tVNode = h(T);

    const topContainer2 = new PIXI.Container();
    const tInstance2 = renderTo(tVNode, topContainer2);

    // body...
    const oldCh = tInstance2.vNode.instance.children.slice();

    tInstance2.setState({
      a: true
    });

    // console.log('===============================组件更新-添加=====================================')

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
      const newCh = tInstance2.vNode.instance.children.slice();
      // body...
      equal(tInstance2.vNode.instance.children.length, initChildrenLen + 1, '子节点长度');
      equal(oldCh[0], newCh[1], '第一个节点不变');
      equal(oldCh[1], newCh[2], '第二个节点不变');
    });
  });

  describe('组建更新-替换', function() {
    const tVNode = h(T);

    const topContainer3 = new PIXI.Container();
    const tInstance = renderTo(tVNode, topContainer3);

    const oldCh = tInstance.vNode.instance.children.slice();
    tInstance.setState({
      a: true,
      c2: false
    });
    console.log('==============================组建更新-替换======================================')

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
    it('替换的instance', function() {
      const newCh = tInstance.vNode.instance.children.slice();
      equal(newCh.length, initChildrenLen + 1, '子实例们的长度');
      equal(oldCh[0], newCh[1], 'key=c1的节点没变');
    });
  });
  describe('组建更新-删除', function() {
    const tVNode = h(T);

    const topContainer3 = new PIXI.Container();
    const tInstance = renderTo(tVNode, topContainer3);

    const oldCh = tInstance.vNode.instance.children.slice();
    tInstance.setState({
      a: true,
      c2: false,
      c4: false,
    });
    console.log('==============================组建更新-删除======================================')

    it('删除的VNode', function() {
      // body...
      equal(tInstance.vNode.type, Container, '顶层vNode的type类型');
      equal(tInstance.vNode.children.length,3, 'vNode的儿子们长度');
      equal(tInstance.vNode.children[0].type, Container, '第一个儿子类型');
      equal(tInstance.vNode.children[0].key, 'a', '第一个儿子key');
      equal(tInstance.vNode.children[1].type, Container, '第二个儿子类型');
      equal(tInstance.vNode.children[1].key, 'c1', '第二个儿子key');
      equal(tInstance.vNode.children[2].type, Container, '第三个儿子类型');
      equal(tInstance.vNode.children[2].key, 'c3', '第三个儿子key');
    });
    it('删除的instance', () => {
      const newCh = tInstance.vNode.instance.children;
      equal(newCh.length,3,'实例的长度');
      equal(oldCh[0],newCh[1]);
    });
  });
});
