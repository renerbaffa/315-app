export function getGameFromLocalStorage() {
  return JSON.parse(window.localStorage.getItem('game'))
}

export function setGmaeOnLocalStorage(game) {
  window.localStorage.setItem('game', JSON.stringify({
    striker: null,
    attackingMidFielder1: null,
    attackingMidFielder2: null,
    defensiveMidFielder1: null,
    defensiveMidFielder2: null,
    leftBack: null,
    defense: null,
    rightBack: null,
    goalKeeper: null,
    ...game,
  }))
}
