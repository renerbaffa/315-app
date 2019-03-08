import { useState } from 'react'

function init() {
  const team = localStorage.getItem('team')
  return {
    isLoading: false,
    team: null,
  }
}

function useTeam() {
  return useState(init)
}

export default useTeam
