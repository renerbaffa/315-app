import React from 'react'
import { render } from 'react-testing-library'
import cases from 'jest-in-case'

import Main from './index'

import { navigate } from 'gatsby'

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}))

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
  { name: 'team has 0 player', team: { players: [] } },
  { name: 'team has 1 player', team: { players: [1] } },
  { name: 'team has 2 player', team: { players: [1, 2] } },
  { name: 'team has 7 players', team: { players: [1, 2, 3, 4, 5, 6, 7] } },
  { name: 'team has 8 players', team: { players: [1, 2, 3, 4, 5, 6, 7, 8] } },
])

it('should render app when team info is on localStorage and it has at least 9 players', () => {
  window.localStorage.setItem(
    'team',
    JSON.stringify({ players: [1, 2, 3, 4, 5, 6, 7, 8, 9] })
  )
  const { queryByText, getByText } = setup()
  expect(queryByText(/registrar time/i)).not.toBeInTheDocument()
  expect(getByText(/app.../i)).toBeInTheDocument()
})