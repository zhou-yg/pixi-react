# pact

organize pixi object group like react style


## in the past

```
const c1 = new PIXI.Container();
const c2 = new PIXI.Container();
const c3 = new PIXI.Container();

c1.addChild(c2);
c1.addChild(c3);
```


## now

```
class C1 extends PactComponent {
  render () {
    return (
      <c>
        <c/>
        <c/>
      </c>
    );
  }
}
```
