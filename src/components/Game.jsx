import React, { useContext } from 'react'
import { css } from 'emotion'

import GameContext from '../contexts/GameContext'
import TeamContext from '../contexts/TeamContext'
import SubstitutionContext from '../contexts/SubstitutionContext'
import { getPlayingPlayers, getPlayingPlayersTotalAge } from '../utils/players'

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
  height: 100%;
`

const totalAgeStyle = css`
  position: absolute;
  bottom: 5px;
  right: 10px;
  color: white;
  font-size: 60px;
  -webkit-text-stroke: 2px #444444;
  font-weight: bold;
`

function Game() {
  const { team } = useContext(TeamContext)
  const { game } = useContext(GameContext)
  const { setState } = useContext(SubstitutionContext)

  function handlePositionClick(position) {
    setState({ open: true, positionToSubstitute: position })
  }

  const playingPlayers = getPlayingPlayers({ game, team })
  const totalAge = getPlayingPlayersTotalAge({ game, team })

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
              onClick={() => handlePositionClick(position)}
            />
          )
        })}
        <div className={totalAgeStyle} data-testid="age">{totalAge}</div>
      </div>
    </div>
  )
}

export default Game
