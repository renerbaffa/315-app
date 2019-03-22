export function getPlayingPlayers({ game, team }) {
  return Object.keys(game).reduce((acc, position) => {
    const playerId = game[position]
    if (playerId) {
      const player = team.players.find(player => player.id === playerId)
      acc.push(player)
    }
    return acc
  }, [])
}

export function getBenchPlayers({ game, team }) {
  const playingPlayers = getPlayingPlayers({ game, team })

  return team.players.filter(
    player => playingPlayers.findIndex(
      playingPlayer => playingPlayer && playingPlayer.id === player.id
    ) < 0
  )
}

export function getPlayingPlayersTotalAge({ game, team }) {
  return Object.keys(game).reduce((acc, position) => {
    let ageToSum = 0
    const playerId = game[position]
    if (playerId) {
      const player = team.players.find(player => player.id === playerId)
      ageToSum = Number.parseInt(player.age)
    }
    return acc + ageToSum
  }, 0)
}

export function sortPlayersByTShirtNumber(a, b) {
  const numA = Number.parseInt(a.number)
  const numB = Number.parseInt(b.number)
  if (numA < numB) {
    return -1
  }
  if (numA > numB) {
    return 1
  }
  return 0
}
