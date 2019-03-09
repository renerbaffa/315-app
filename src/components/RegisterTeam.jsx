import React, { useContext } from 'react'

import TeamContext from '../contexts/TeamContext'

function RegisterTeam() {
  const { team } = useContext(TeamContext)

  return <div><div>Registrar time</div></div>
}

export default RegisterTeam
