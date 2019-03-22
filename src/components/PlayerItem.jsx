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

export const selectedStyle = css`
  background-color: green;
  color: white;
`

function PlayerItem({ id, nickname, number, age, onClick, isSelected }) {
  const classNames = [playerItemStyle]
  if (isSelected) {
    classNames.push(selectedStyle)
  }
  return (
    <div className={classNames.join(' ')} onClick={onClick} data-testid={id}>
      <div className="first">{nickname}</div>
      <div className="second">{`#${ number }`}</div>
      <div className="third">{`${ age } anos`}</div>
    </div>
  )
}

export default PlayerItem
