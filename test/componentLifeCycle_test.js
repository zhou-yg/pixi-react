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
  didMounted () {
    this.props.cb();
  }
  unmount () {
    this.props.cb2();
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
  constructor(p) {
    super(p);
    this.state = {
      childInComponent: true,
    }
  }
  didMounted () {
    this.props.cb();
  }
  render() {
    const {
      list,
      childInComponent,
    } = this.state;

    return (
      <c>
        {childInComponent ? (<MyComponent ref="myComponent" cb={this.props.cb2} cb2={this.props.cb3}></MyComponent>) : ''}
      </c>
    );
  }
}

describe('组件生命周期', function() {
  var tVNode;
  var topContainer;
  var tInstance;
  var mountedCount = 0;
  var childMountedCount = 0;
  var unmoutCount = 0;
  beforeEach(function () {
    mountedCount = 0;
    childMountedCount = 0;
    unmoutCount = 0;

    tVNode = h(T, {
      cb () {
        mountedCount += 1;
      },
      cb2 () {
        childMountedCount += 1;
      },
      cb3 () {
        unmoutCount += 1;
      },
    });
    topContainer = new PIXI.Container();
    tInstance = renderTo(tVNode, topContainer);
  });

  describe('根组件:didMounted', () => {
    it('触发一次', () => {
      notEqual(mountedCount, 0, '没有触发');
      equal(mountedCount, 1, '触发了一次');
    });
    it('不再触发第二次', () => {
      tInstance.setState({childInComponent: false});
      equal(mountedCount, 1, '不再触发');
    });
  });

  describe('子组件:didMounted', () => {
    it('触发一次', () => {
      notEqual(childMountedCount, 0, '没有触发');
      equal(childMountedCount, 1, '触发了一次');
    });
    it('不再触发第二次', () => {
      tInstance.setState({childInComponent: false});
      equal(childMountedCount, 1, '不再触发');
    });
  });
  describe('子组件:unmout', () => {
    it('不再触发第二次', () => {

      equal(unmoutCount, 0, '初始不触发');

      tInstance.setState({childInComponent: false});

      equal(unmoutCount, 1, '组件卸载后再触发');
    });
  });
});
