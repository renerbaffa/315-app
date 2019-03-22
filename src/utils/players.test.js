import cases from 'jest-in-case'

import { sortPlayersByTShirtNumber } from './players'

const p1 = {
  id: 1,
  number: 1
}

const p2 = {
  id: 2,
  number: 2
}

const p3 = {
  id: 3,
  number: 3
}

const p4 = {
  id: 4,
  number: 4
}

const p5 = {
  id: 5,
  number: 5
}

const p6 = {
  id: 6,
  number: 6
}

const p7 = {
  id: 7,
  number: 7
}

const expectedOrder = [p1, p2, p3, p4, p5, p6, p7]

cases('it should sort the players', ({ players, assertionOrder = expectedOrder }) => {
  expect(players.sort(sortPlayersByTShirtNumber)).toEqual(assertionOrder)
}, [
  { players: [p1, p2, p3, p4, p5, p6, p7] },
  { players: [p7, p6, p5, p4, p3, p2, p1] },
  { players: [p5, p4, p7, p2, p3, p1, p6] },
  { players: [p6, p5, p2, p1, p4, p7, p3] },
  { players: [p1, p2, p1], assertionOrder: [p1, p1, p2] },
])
