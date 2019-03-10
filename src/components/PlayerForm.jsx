import React, { useContext } from 'react'
import { css } from 'emotion'

import TeamContext from '../contexts/TeamContext'

import Input from './Input'

const playerStyle = css`
  box-shadow: rgba(0,0,0,0.1) 0px 0px 3px;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(211,211,211);
  padding: 5px 10px;
  margin-left: 4px;
  font-size: 18px;
  margin-top: 12px;
`

function PlayerForm({ id, name, nickname, number, age, error, ...props }) {
  const { editPlayerById } = useContext(TeamContext)

  return (
    <div data-testid="player" className={playerStyle} {...props}>
      <label htmlFor={`player-name-${ id }`}>Nome:</label>
      <Input
        id={`player-name-${ id }`}
        onChange={event => editPlayerById(id, { name: event.target.value })}
        placeholder="Nome"
        type="text"
        value={name}
      />
      <label htmlFor={`player-nickname-${ id }`}>Apelido:</label>
      <Input
        id={`player-nickname-${ id }`}
        onChange={event => editPlayerById(id, { nickname: event.target.value })}
        placeholder="Apelido"
        type="text"
        value={nickname}
      />
      <label htmlFor={`player-number-${ id }`}>Número na camisa:</label>
      <Input
        id={`player-number-${ id }`}
        onChange={event => editPlayerById(id, { number: event.target.value })}
        placeholder="Número"
        type="text"
        value={number}
      />
      <label htmlFor={`player-age-${ id }`}>Idade:</label>
      <Input
        id={`player-age-${ id }`}
        onChange={event => editPlayerById(id, { age: event.target.value })}
        placeholder="Idade"
        type="text"
        value={age}
      />
      {error && <Error text={error} />}
    </div>
  )
}

export default PlayerForm
