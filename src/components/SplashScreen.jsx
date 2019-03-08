import React, { useState } from 'react'

import useTeam from '../hooks/useTeam'

import RegisterTeam from './RegisterTeam'

function SplashScreen() {
  const [team] = useTeam()

  if (!team || !team.players || team.players.length < 9) {
    return <RegisterTeam />
  }

  return <div>App...</div>
}

export default SplashScreen
