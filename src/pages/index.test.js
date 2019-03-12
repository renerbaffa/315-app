import React from 'react'
import { render } from 'react-testing-library'
import cases from 'jest-in-case'

import Main from './index'

import { getPlayers } from '../utils/tests/player'
import { setTeamOnLocalStorage } from '../utils/tests/team'
import { navigate } from 'gatsby'

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
