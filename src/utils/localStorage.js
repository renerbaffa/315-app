export function setTeamOnLocalStorage(team) {
  /* istanbul ignore next: if is a workaround for gatsby to break during build */
  if (typeof window !== `undefined`) {
    window.localStorage.setItem('team', JSON.stringify(team))
  }
}

export function getTeamFromLocalStorage() {
  /* istanbul ignore next: if is a workaround for gatsby to break during build */
  if (typeof window !== `undefined`) {
    return JSON.parse(window.localStorage.getItem('team'))
  } else {
    return { players: [] }
  }
}

export function setGameOnLocalStorage(game) {
  /* istanbul ignore next: if is a workaround for gatsby to break during build */
  if (typeof window !== `undefined`) {
    window.localStorage.setItem('game', JSON.stringify(game))
  }
}

export function getGameFromLocalStorage() {
  /* istanbul ignore next: if is a workaround for gatsby to break during build */
  if (typeof window !== `undefined`) {
    return JSON.parse(window.localStorage.getItem('game'))
  } else {
    return {}
  }
}
