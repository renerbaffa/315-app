import React from 'react'
import {
  render,
  getByTestId as originalGetByTestid
} from 'react-testing-library'
import cases from 'jest-in-case'

import Main from './index'

import { getPlayers } from '../utils/tests/player'
import { setTeamOnLocalStorage } from '../utils/tests/team'
import { navigate } from 'gatsby'
import { setGmaeOnLocalStorage } from '../utils/tests/game'

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}))

const positions = [
  'striker',
  'attackingMidFielder1',
  'attackingMidFielder2',
  'defensiveMidFielder1',
  'defensiveMidFielder2',
  'leftBack',
  'defense',
  'rightBack',
  'goalKeeper'
]

function setupBench() {
  setTeamOnLocalStorage({ name: 'team', numberOfPlayers: 14 })
  setGmaeOnLocalStorage({
    attackingMidFielder1: 12, // shirt 3
    defensiveMidFielder1: 5, // shirt 10
    leftBack: 10, // shirt 5
    goalKeeper: 13, // shirt 2
  })
}

function setup() {
  return render(<Main />)
}

beforeEach(() => {
  window.localStorage.clear()
  navigate.mockReset()
})

cases('it should redirect to register when', ({ team = null }) => {
  window.localStorage.setItem('team', JSON.stringify(team))
  setup()
  expect(navigate).toHaveBeenCalled()
}, [
  { name: 'there is no team on localStorage' },
  { name: 'there is no player on team', team: {} },
  { name: 'team has 0 player', team: { players: getPlayers(0) } },
  { name: 'team has 1 player', team: { players: getPlayers(1) } },
  { name: 'team has 2 player', team: { players: getPlayers(2) } },
  { name: 'team has 7 players', team: { players: getPlayers(7) } },
  { name: 'team has 8 players', team: { players: getPlayers(8) } },
])

it('should render app when team info is on localStorage and it has at least 9 players', () => {
  setTeamOnLocalStorage({ name: 'team', numberOfPlayers: 9 })
  const { queryByText } = setup()
  expect(queryByText(/registrar time/i)).not.toBeInTheDocument()
})

it('should render all the 9 positions in the field', () => {
  setTeamOnLocalStorage({ name: 'team', numberOfPlayers: 9 })
  const { getByTestId } = setup()
  positions.forEach(position => expect(getByTestId(position)).toBeInTheDocument())
})

it('should render the players number in its correct position and `+` for empty positions', () => {
  setupBench()
  const { getByTestId } = setup()
  const container = getByTestId('field')
  expect(originalGetByTestid(container, /attackingMidFielder1/i)).toHaveTextContent(3)
  expect(originalGetByTestid(container, /defensiveMidFielder1/i)).toHaveTextContent(10)
  expect(originalGetByTestid(container, /leftBack/i)).toHaveTextContent(5)
  expect(originalGetByTestid(container, /goalKeeper/i)).toHaveTextContent(2)

  expect(originalGetByTestid(container, /striker/i)).toHaveTextContent('+')
  expect(originalGetByTestid(container, /attackingMidFielder2/i)).toHaveTextContent('+')
  expect(originalGetByTestid(container, /defensiveMidFielder2/i)).toHaveTextContent('+')
  expect(originalGetByTestid(container, /defense/i)).toHaveTextContent('+')
  expect(originalGetByTestid(container, /rightBack/i)).toHaveTextContent('+')
})

it('should render total amount of ages for all palyers in field correctly', () => {
  setupBench()
  const { getByTestId } = setup()
  expect(getByTestId('age')).toHaveTextContent('140')
})
