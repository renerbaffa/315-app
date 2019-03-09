import React, { useEffect } from 'react'

import TeamContext from '../contexts/TeamContext'

import useTeam from '../hooks/useTeam'

function TeamProvider(props) {
  const teamContext = useTeam()

  return (
    <TeamContext.Provider
      {...props}
      value={teamContext}
    />
  )
}

export default TeamProvider
