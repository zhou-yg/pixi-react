import pixiLib from 'pixi-lib';

import {updateComponentSync} from './updator';

var PactComponentI = 0;

export class PactComponent {
  constructor (props, slots) {
    this.state = {};
    this.props = {};

    this.props = _.cloneDeep(props);

    this.displayName = 'PactComponent.' + (PactComponentI++);
    this.isMounted = false;
    this.vNode = null; //render产生的虚拟node
    this.pixiEl; //pixi对象
    this.rootInstance; //根实例对象
    this.children = []; //子PactComponent对象
    this.slots = slots || []; //插槽
    this.isTop = false; //是否为顶级
    this.refs = {}; // 引用
  }
  setState (obj) {

    this.state = _.merge(_.cloneDeep(this.state), obj);
    //@TODO 同步更新组件
    updateComponentSync(this);
  }

  setProps (newProps) {

    this.props = _.merge(_.cloneDeep(this.props),newProps);

    if(this.pixiEl){
      pixiLib.setConfig(this.pixiEl, newProps.member);

      if(newProps.member){
        if(newProps.member.play === false){
          this.pixiEl.stop();
        }else if(newProps.member.play === true){
          this.pixiEl.play();
        }
      }
    }
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
const eventsArr = ['onMouseDown', 'onTouch'];

class PixiComponent extends PactComponent{
  constructor(props) {
    super(props)

    this.eventFnMap = new Map();

    this.texture = props.texture;
  }
  setMember (pixiObj) {
    const {member} = this.props;
    if(member){
      pixiLib.setConfig(pixiObj,member);

      eventsArr.forEach(eventName => {
        const fn = this.props[eventName];

        if(fn){
          pixiObj.interactive = true;

          eventName = eventName.replace(/^on/, '').toLowerCase();

          const oldFn = this.eventFnMap.get(pixiObj);

          if(oldFn){
            if(oldFn !== fn){
              pixiObj.off(eventName, oldFn);
              pixiObj.on(eventName, fn);
            }
          }else{
            pixiObj.on(eventName, fn);
          }
        }
      });
    }
  }
}

var j = 0;
class Container extends PixiComponent {
  constructor (props) {
    super(props);
  }
  render () {
    const c = new PIXI.Container(this.texture);
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

class Rect extends PixiComponent {
  constructor(props){
    super(props)
  }
  render () {
    const {color, strokeWidth, strokeColor, x = 0, y =0, w, h} = this.props;

    const g = new PIXI.Graphics();

    g.beginFill(color);
    if(strokeWidth > 0){
      g.lineStyle(strokeWidth, strokeColor, 1);
    }
    g.drawRect(x,y,w,h);
    g.endFill();

    this.setMember(g);

    return g;
  }
}

export const primitiveMap = {
  c: Container,
  container:Container,
  sprite: Sprite,
  sp: Sprite,
  rect: Rect,
  'animated-sprite': AnimatedSprite,
  ani: AnimatedSprite,
}
