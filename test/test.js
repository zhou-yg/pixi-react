import {h, renderTo,PactComponent} from '../src/pact';

class T extends PactComponent {

  click () {
    return 1;
  }

  render () {
    return (
      <c>
        <c onClick={this.click}></c>
        <c></c>
      </c>
    );
  }
}


const ele = h(T);

renderTo(ele, {
  addChild(){}
})
