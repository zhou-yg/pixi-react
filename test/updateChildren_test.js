'use strict';
var assert = require('assert');

import {h, renderTo,PactComponent} from '../src/pact';

class T extends PactComponent {
  constructor () {
    super({});
    this.state = {
      a: true,
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

describe('not updateChildren', function () {
  const tVNode = h(T);

  const topContainer = {
    children:[],
    addChild(c){
      this.children.push(c)
    },
  }
  const tInstance = renderTo(tVNode,topContainer);


});
