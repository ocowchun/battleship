import './App.css';
import React from 'react';

const intervalMs = 1000;


function generateMap(columnSize, rowSize) {
  let map = [];
  for (let i = 0; i < rowSize; ++i)
  {
    let row = [];
    for (let j = 0; j < columnSize; ++j) {
      row.push(null);
    }
    map.push(row);
  }

  return map
}

class BaseObject {
  static generateID() {
    if (BaseObject.counter === undefined)
    {
      BaseObject.counter = 0;
    }
    return BaseObject.counter++;
  }

  constructor(row, column) {
    this.row = row
    this.column = column
    this.id = BaseObject.generateID()
  }

  run() {

  }

  render() {
    return "";
  }
}

class Missile extends BaseObject {
  run() {
    const a = (this.row + 1) % 3;
    this.row = a;
  }
  render() {
    return "💣";
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    let objects = [new Missile(0,0)];
    this.state = { seconds: 0, objects: objects };
  }

  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), intervalMs);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        Seconds: {this.state.seconds}
        <table>
            <tbody>
              {this.renderMap()}
            </tbody>
        </table>

      </div>
    );
  }

  renderMap() {
    let map = generateMap(3,3);
    this.state.objects.forEach(obj => {
      obj.run();
      map[obj.row][obj.column] = obj;
    })

    const result = map.map(function(row){
      return (
        <tr>
          {
            row.map(function(item){
              if (item) {
                return (<td key={item.id}>{ item.render()}</td>)
              } else {
                return (<td></td>)
              }
            })
          }
        </tr>
      );
    })

    return result

  }
}

export default App;
