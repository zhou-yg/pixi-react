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
      </c>
    )
  }
}

class T extends PactComponent {
  constructor() {
    super({});
    this.state = {
      caseName: true,
    }
  }
  render() {
    const {
      caseName,
    } = this.state;

    return (
      <MyComponent ref="myComponent">
        {caseName ? '' : <c name="c0" />}
        {!caseName ? '' : <c name="c1" />}
      </MyComponent>
    );
  }
}

describe('功能特性:slot', function () {

  var tVNode;
  var topContainer;
  var tInstance;

  beforeEach(function () {
    tVNode = h(T);
    topContainer = new PIXI.Container();
    tInstance = renderTo(tVNode, topContainer);
  })

  describe('初始化', function () {

  });
});
