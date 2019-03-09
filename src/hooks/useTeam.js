import { useReducer } from 'react'

import TeamReducer from '../reducers/TeamReducer'

function init() {
  return JSON.parse(window.localStorage.getItem('team'))
}

function useTeam() {
  const [team, dispatch] = useReducer(TeamReducer, init())

  return { team }
}

export default useTeam
