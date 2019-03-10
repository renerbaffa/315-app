import React from 'react'

import RegisterTeam from '../screens/RegisterTeam'
import TeamProvider from '../providers/TeamProvider'

function Regsiter() {
  return <TeamProvider><RegisterTeam /></TeamProvider>
}

export default Regsiter
