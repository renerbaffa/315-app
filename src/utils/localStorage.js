export function setTeamOnLocalStorage(item) {
  localStorage.setItem('team', JSON.stringify(item))
}

export function getTeamFromLocalStorage() {
  return JSON.parse(localStorage.getItem('team'))
}
