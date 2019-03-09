import React, { useContext } from 'react'

import RegisterTeam from './RegisterTeam'
import TeamContext from '../contexts/TeamContext'

function SplashScreen() {
  const { team } = useContext(TeamContext)

  if (!team || !team.players || team.players.length < 9) {
    return <RegisterTeam />
  }

  return <div>App...</div>
}

export default SplashScreen
