'use strict';
import {equal} from 'assert';
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
      <c>
        {a ? <c key="a" /> : ''}
        <c key="c1"></c>
        <c key="c2"></c>
      </c>
    );
  }
}

describe('组件生命周期', function () {
  const tVNode = h(T);

  const topContainer = {
    children:[],
    addChild(c){
      this.children.push(c)
    },
  }
  const tInstance = renderTo(tVNode,topContainer);

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
      equal(tInstance.children.length, 2, '子节点们的长度');
      equal(tInstance.children[0].vNode.type, Container,'第一个子节点vNode类型');
      equal(tInstance.children[0].vNode.key, 'c1','第一个子节点vNode key');
      equal(tInstance.children[1].vNode.type, Container,'第二个子节点vNode类型');
      equal(tInstance.children[1].vNode.key, 'c2','第二个子节点vNode key');
    });
  });

  describe('组件更新',function(){
    const oldCh = tInstance.children.slice();
    tInstance.setState({
      a:true
    });
    const newCh = tInstance.children.slice();

    it('更新后的vNode', function() {
      // body...
      equal(tInstance.vNode.type, Container, 'vNode的type类型');
      equal(tInstance.vNode.children.length, 3, 'vNode的儿子们的长度');
      equal(tInstance.vNode.children[0].type, Container,'第一个儿子类型');
      equal(tInstance.vNode.children[0].key, 'a','第一个儿子key');
      equal(tInstance.vNode.children[1].type, Container,'第二个儿子类型');
      equal(tInstance.vNode.children[1].key, 'c1','第二个儿子key');
      equal(tInstance.vNode.children[2].type, Container,'第三个儿子类型');
      equal(tInstance.vNode.children[2].key, 'c2','第三个儿子key');
    });
    it('更新后的节点', function() {
      // body...
      equal(tInstance.children.length, 3 , '子节点长度');
    });
  });
});
