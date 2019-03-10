import React, { useContext } from 'react'
import { css } from 'emotion'

import RegisterTeam from './RegisterTeam'
import TeamContext from '../contexts/TeamContext'

function SplashScreen() {
  const { team } = useContext(TeamContext)

  let content = <div>App...</div>

  if (!team || !team.players || team.players.length < 9) {
    content = <RegisterTeam />
  }

  return (
    <div className={css`font-family: system-ui;`}>
      {content}
    </div>
  )
}

export default SplashScreen
