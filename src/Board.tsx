import React, { useEffect } from 'react';
import './App.css';

import Tile from './Tile';

const randomIndex = (length: number) => Math.floor(Math.random() * length);
const randomElem = (array: any[]) => array[randomIndex(array.length)];

const initialValues = (values: string[], count: number) => {
  let result = [];
  for (let i = 0; i < count; i++) {
    result.push(randomElem(values))
  }
  return result;
}

type BoardProps = { values: string[], numTiles: number }

const Board: React.FC<BoardProps> = ({ values, numTiles }) => {
  const [tileValues, setTileValues] = React.useState<string[]>(initialValues(values, numTiles));
  const [selected, setSelected] = React.useState<number>(0)
  const [running, setRunning] = React.useState<boolean>(true);
  const selectInterval = React.useRef<number | undefined>()
  const updateInterval = React.useRef<number | undefined>()
  const selectRef = React.useRef<any>();
  const updateRef = React.useRef<any>();


  function selectRandomTile() {
    setSelected((selected) => {
      let i = randomIndex(numTiles - 1)
      if (i === selected) {
        i++
      }
      return i
    })
  }

  function updateRandomTile() {
    setTileValues((tileValues) => {
      let newTileValues = [...tileValues]
      newTileValues[randomIndex(numTiles)] = randomElem(values)
      return newTileValues
    })
  }

  React.useEffect(() => {
    selectRef.current = selectRandomTile
    updateRef.current = updateRandomTile
  })

  useEffect(() => {

    const stop = () => {
      clearInterval(selectInterval.current)
      clearInterval(updateInterval.current)
    }

    if (running) {
      selectInterval.current = window.setInterval(selectRef.current, 200)
      updateInterval.current = window.setInterval(updateRef.current, 200)
    } else {
      stop()
    }

    return () => {
      stop()
    }
  }, [running])

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        setRunning((running) => !running)
      }
    }

    document.addEventListener('keydown', listener)

    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [])

  const className = running ? "Board" : "Board Stopped"

  return (
    <div className={className}>
      {tileValues.map((value, i) =>
        <Tile key={i} value={value} selected={i === selected} />
      )}
    </div>
  )
}

// class App extends React.Component<AppProps, AppState> {
//   constructor(props: AppProps) {
//     super(props);
//     let tiles = [];
//     for (let i = 0; i < numTiles; {
//       tiles.push(randomElem(this.props.values));
//     }

//     this.state = {
//       tiles: tiles,
//       active: 0,
//       updateInterval: null,
//       activeInterval: null,
//       keyboardListener: null,
//       running: true
//     };
//   }

//   render = () =>
//     <div className={"Tiles"} onClick={this.handleClick.bind(this)}>
//       {this.state.tiles.map((_, index) => (
//         this.tile(index)
//       ))}
//     </div>

//   handleChangeTile() {
//     this.setState((state, props) => {
//       var i;
//       do {
//         i = randomIndex(state.tiles.length);
//       } while (i === state.active)


//       let value = randomElem(props.values);
//       let tiles = [...state.tiles];
//       tiles[i] = value;

//       return {tiles: tiles };
//     })
//   }

//   handleTileSelect() {
//     this.setState((state, props) => {
//       let active = randomIndex(state.tiles.length);

//       return {active: active };
//     })
//   }

//   handleClick(_: any) {
//     if (this.state.running) {
//       this.halt();
//     } else {
//       this.run();
//     }
//   }

//   componentDidMount() {
//     this.run();
//   }

//   componentWillUnmount() {
//     this.halt()
//   }

//   run() {
//     let updateInterval = setInterval(this.handleChangeTile.bind(this), 75);
//     let activeInterval = setInterval(this.handleTileSelect.bind(this), 150);
//     this.setState((_state, _props) => {
//       return {updateInterval: updateInterval, activeInterval: activeInterval, running: true };
//     })
//   }

//   halt() {
//     clearInterval(this.state.updateInterval);
//     clearInterval(this.state.activeInterval);
//     this.setState((_state, _props) => {
//       return {running: false }
//     })
//   }



//   tile(n: number) {
//     let visible = this.state.running || this.state.active === n;
//     let value = this.state.tiles[n];
//     let active = n === this.state.active;
//     let updating = false;
//     let won = (!this.state.running) && this.state.active === n;
//     return (<Tile key={n} value={value} active={active} updating={updating} visible={visible} won={won} />)
//   }
// }

export default Board;
