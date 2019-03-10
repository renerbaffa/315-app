import React, { useContext } from 'react'

import TeamContext from '../contexts/TeamContext'

function PlayersForm() {
  const { team } = useContext(TeamContext)
  console.log(team)
  return (
    <form>

    </form>
  )
}

export default PlayersForm
