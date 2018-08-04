import {cloneDeep, merge} from 'lodash';
import {updateComponentSync} from './updator';
import {cloneProps} from './utils';

var PactComponentI = 0;

export class PactComponent {
  constructor (props) {
    this.state = {};
    this.props = props;

    this.displayName = 'PactComponent.' + (PactComponentI++);
    this.isMounted = false;
    this.vNode = null; //render产生的虚拟node
    this.pixiEl; //pixi对象
    this.rootInstance; //根实例对象
    this.children = []; //子PactComponent对象

    this.slots = props.slots || []; //插槽
    this.isTop = false; //是否为顶级
    this.refs = {}; // 引用
  }
  setState (obj) {

    this.state = _.merge(_.cloneDeep(this.state), obj);

    //@TODO 同步更新组件
    updateComponentSync(this);
  }

  setProps (newProps) {

    this.props = _.merge(cloneProps(this.props),newProps);
  }

  update () {
    // @TODO
  }

  addChild (pactObj, i) {
  }
  removeChild (pactObj) {
  }
  didMounted () {

  }
  unmount () {

  }

  render () {

  }
}

// 支持的事件
const eventsArr = ['onMouseDown', 'onTouchStart'];

class PixiComponent extends PactComponent{
  constructor(props) {
    super(props)

    this._eventFnMap = new Map();

    this.texture = props.texture;
  }

  setProps (newProps) {
    this.props = _.merge(cloneProps(this.props),newProps);

    if(this.pixiEl){
      this.setMember(this.pixiEl);
    }
  }

  setMember (pixiObj) {
    const {member} = this.props;
    if(member){
      pixiLib.setConfig(pixiObj,member);

      if(member.play === false){
        pixiObj.stop();
      }else if(member.play === true){
        pixiObj.play();
      }
    }
    eventsArr.forEach(eventName => {
      const fn = this.props[eventName];

      if(fn){
        pixiObj.interactive = true;

        eventName = eventName.replace(/^on/, '').toLowerCase();

        const oldFn = this._eventFnMap.get(pixiObj);

        if (oldFn === fn) {

        } else {
          if (oldFn) {
            pixiObj.off(eventName, oldFn);
          }
          pixiObj.on(eventName, fn);
          this._eventFnMap.set(pixiObj, fn);
        }
      }
    });
  }
}

var j = 0;
class Container extends PixiComponent {
  constructor (props) {
    super(props);
  }
  render () {
    const c = new PIXI.Container();
    this.setMember(c);
    return c;
  }
}
class Sprite extends PixiComponent {
  constructor(props) {
    super(props);
  }
  render () {
    const sp = new PIXI.Sprite(this.texture);
    this.setMember(sp);
    return sp;
  }
}
class AnimatedSprite extends PixiComponent {
  constructor(props){
    super(props)
  }
  render(){
    const props = this.props;
    const ani = new PIXI.extras.AnimatedSprite(props.textures);

    this.setMember(ani);

    if(props.member){
      if(props.member.play === false){
        ani.stop();
      }else{
        ani.play();
      }
    }

    return ani;
  }
}

class Graphics extends PixiComponent {
  constructor(props){
    super(props);
  }
  render(){
    const {color, strokeWidth, strokeColor,x ,y} = this.props;
    var pointes = this.props.pointes || [];
    pointes = pointes.map(obj => {
      if(Array.isArray(obj)){
        return obj
      }else{
        return [obj.x, obj.y];
      }
    });

    const g = new PIXI.Graphics();

    if(pointes.length > 0){
      g.beginFill(color);

      if(strokeWidth > 0){
        g.lineStyle(strokeWidth, strokeColor, 1);
      }
      g.moveTo(pointes[0][0], pointes[0][1]);

      pointes.slice(1).forEach((point) => {
        g.lineTo(point[0], point[1]);
      });
      g.endFill();
    }

    g.x = x;
    g.y = y;

    this.setMember(g);

    return g;
  }
}

class Text extends PixiComponent {
  constructor(props){
    super(props);
  }
  render(){
    const {text, style} = this.props;

    const t = new PIXI.Text(text, style);

    this.setMember(t);

    return t;
  }
}

class Ellipse extends PixiComponent {
  constructor(props){
    super(props)
  }
  render () {
    const {x = 0, y =0, w, h, fill} = this.props;

    const g = new PIXI.Graphics();

    g.beginFill(fill);
    g.drawEllipse(0,0,w,h);
    g.endFill();
    g.x = x;
    g.y = y;
    this.setMember(g);

    return g;
  }
}
class Circle extends PixiComponent {
  constructor(props){
    super(props)
  }
  render () {
    const {x = 0, y =0, r, fill} = this.props;

    const g = new PIXI.Graphics();

    g.beginFill(fill);
    g.drawCircle(0,0,r);
    g.endFill();
    g.x = x;
    g.y = y;
    this.setMember(g);

    return g;
  }
}
class Rect extends PixiComponent {
  constructor(props){
    super(props)
  }
  render () {
    const {color, fill, strokeWidth, strokeColor, x = 0, y =0, w, h} = this.props;

    const g = new PIXI.Graphics();

    g.beginFill(fill || color);
    if(strokeWidth > 0){
      g.lineStyle(strokeWidth, strokeColor, 1);
    }
    g.drawRect(0,0,w,h);
    g.endFill();
    g.x = x;
    g.y = y;
    this.setMember(g);

    return g;
  }
}
class RoundedRect extends PixiComponent {
  constructor(props){
    super(props)
  }
  render () {
    const {color, fill, strokeWidth, strokeColor, x = 0, y =0, w, h, r} = this.props;

    const g = new PIXI.Graphics();

    g.beginFill(fill || color);
    if(strokeWidth > 0){
      g.lineStyle(strokeWidth, strokeColor, 1);
    }
    g.drawRoundedRect(0,0,w,h, r);
    g.endFill();
    g.x = x;
    g.y = y;
    this.setMember(g);

    return g;
  }
}

export class NullSprite extends PIXI.Sprite {
  constructor(...arg){
    super(...arg);
    this.isNullSprite = true;
  }
}

export const primitiveMap = {
  c: Container,
  container:Container,

  sprite: Sprite,
  sp: Sprite,

  rect: Rect,
  rrect: RoundedRect,

  ellipse: Ellipse,
  ell: Ellipse,

  circle: Circle,
  cir: Circle,

  'animated-sprite': AnimatedSprite,
  ani: AnimatedSprite,

  graphics: Graphics,
  g: Graphics,

  t: Text,
  text: Text,
}


export function isPrimitiveClass(obj) {
  return obj instanceof PixiComponent;
}
