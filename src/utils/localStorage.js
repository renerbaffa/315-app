export function setTeamOnLocalStorage(item) {
  window.localStorage.setItem('team', JSON.stringify(item))
}

export function getTeamFromLocalStorage() {
  return JSON.parse(window.localStorage.getItem('team'))
}
