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

describe('组件生命周期', function() {
  var tVNode;
  var topContainer;
  var tInstance;

  beforeEach(function () {
    tVNode = h(T);
    topContainer = new PIXI.Container();
    tInstance = renderTo(tVNode, topContainer);
  });

  describe('周期:didMounted', () => {
    it('触发一次', () => {
    });
    it('不再触发第二次', () => {
    });
  });
});
