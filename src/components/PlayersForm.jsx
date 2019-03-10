import React, { useContext } from 'react'
import { css } from 'emotion'

import TeamContext from '../contexts/TeamContext'

import PlayerForm from './PlayerForm'

const buttonStyle = css`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 8px 0;
  button {
    font-size: 18px;
  }
`

const formStyle = css`
  font-family: system-ui;
  font-size: 18px;
`

function PlayersForm() {
  const { team, setNewPlayer } = useContext(TeamContext)

  return (
    <>
      <h3>Jogadores</h3>
      <div className={formStyle}>
        {team.players.map(player => <PlayerForm key={player.id} {...player} />)}
        <div className={buttonStyle}>
          <button
            onClick={event => {
              event.preventDefault()
              setNewPlayer()
            }}
          >
          +
          </button>
        </div>
      </div>
    </>
  )
}

export default PlayersForm
