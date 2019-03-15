import React, { useContext } from 'react'
import { css } from 'emotion'

import GameContext from '../contexts/GameContext'
import TeamContext from '../contexts/TeamContext'
import sortPlayersByTShirtNumber from '../utils/players'

import field from '../../static/field.png'
import RoundButton from './RoundButton'

import allPositionsStyles from '../styles/playerPositions'

const containerStyle = css`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #717171;
`

const fieldStyle = css`
  background: url(${ field });
  background-size: contain;
  position: absolute;
  width: 100%;
  height: 90vh;
`

const benchStyle = css`
  position: absolute;
  width: 100%;
  height: 10vh;
  bottom: 0;
  display: flex;
  overflow-x: auto;
  align-items: center;
  .benchPlayer {
    margin: 0 5px;
  }
`

function Game() {
  const { team } = useContext(TeamContext)
  const { game } = useContext(GameContext)

  const playingPlayers = Object.keys(game).reduce((acc, position) => {
    const playerId = game[position]
    if (playerId) {
      const player = team.players.find(player => player.id === playerId)
      acc.push(player)
    }
    return acc
  }, [])

  const benchPlayers = team.players.filter(
    player => playingPlayers.findIndex(
      playingPlayer => playingPlayer && playingPlayer.id === player.id
    ) < 0
  )

  return (
    <div className={containerStyle}>
      <div className={fieldStyle} data-testid="field">
        {Object.keys(game).map(position => {
          const playerOnPosition = playingPlayers.find(
            playerOnField => playerOnField.id === game[position]
          )
          return (
            <RoundButton
              key={position}
              className={allPositionsStyles[position]}
              data-testid={position}
              text={playerOnPosition && playerOnPosition.number}
            />
          )
        })}
      </div>
      <div className={benchStyle} data-testid="bench">
        {benchPlayers.sort(sortPlayersByTShirtNumber).map(benchPlayer => (
          <div key={benchPlayer.id}>
            <RoundButton className="benchPlayer" text={benchPlayer.number} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Game
