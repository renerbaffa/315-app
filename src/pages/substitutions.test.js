import React from 'react'
import {
  render,
  getByText,
  queryByText, // @TODO: to remove
  getByTestId as originalGetByTestid, // @TODO: to remove
  fireEvent
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

function setup(shouldSetupBench = false) {
  if (shouldSetupBench) {
    setTeamOnLocalStorage({ name: 'team', numberOfPlayers: 14 })
    setGmaeOnLocalStorage({
      attackingMidFielder1: 12, // shirt 3
      defensiveMidFielder1: 5, // shirt 10
      leftBack: 10, // shirt 5
      goalKeeper: 13, // shirt 2
    })
  }
  return render(<Main />)
}

it('should not render the player modal by default', () => {
  const { queryByRole } = setup()
  expect(queryByRole('modal')).not.toBeInTheDocument()
})

it('should render the player modal when user clicks in a empty position on the field', () => {
  const { getByTestId, getByRole } = setup(true)
  fireEvent.click(getByTestId('defense'))
  expect(getByRole('modal')).toBeInTheDocument()
})

it('should render the list of players in the bench inside the modal', () => {
  const { getByTestId, getByRole } = setup(true)
  fireEvent.click(getByTestId('defense'))
  const modal = getByRole('modal')
  const expectedBenchPlayers = [1, 4, 6, 7, 8, 9, 11, 12, 13, 14]
  expectedBenchPlayers.forEach(playerNumber => {
    expect(getByText(modal, `nickname ${ 14 - playerNumber + 1 }`))
    expect(getByText(modal, `#${ playerNumber }`))
    expect(getByText(modal, `35 anos`))
  })
})

it('should close the modal when user clicks on `Cancel` button', () => {
  const { getByTestId, queryByRole, getByText } = setup(true)
  fireEvent.click(getByTestId('defense'))
  fireEvent.click(getByText(/Cancelar/i))
  expect(queryByRole('modal')).not.toBeInTheDocument()
})

it.todo('should display in red the current player to be substituted')
it.todo('should display current player if the position is empty')

it.todo('should highlight (as green) selected player to enter')
it.todo('should sum up the age of selected player to enter')

it.todo('should not decrease the total age position is empty')
it.todo('should decrease the of player to get out when according to selected position')

it.todo('should be possible to save changes') // validate the localStorage
it.todo('should reflect the changes into the position and total age')

it.todo('REMOVE ALL COMMENTS')
