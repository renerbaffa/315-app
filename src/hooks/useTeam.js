import { useState } from 'react'

function init() {
  return JSON.parse(window.localStorage.getItem('team'))
}

function useTeam() {
  return useState(init)
}

export default useTeam
