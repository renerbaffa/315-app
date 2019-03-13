import React from 'react'
import { css } from 'emotion'

import field from '../../static/field.png'

import RoundButton from './RoundButton'

import {
  striker,
  attackingMidFielder1,
  attackingMidFielder2,
  defensiveMidFielder1,
  defensiveMidFielder2,
  leftBack,
  defense,
  rightBack,
  goalKeeper
} from '../styles/playerPositions'

const containerStyle = css`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #0c8011;
`

const fieldStyle = css`
  background: url(${ field });
  background-size: contain;
  position: absolute;
  width: 100%;
  height: 90vh;
`

function Game() {
  return (
    <div className={containerStyle}>
      <div className={fieldStyle}>
        <RoundButton
          className={striker}
          data-testid="striker"
        />
        <RoundButton
          className={attackingMidFielder1}
          data-testid="attackingMidFielder1"
        />
        <RoundButton
          className={attackingMidFielder2}
          data-testid="attackingMidFielder2"
        />
        <RoundButton
          className={defensiveMidFielder1}
          data-testid="defensiveMidFielder1"
        />
        <RoundButton
          className={defensiveMidFielder2}
          data-testid="defensiveMidFielder2"
        />
        <RoundButton
          className={leftBack}
          data-testid="leftBack"
        />
        <RoundButton
          className={defense}
          data-testid="defense"
        />
        <RoundButton
          className={rightBack}
          data-testid="rightBack"
        />
        <RoundButton
          className={goalKeeper}
          data-testid="goalKeeper"
        />
      </div>
    </div>
  )
}

export default Game
