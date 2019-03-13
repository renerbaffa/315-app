export const playerModel = {
  id: 1,
  name: 'player 1',
  nickname: 'nickname',
  age: '35',
  number: '1'
}

export function getPlayers(numberOfPlayers = 0) {
  const players = []
  for (let count = 1; count <= numberOfPlayers; count++) {
    players.push({ ...playerModel, id: count, name: `player ${ count }` })
  }
  return players
}
