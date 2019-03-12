import React from 'react'
import { cx, css } from 'emotion'

const circleStyle = css`
  padding: 0;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  height: 50px;
  width: 50px;
  background-color: #BDBDBD;
  text-align: center;
  border: none;
`

const defaultContentStyle = css`
  color: black;
  font-size: 30px;
  margin-top: -6px;
  margin-left: 2px;
`

function RoundButton({ className, ...props }) {
  return <button {...props} className={cx(circleStyle, className)} />
}

RoundButton.defaultProps = {
  children: <div className={defaultContentStyle}>+</div>,
}

export default RoundButton
