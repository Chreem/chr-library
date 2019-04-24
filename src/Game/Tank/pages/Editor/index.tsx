import * as React from 'react'
import {Component} from 'react'
import guid from '~vendor/guid'
import {ObjectType, SceneObject, WallType} from "../../types/objects";
import Container from '../container'
import './style.less'


export default class extends Component {
  state = {
    select: '',

    width: 20,
    height: 20,
    map: [
      {
        id: guid(),
        type: 'wall',
        classify: "water",
        position: [
          8,
          4
        ]
      },
      {
        id: guid(),
        type: 'tank',
        classify: "player1",
        direction: 'up',
        position: [
          10,
          4
        ]
      }
    ] as SceneObject[]
  };


  handleMouseDown = ([x, y]) => {
    const {select, map} = this.state;
    const result = map.filter(item => {
      const [a, b] = item.position;
      if (item.tip) return false;
      if ((a === x) && (b === y)) return true;
      if (item.type === ObjectType.TANK) {
        if ((x >= a) && (a + 1 >= x))
          if ((y >= b) && (b + 1 >= y))
            return true;
      }
    })[0];


    // 清除墙壁
    if (select === 'cancel') {
      if (!result || result.type === ObjectType.TANK) return;
      const i = map.indexOf(result);
      if (i <= -1) return;
      map.splice(i, 1);
      this.forceUpdate();
      return;
    }


    // 放置新墙
    if (result) return;
    const data: SceneObject = {
      id: guid(),
      type: ObjectType.WALL,
      classify: select as WallType,
      position: [x, y]
    };
    map.push(data);
    this.forceUpdate();
  };


  componentDidMount() {
  }


  render() {
    const {select, width, height} = this.state;


    const inputs = ['normal', 'steel', 'grass', 'water', 'cancel'].map((t, i) => {
      return <input key={t}
                    type="radio"
                    className={`wall ${t}`}
                    name="wall"
                    value={t}
                    onClick={() => this.setState({select: t})}
                    defaultChecked={t === select}/>
    });


    return <div id="editor">
      <div className="editor-container">
        <Container editor={true}
                   {...this.state}
                   onMouseDown={this.handleMouseDown}/>
      </div>
      <div className="options">
        <div className="row">
          <span>Size:</span>
          <input type="number"
                 className="size"
                 value={width}
                 onChange={e => this.setState({width: e.target.value})}/>
          <span>x</span>
          <input type="number"
                 className="size"
                 value={height}
                 onChange={e => this.setState({height: e.target.value})}/>
        </div>
        <div className="row">{inputs}</div>
        <div className="row">

        </div>
      </div>
    </div>
  }
}

