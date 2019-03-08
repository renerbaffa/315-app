import React, { useState } from 'react'

import Loader from './Loader'

import useTeam from '../hooks/useTeam'

function SplashScreen() {
  const [team] = useTeam()
  console.log('%cteam', 'background: green; color: white;', team)

  return <Loader />
}

export default SplashScreen
