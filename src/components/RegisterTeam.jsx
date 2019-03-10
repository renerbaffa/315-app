import React, { useContext, useState } from 'react'
import { css } from 'emotion'

import TeamContext from '../contexts/TeamContext'

import PlayersForm from './PlayersForm'
import Input from './Input'
import Error from './Error'

const formStyle = css`
  label {
    font-size: 18px;
  }
`

function RegisterTeam() {
  const { team, setTeamName } = useContext(TeamContext)
  const [error, setError] = useState({})

  function handleSubmit(event) {
    event.preventDefault()

    let newError = {}

    if (!team || !team.name) {
      newError = { ...newError, name: 'Preencha o nome do time' }
    }

    if (!team || !team.players || team.players.length < 9) {
      newError = { ...newError, players: 'Mínimo: 9 jogadores' }
    }

    setError(newError)
    // e.target.elements.username.value.trim()
  }

  return (
    <form onSubmit={handleSubmit} css={formStyle}>
      <h1>Registrar time</h1>
      <div>
        <label htmlFor="name">Nome:</label>
        <Input
          name="name"
          id="name"
          type="text"
          placeholder="Nome do time"
          error="sss"
          onChange={event => {
            setTeamName(event.target.value)
            if (event.target.value.trim()) {
              setError(({ name, ...error }) => ({ ...error }))
            }
          }}
          value={(team && team.name) || ''}
        />
        {error.name && <Error text={error.name} />}
      </div>
      <PlayersForm />
      {error.players && <Error text={error.players} />}
      <button type="submit">Salvar</button>
    </form>
  )
}

export default RegisterTeam
