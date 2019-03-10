import React from 'react'
import { css } from 'emotion'

const input = css`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 3px;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(211, 211, 211);
  padding: 5px 10px;
  margin-left: 4px;
  font-size: 18px;
`

function Input(props) {
  return (
    <input
      className={input}
      {...props}
    />
  )
}

export default Input
