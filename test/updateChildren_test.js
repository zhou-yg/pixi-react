'use strict';
import {equal,ok,ifError} from 'assert';
import {h, renderTo,PactComponent, Container} from '../src/pact';

class T extends PactComponent {
  constructor () {
    super({});
    this.state = {
      a: false,
    }
  }
  render () {
    const {a,b,c,d} = this.state;

    return (
      <c key="top">
        {a ? <c key="a" /> : ''}
        <c key="c1"></c>
        <c key="c2"></c>
      </c>
    );
  }
}

describe('组件生命周期', function () {
  const tVNode = h(T);

  const topContainer = new PIXI.Container();
  const topContainer2 = new PIXI.Container();

  const _log  = console.log;
  // console.log = () => {};

  const tInstance = renderTo(tVNode,topContainer);
  const tInstance2 = renderTo(tVNode,topContainer2);

  const oldCh = tInstance2.rootInstance.children.slice();
  tInstance2.setState({
    a:true
  });

  console.log = _log;

  describe('初始化', function() {

    it('vNode', function() {
      // body...
      equal(tInstance.vNode.type, Container, 'vNode的type类型');
      equal(tInstance.vNode.children.length, 2, 'vNode的儿子们的长度');
      equal(tInstance.vNode.children[0].type, Container,'第一个儿子类型');
      equal(tInstance.vNode.children[0].key, 'c1','第一个儿子key');
      equal(tInstance.vNode.children[1].type, Container,'第二个儿子类型');
      equal(tInstance.vNode.children[1].key, 'c2','第二个儿子key');
    });
    it('子节点', function() {
      // body...
      equal(tInstance.children.length, 0, '子节点们的长度');
      equal(tInstance.rootInstance.children.length, 2, '子节点们的长度');
      ifError(tInstance.rootInstance.children[0].vNode,'1. pixi对象不存在vnode');
      ok(tInstance.rootInstance.children[0].pixiEl,'1. pixi对象有pixiEl');
      ifError(tInstance.rootInstance.children[1].vNode,'2. pixi对象不存在vnode');
      ok(tInstance.rootInstance.children[1].pixiEl,'2. pixi对象有pixiEl');
    });
  });

  describe('组件更新',function(){

    it('添加新的vNode', function() {

      // body...
      equal(tInstance2.vNode.type, Container, 'vNode的type类型');
      equal(tInstance2.vNode.children.length, 3, 'vNode的儿子们的长度');
      equal(tInstance2.vNode.children[0].type, Container,'第一个儿子类型');
      equal(tInstance2.vNode.children[0].key, 'a','第一个儿子key');
      equal(tInstance2.vNode.children[1].type, Container,'第二个儿子类型');
      equal(tInstance2.vNode.children[1].key, 'c1','第二个儿子key');
      equal(tInstance2.vNode.children[2].type, Container,'第三个儿子类型');
      equal(tInstance2.vNode.children[2].key, 'c2','第三个儿子key');
    });
    it('添加新的节点', function() {
      const newCh = tInstance2.rootInstance.children.slice();
      // body...
      equal(tInstance2.rootInstance.children.length, 3 , '子节点长度');
      equal(oldCh[0], newCh[1], '第一个节点不变');
      equal(oldCh[1], newCh[2], '第二个节点不变');
    });
  });
});
