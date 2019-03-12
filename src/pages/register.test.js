import React from 'react'
import { fireEvent, render } from 'react-testing-library'
import cases from 'jest-in-case'

import Register from './register'

import { navigate } from 'gatsby'

jest.mock('gatsby', () => ({
  navigate: jest.fn()
}))

const playerModel = {
  id: 1,
  name: 'player 1',
  nickname: 'nickname',
  age: '35',
  number: '1'
}

function getTeamFromLocalStorage() {
  return JSON.parse(window.localStorage.getItem('team'))
}

function setTeamOnLocalStorage({ name, players, numberOfPlayers }) {
  window.localStorage.setItem(
    'team',
    JSON.stringify({
      name,
      players: players || setPlayers(numberOfPlayers),
    })
  )
}

function setPlayers(numberOfPlayers = 0) {
  const players = []
  for (let count = 1; count <= numberOfPlayers; count++) {
    players.push({ ...playerModel, id: count, name: `player ${ count }` })
  }
  return players
}

function setup() {
  return render(<Register />)
}

beforeEach(() => {
  window.localStorage.clear()
  navigate.mockReset()
})

it.todo('should render the Register form correctly (snapshot)')

it.todo('should be able to edit team (when in the localStorage)')

it('should display an error when the team name is missing', () => {
  const { getByText } = setup()
  fireEvent.click(getByText(/salvar/i))
  expect(getByText(/Preencha o nome do time/i)).toBeInTheDocument()
})

it('should remove error on name after filling up the field', () => {
  const teamName = 'My Team'
  const { getByText, getByLabelText, queryByText } = setup()

  fireEvent.click(getByText(/salvar/i))
  expect(getByText(/Preencha o nome do time/i)).toBeInTheDocument()

  fireEvent.change(getByLabelText(/nome/i), {
    target: { value: teamName },
  })
  expect(queryByText(/Preencha o nome do time/i)).not.toBeInTheDocument()
  expect(getTeamFromLocalStorage().name).toBe(teamName)
})

it('should display option to register a new player', () => {
  const { getByText } = setup()
  expect(getByText(/\+/i)).toBeInTheDocument()
})

it('should show players error when there is no player', () => {
  const { getByText } = setup()

  fireEvent.click(getByText(/salvar/i))
  expect(getByText(/Mínimo: 9 jogadores/i)).toBeInTheDocument()
})

it('should create the first user when clicking on `+` and there is no players', () => {
  const { getByText, queryAllByTestId } = setup()
  fireEvent.click(getByText(/\+/i))
  expect(queryAllByTestId('player')).toHaveLength(1)
  expect(getTeamFromLocalStorage().players[0].id).toEqual(1)
})

it('should create a new user when clicking on `+` and there are more players', () => {
  setTeamOnLocalStorage({ name: 'My team', numberOfPlayers: 4 })
  const { getByText, queryAllByTestId } = setup()
  fireEvent.click(getByText(/\+/i))
  expect(queryAllByTestId('player')).toHaveLength(5)
  expect(getTeamFromLocalStorage().players[4].id).toEqual(5)
})

cases(`should be able edit a player's:`, ({ target, value, regex }) => {
  setTeamOnLocalStorage({ name: 'My team', numberOfPlayers: 4 })
  const { queryAllByLabelText } = setup()
  const item = queryAllByLabelText(regex).find(
    item => item.id === `player-${ target }-3`
  )
  fireEvent.change(item, { target: { value } })
  const itemInLocalStorage = getTeamFromLocalStorage().players.find(
    item => item.id === 3
  )
  expect(itemInLocalStorage[target]).toEqual(value)
}, [
  { name: 'name', regex: /Nome:/i, value: 'jogador2name', target: 'name' },
  { name: 'nickname', regex: /Apelido:/i, value: 'jogador2nickname', target: 'nickname' },
  { name: 'number', regex: /Número na camisa:/i, value: 'jogador2nickname', target: 'number' },
  { name: 'age', regex: /Idade:/i, value: 'jogador2age', target: 'age' },
])

it('should show error with the minimum number of players (9)', () => {
  const { getByText } = setup()

  fireEvent.click(getByText(/salvar/i))
  expect(getByText(/Mínimo: 9 jogadores/i)).toBeInTheDocument()
})

it('should redirect user to App when the form submitted is fine', () => {
  setTeamOnLocalStorage({ name: 'My team', numberOfPlayers: 9 })
  const { getByText } = setup()
  fireEvent.click(getByText(/salvar/i))
  expect(navigate).toHaveBeenCalledTimes(1)
})
