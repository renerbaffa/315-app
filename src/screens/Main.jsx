import React, { useContext } from 'react'
import { navigate } from 'gatsby'

import TeamContext from '../contexts/TeamContext'

import Game from '../components/Game'

import BenchPlayerPicker from '../components/BenchPlayerPicker'

function App() {
  const { team } = useContext(TeamContext)

  if (!team || !team.players || team.players.length < 9) {
    /* istanbul ignore next */
    if (typeof window !== `undefined`) {
      navigate('/register')
    }
  } else {
    return (
      <>
        <Game />
        <BenchPlayerPicker />
      </>
    )
  }

  return <div>Loading ...</div>
}

export default App
