import { getPlayers } from './player'

export function getTeamFromLocalStorage() {
  return JSON.parse(window.localStorage.getItem('team'))
}

export function setTeamOnLocalStorage({ name, players, numberOfPlayers }) {
  window.localStorage.setItem(
    'team',
    JSON.stringify({
      name,
      players: players || getPlayers(numberOfPlayers),
    })
  )
}
