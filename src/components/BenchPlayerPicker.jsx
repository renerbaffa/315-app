import React, { useContext, useState } from 'react'
import { css } from 'emotion'

import SubstitutionContext from '../contexts/SubstitutionContext'
import TeamContext from '../contexts/TeamContext'
import GameContext from '../contexts/GameContext'
import { getBenchPlayers, getPlayingPlayersTotalAge, getPlayingPlayers } from '../utils/players'

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
    button {
      border: 1px solid black;
      background-color: white;
      padding: 8px;
      font-size: 16px;
    }
    button:last-child {
      margin-left: 12px;
    }
  }
`

function BenchPlayerPicker() {
  const { team } = useContext(TeamContext)
  const { game, setPlayerInPosition } = useContext(GameContext)
  const { open, positionToSubstitute, setState } = useContext(SubstitutionContext)
  const [selectedPlayer, setSelectedPlayer] = useState(null)

  if (!open) return null

  const benchPlayers = getBenchPlayers({ team, game })
  const totalAge = getPlayingPlayersTotalAge({ team, game })
  let leavingPlayer
  let newTotalAge = Number.parseInt(totalAge)
  if (selectedPlayer) {
    newTotalAge += Number.parseInt(selectedPlayer.age)
  }
  if (positionToSubstitute && game[positionToSubstitute]) {
    const playingPlayers = getPlayingPlayers({ game, team })
    const playerOnPosition = playingPlayers.find(
      playerOnField => playerOnField.id === game[positionToSubstitute]
    )
    leavingPlayer = playerOnPosition
    newTotalAge -= Number.parseInt(playerOnPosition.age)
  }

  function reset() {
    setSelectedPlayer(null)
    setState({ open: false, positionToSubstitute: null })
  }

  return (
    <div className={modalStyle} role="modal">
      <div className={modalContent}>
        <div className="title">
          <h2>Idade:</h2>
          <h2>
            <span>{totalAge}</span>
            {selectedPlayer && (
              <span className={css`color: green; padding-left: 2px;`}>
                + {selectedPlayer.age}
              </span>
            )}
            {leavingPlayer && (
              <span className={css`color: red; padding-left: 2px;`}>
                - {leavingPlayer.age}
              </span>
            )}
            {(selectedPlayer || positionToSubstitute) && (
              <span className={css`padding-left: 2px;`}>
                = {newTotalAge}
              </span>
            )}
          </h2>
        </div>
        <div className="list">
          {benchPlayers.map(player =>
            <PlayerItem
              key={`player-item-${ player.id }`}
              isSelected={!!selectedPlayer && player.id === selectedPlayer.id}
              {...player}
              onClick={() => setSelectedPlayer(player)}
            />
          )}
        </div>
        <div className="action">
          <button onClick={reset}>Cancelar</button>
          <button
            onClick={() => {
              setPlayerInPosition(positionToSubstitute, selectedPlayer.id)
              reset()
            }}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}

export default BenchPlayerPicker
