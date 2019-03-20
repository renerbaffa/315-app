import React from 'react'
import { css } from 'emotion'

const playerItemStyle = css`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 0;
  .first {
    width: 60%;
  }
  .second {
    width: 20%;
  }
  .third {
    width: 20%;
    text-align: right;
  }
`

function PlayerItem({ nickname, number, age, onClick }) {
  return (
    <div className={playerItemStyle} onClick={onClick}>
      <div className="first">{nickname}</div>
      <div className="second">{`#${ number }`}</div>
      <div className="third">{`${ age } anos`}</div>
    </div>
  )
}

export default PlayerItem
