import React, { useContext } from 'react'
import { navigate } from 'gatsby'

import TeamContext from '../contexts/TeamContext'

function App() {
  const { team } = useContext(TeamContext)

  if (!team || !team.players || team.players.length < 9) {
    if (typeof window !== `undefined`) {
      navigate('/register')
    }
  } else {
    return (
      <div>App...</div>
    )
  }

  return <div>Loading ...</div>
}

export default App
