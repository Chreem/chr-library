import * as React from 'react'
import {Component} from 'react'
import styled from 'styled-components'
import {bind, throttle} from 'lodash-decorators'
import './style.less'
import render from '../module/render'
import {ObjectType, SceneObject, Wall, WallType} from "../../types/objects";
import guid from "~vendor/guid";


const Container = styled.div<{ size: number }>`
  * {position: absolute;}
  .wall{
    width: ${props => props.size}px;
    height: ${props => props.size}px;
  }
  .tank{
    width: ${props => 2 * props.size}px;
    height: ${props => 2 * props.size}px;
  }
`;


interface ComponentPropsType {
  width?: number,
  height?: number,
  map: SceneObject[],

  editor?: boolean,
  select?: string,
  onMouseDown?(position: [number, number]): void;
}

export default class extends Component<ComponentPropsType> {
  static defaultProps = {
    width: 20,
    height: 20,
    editor: false
  };
  state = {size: 0};

  handleResize = () => {
    let {clientHeight: h, clientWidth: w} = this.container.parentElement;
    w = w % 2 === 1 ? (w - 1) : w;
    h = h % 2 === 1 ? (h - 1) : h;
    const {width, height} = this.props;
    if ((width / height) > (w / h)) {
      // 所需内容较宽
      // 参照clientWidth宽确定size
      this.setState({size: w / width});
    } else {
      this.setState({size: h / height});
    }
  };


  hoverID: string = null;
  @bind
  @throttle(50)
  handleMouseMove({clientX: x, clientY: y, buttons}: MouseEvent) {
    if (!this.props.select) return;

    /**
     * 计算横纵坐标
     */
    const {offsetTop: t, offsetLeft: l} = this.container;
    const {size} = this.state;
    x = Math.floor((x - l) / size);
    y = Math.floor((y - t) / size);

    /**
     * 提示方块
     */
    const {select, map, onMouseDown} = this.props;
    let data: Wall = null;
    if (!this.hoverID) {
      data = {
        id: guid(),
        type: ObjectType.WALL,
        classify: select as WallType,
        tip: true,
        position: [x, y]
      };
      this.hoverID = data.id;
      map.push(data);
      return this.forceUpdate();
    }
    data = map.filter(item => item.id === this.hoverID)[0] as Wall;
    data.classify = select === 'cancel' ? null : select as WallType;
    data.position = [x, y];
    this.forceUpdate();
    if (buttons !== 1) return;
    onMouseDown && onMouseDown([x, y]);
  };


  container: HTMLDivElement = null;
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    if (!this.props.editor) return;
    const {container} = this;
    container.addEventListener('mousemove', this.handleMouseMove);
  }


  componentDidUpdate({width: w, height: h}: ComponentPropsType) {
    const {width, height} = this.props;
    if (width !== w || height !== h) this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  render() {
    let {height, width, map, editor} = this.props;
    const {size} = this.state;


    return <Container className="container"
                      style={{width: width * size + 'px', height: height * size + 'px'}}
                      size={size}
                      ref={e => this.container = e}>{render(map, {width, height, editor})}</Container>
  }
}