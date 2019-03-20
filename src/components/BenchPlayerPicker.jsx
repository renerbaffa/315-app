import React, { useContext } from 'react'
import { css } from 'emotion'

import SubstitutionContext from '../contexts/SubstitutionContext'
import TeamContext from '../contexts/TeamContext'
import GameContext from '../contexts/GameContext'
import { getBenchPlayers } from '../utils/players'

import PlayerItem from './PlayerItem'

const modalStyle = css`
  background-color: white;
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
`

const modalContent = css`
  width: 82%;
  height: 86%;
  margin-left: 5%;
  margin-top: 8%;
  background-color: white;
  padding: 18px;
  .title {
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .list {
    overflow-y: auto;
    height: 80%;
  }
  .action {
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
`

function BenchPlayerPicker() {
  const { team } = useContext(TeamContext)
  const { game } = useContext(GameContext)
  const { open, toggleDialog } = useContext(SubstitutionContext)

  if (!open) return null

  const benchPlayers = getBenchPlayers({ team, game })

  return (
    <div className={modalStyle} role="modal">
      <div className={modalContent}>
        <div className="title">
          <h2>Idade total:</h2>
          <h2>322</h2>
        </div>
        <div className="list">
          {benchPlayers.map(player =>
            <PlayerItem
              key={`player-item-${ player.id }`}
              {...player}
              // @TODO: onClick={() => selectPlayer}
            />
          )}
        </div>
        <div className="action">
          <button>Salvar</button>
          <button onClick={() => toggleDialog(false)}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}

export default BenchPlayerPicker
