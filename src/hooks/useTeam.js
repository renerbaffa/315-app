import { useReducer } from 'react'

import TeamReducer from '../reducers/TeamReducer'

import { SET_TEAM_NAME } from '../constants/teamReducer'

function init() {
  return JSON.parse(window.localStorage.getItem('team'))
}

function useTeam() {
  const [team, dispatch] = useReducer(TeamReducer, init())

  function setTeamName(name) {
    dispatch({ type: SET_TEAM_NAME, payload: name })
  }

  return { team, setTeamName }
}

export default useTeam
