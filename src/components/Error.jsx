import React from 'react'
import { css } from 'emotion'

function Error({ text, ...props }) {
  return <div className={css`color: red`} {...props}>{text}</div>
}

export default Error
