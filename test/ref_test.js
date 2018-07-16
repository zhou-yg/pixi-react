'use strict';
import PIXI from 'pixi-fake.js';
global.PIXI = PIXI;
global.__ENV__ = true;

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
  constructor(p) {
    super(p);
  }
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
      childInComponent: true,
    }
  }
  render() {
    const {
      list,
      childInComponent,
    } = this.state;

    return (
      <c>
        <MyComponent ref="myComponent">
          {childInComponent ? <c ref="childInComponent" name="childIn"/> : <c ref="childInComponent2" name="childIn2"/>}
        </MyComponent>
      </c>
    );
  }
}

describe('功能特性:ref', function () {

  var tVNode;
  var topContainer;
  var tInstance;

  beforeEach(function () {
    tVNode = h(T, {
      cb () {},
      cb2 () {},
    });
    topContainer = new PIXI.Container();
    tInstance = renderTo(tVNode, topContainer);
  })

  describe('ref特性', function () {
    it('实例refs', () => {
      const myComponentInst = tInstance.vNode.instance.children[0];

      // console.log(myComponentInst.vNode.instance.children);

      equal(tInstance.refs.myComponent, myComponentInst, '自定义组件的ref为组件实例');
      equal(myComponentInst.refs.rootInComponent, myComponentInst.vNode.instance.pixiEl , 'pixi组件的ref,如果被保留类型，则为pixi对象');
      equal(tInstance.refs.childInComponent, myComponentInst.vNode.instance.children[1].pixiEl , '嵌套组件的ref在 声明时所在的实例下');
    });
  });

  describe('ref特性更新', () => {


    it('实例refs', () => {
      tInstance.setState({
        childInComponent: false,
      });

      const myComponentInst = tInstance.vNode.instance.children[0];

      equal(tInstance.vNode.children[0].slots[0].props.name, 'childIn2', '变换');
      equal(tInstance.refs.myComponent, myComponentInst, '自定义组件的ref为组件实例');
      equal(myComponentInst.refs.rootInComponent, myComponentInst.vNode.instance.pixiEl , 'pixi组件的ref为pixi对象');
      equal(tInstance.refs.childInComponent2, myComponentInst.vNode.instance.children[1].pixiEl , '嵌套组件的ref在 声明时所在的实例下');
    });
  });
});
