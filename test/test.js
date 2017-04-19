import h, {PactComponent} from '../src/pact';

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


const t = new T();

t.setState({
  name: 1,
})
