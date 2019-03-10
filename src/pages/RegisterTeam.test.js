import React from 'react'
import { fireEvent, render } from 'react-testing-library'

import App from './index'

function setup() {
  return render(<App />)
}

beforeEach(() => {
  window.localStorage.clear()
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
  expect(JSON.parse(window.localStorage.getItem('team')).name).toBe(teamName)
})

it('should show players error when there is no player', () => {
  const { getByText, getByLabelText, queryByText } = setup()

  fireEvent.click(getByText(/salvar/i))
  expect(getByText(/Mínimo: 9 jogadores/i)).toBeInTheDocument()
})

it.only('should show error with the minimum number of players (9)', () => {
  const { getByText, getByLabelText, queryByText } = setup()

  fireEvent.click(getByText(/salvar/i))
  expect(getByText(/Mínimo: 9 jogadores/i)).toBeInTheDocument()
})
