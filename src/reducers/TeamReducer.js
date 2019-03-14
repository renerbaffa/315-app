import { SET_TEAM_NAME, SET_NEW_PLAYER, EDIT_PLAYER } from '../constants/teamReducer'

import { setTeamOnLocalStorage, getTeamFromLocalStorage } from '../utils/localStorage'

const emptyPlayer = {
  name: '',
  nickname: '',
  number: '',
  age: '',
}

export default function TeamReducer(team, action) {
  switch (action.type) {
  case SET_TEAM_NAME:
    const name = action.payload
    // TODO: test if we still need the validation
    const localTeam = getTeamFromLocalStorage() || {}
    const newTeam = { ...localTeam, name }
    setTeamOnLocalStorage(newTeam)
    return newTeam
  case SET_NEW_PLAYER:
    const newPlayers = [...team.players]
    let id = 1
    if (newPlayers.length > 0) {
      id = newPlayers[newPlayers.length - 1].id + 1
    }
    newPlayers.push({ id, ...emptyPlayer })
    const newTeamWithPlayer = { ...team, players: newPlayers }
    setTeamOnLocalStorage(newTeamWithPlayer)
    return newTeamWithPlayer
  case EDIT_PLAYER:
    const newPlayersList = team.players.map(player => ({
      ...player,
      ...(player.id === action.payload.id && action.payload.props)
    }))
    const newTeamWithEditedPlayer = { ...team, players: newPlayersList }
    setTeamOnLocalStorage(newTeamWithEditedPlayer)
    return newTeamWithEditedPlayer
  default:
    return team
  }
}
