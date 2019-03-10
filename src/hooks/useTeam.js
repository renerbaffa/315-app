import { useReducer } from 'react'

import TeamReducer from '../reducers/TeamReducer'

import { SET_TEAM_NAME, SET_NEW_PLAYER, EDIT_PLAYER } from '../constants/teamReducer'
import { setTeamOnLocalStorage } from '../utils/localStorage'

function init() {
  let team = JSON.parse(window.localStorage.getItem('team'))
  if (!team) {
    team = { name: '', players: [] }
    setTeamOnLocalStorage(team)
  }
  return team
}

function useTeam() {
  const [team, dispatch] = useReducer(TeamReducer, init())

  function setTeamName(name) {
    dispatch({ type: SET_TEAM_NAME, payload: name })
  }

  function setNewPlayer() {
    dispatch({ type: SET_NEW_PLAYER })
  }

  function editPlayerById(id, props) {
    dispatch({ type: EDIT_PLAYER, payload: { id, props } })
  }

  return { team, setTeamName, setNewPlayer, editPlayerById }
}

export default useTeam
