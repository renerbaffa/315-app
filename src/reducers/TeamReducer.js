import { SET_TEAM_NAME } from '../constants/teamReducer'

export default function TeamReducer(team, action = {}) {
  switch (action.type) {
  case SET_TEAM_NAME:
    const name = action.payload
    const team = JSON.parse(window.localStorage.getItem('team')) || {}
    const newTeam = { ...team, name }
    window.localStorage.setItem('team', JSON.stringify(newTeam))
    return newTeam
  default:
    return team
  }
}
