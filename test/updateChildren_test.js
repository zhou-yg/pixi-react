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

  it('初始化', function() {

    equal(tInstance.vNode.type, Container, 'vNode的type类型');
    equal(tInstance.vNode.children.length, 2, 'vNode的儿子们的长度');
    equal(tInstance.vNode.children[0].type, Container,'第一个儿子类型');
    equal(tInstance.vNode.children[0].key, 'c1','第一个儿子key');
    equal(tInstance.vNode.children[1].type, Container,'第二个儿子类型');
    equal(tInstance.vNode.children[1].key, 'c2','第二个儿子key');
  });
});
