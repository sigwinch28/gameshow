import React from 'react';
import './App.css';
import Settings from './Settings';
import Board from './Board';
import * as InitialState from './InitialState';
import { useLocalStorage } from '@rehooks/local-storage';


type AppProps = {};

const findList = (id: string, lists: [string, string[]][]) => {
  let i = lists.findIndex(([name, _]) => id === name)
  if (i >= 0) {
    return lists[i][1]
  }
}


const App: React.FC<AppProps> = () => {
  const [active, setActive] = useLocalStorage<string | undefined>("active", InitialState.active());
  const [lists, setLists] = useLocalStorage<[string, string[]][]>("lists", InitialState.lists());

  const [settingsPage, setSettingsPage] = React.useState<boolean>(false);
  const settingsClassName = React.useMemo(() => settingsPage ? "Active" : "", [settingsPage])

  const activeValues = React.useMemo(() => {
    if (active) {
      return findList(active, lists)
    }
  }, [active, lists])

  const listTitle = React.useMemo(() => active ? active : "thing", [active])

  const onSettingsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSettingsPage(!settingsPage)
  }

  const onReset = () => {
    if (window.confirm("Reset?")) {
      setLists(InitialState.lists());
      setActive(InitialState.active());
    }
  }

  const onSave = (id: string, values: string[]) => {
    let newLists = [...lists]
    let i = lists.findIndex((entry) => entry[0] === id)
    if (i >= 0) {
      newLists[i] = [id, values]
    } else {
      newLists.push([id, values])
    }
    setLists(newLists)
  }

  const onDelete = (id: string) => {
    if (window.confirm(`Delete ${id}?`)) {
      let i = lists.findIndex((entry) => entry[0] === id)
      if (i >= 0) {
        let newLists = new Array();
        newLists.splice(i)
        setLists(newLists)


        if (active === id) {
          setActive(undefined)
        }
      }
    }
  }

  const onActivate = (id: string) => {
    let i = lists.findIndex((entry) => entry[0] === id)
    if (i >= 0) {
      setActive(id)
    }
  }

  let component;
  if (settingsPage) {
    component = <Settings
      active={active}
      lists={lists}
      onSave={onSave}
      onDelete={onDelete}
      onActivate={onActivate}
      onReset={onReset}
    />
  } else {
    if (activeValues) {
      component = <Board numTiles={9} values={activeValues} />
    } else {
      component = <div>no values</div>
    }
  }

  return (
    <div id="App">
      <header id="Header">
        Super Duper Random {listTitle} Picker
      </header>
      <button onClick={onSettingsClick} id="SettingsLink" className={settingsClassName}>Settings</button>
      {component}
    </div>
  )
}

export default App;
