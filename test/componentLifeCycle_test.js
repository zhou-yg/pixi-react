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
        <MyComponent ref="myComponent" cb={this.props.cb2}>
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
  var mountedCount = 0;
  var childMountedCount = 0;
  beforeEach(function () {
    tVNode = h(T, {
      cb () {
        mountedCount += 1;
      },
      cb2 () {
        childMountedCount += 1;
      },
    });
    topContainer = new PIXI.Container();
    tInstance = renderTo(tVNode, topContainer);
  });

  describe('根组件:didMounted', () => {
    it('触发一次', () => {
      notEqual(mountedCount, 0, '没有触发');
      equal(mountedCount, 1, '触发了一次');
      mountedCount = 0;
    });
    it('不再触发第二次', () => {
      tInstance.setState({childInComponent: false});
      equal(mountedCount, 1, '不再触发');
    });
  });

  // describe('子组件:didMounted', () => {
  //   it('触发一次', () => {
  //     notEqual(childMountedCount, 0, '没有触发');
  //     equal(childMountedCount, 1, '触发了一次');
  //     childMountedCount = 0;
  //   });
  //   it('不再触发第二次', () => {
  //     tInstance.setState({childInComponent: false});
  //     equal(childMountedCount, 1, '不再触发');
  //   });
  // });
});
