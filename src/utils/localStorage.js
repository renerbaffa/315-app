export function setTeamOnLocalStorage(team) {
  window.localStorage.setItem('team', JSON.stringify(team))
}

export function getTeamFromLocalStorage() {
  return JSON.parse(window.localStorage.getItem('team'))
}

export function setGameOnLocalStorage(game) {
  window.localStorage.setItem('game', JSON.stringify(game))
}

export function getGameFromLocalStorage() {
  return JSON.parse(window.localStorage.getItem('game'))
}
