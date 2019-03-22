import React from 'react'
import {
  cleanup,
  render,
  getByText,
  queryByText,
  getByTestId as originalGetByTestid, // @TODO: to remove
  fireEvent
} from 'react-testing-library'

import Main from './index'
import { selectedStyle } from '../components/PlayerItem'

import { setTeamOnLocalStorage } from '../utils/tests/team'
import { getGameFromLocalStorage, setGmaeOnLocalStorage } from '../utils/tests/game'

function setup(shoudSetupPlayersOnField = false) {
  setTeamOnLocalStorage({ name: 'team', numberOfPlayers: 14 })
  if (shoudSetupPlayersOnField) {
    setGmaeOnLocalStorage({
      attackingMidFielder1: 12, // shirt 3
      defensiveMidFielder1: 5, // shirt 10
      leftBack: 10, // shirt 5
      goalKeeper: 13, // shirt 2
    })
  }
  return render(<Main />)
}

beforeEach(() => {
  window.localStorage.clear()
  cleanup()
})

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

it('should highlight (as green) selected player to enter', () => {
  const { getByTestId, getByRole } = setup()
  fireEvent.click(getByTestId('defense'))
  const modal = getByRole('modal')
  fireEvent.click(getByText(modal, 'nickname 13'))
  const player = getByTestId('13')
  expect(player).toHaveClass(selectedStyle)
})

it('should sum up the age of selected player to enter', () => {
  const { getByTestId, getByRole, debug } = setup()
  fireEvent.click(getByTestId('defense'))
  const modal = getByRole('modal')
  fireEvent.click(getByText(modal, 'nickname 13'))
  expect(getByText(modal, /\+ 35/i)).toBeInTheDocument()
  expect(getByText(modal, /= 35/i)).toBeInTheDocument()
})

it('should not decrease the total age position is empty', () => {
  const { getByTestId, getByRole } = setup(true)
  fireEvent.click(getByTestId('defense'))
  const modal = getByRole('modal')
  fireEvent.click(getByText(modal, 'nickname 8'))
  expect(getByText(modal, '140')).toBeInTheDocument()
  expect(queryByText(modal, '=')).not.toBeInTheDocument()
})

it('should decrease the age of player to get out according to selected position', () => {
  const { getByTestId, getByRole } = setup(true)
  fireEvent.click(getByTestId('goalKeeper'))
  const modal = getByRole('modal')
  expect(getByText(modal, /- 35/i)).toBeInTheDocument()
  expect(getByText(modal, /= 105/i)).toBeInTheDocument()
})

it('should be possible to save changes', () => {
  const { getByTestId, getByRole, queryByRole } = setup(true)
  fireEvent.click(getByTestId('defense'))
  const modal = getByRole('modal')
  fireEvent.click(getByText(modal, 'nickname 8'))
  fireEvent.click(getByText(modal, 'Salvar'))
  expect(queryByRole('modal')).not.toBeInTheDocument()
  expect(getByText(getByTestId('defense'), /7/i)).toBeInTheDocument()
  expect(getGameFromLocalStorage().defense).toBe(8)
})

it.todo('should reflect the changes into the position and total age')
