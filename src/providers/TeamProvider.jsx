import React from 'react'
import { css } from 'emotion'

import TeamContext from '../contexts/TeamContext'

import useTeam from '../hooks/useTeam'

function TeamProvider(props) {
  const teamContext = useTeam()

  return (
    <div className={css`font-family: system-ui;`}>
      <TeamContext.Provider
        {...props}
        value={teamContext}
      />
    </div>
  )
}

export default TeamProvider
