import { useReducer } from 'react'

import GameReducer from '../reducers/GameReducer'
import { SET_PLAYER_IN_POSITION } from '../constants/gameReducer'
import { getGameFromLocalStorage, setGameOnLocalStorage } from '../utils/localStorage'

const DEFAULT_GAME = {
  striker: null,
  attackingMidFielder1: null,
  attackingMidFielder2: null,
  defensiveMidFielder1: null,
  defensiveMidFielder2: null,
  leftBack: null,
  defense: null,
  rightBack: null,
  goalKeeper: null,
}

function init() {
  let game
  game = getGameFromLocalStorage()

  if (!game) {
    game = DEFAULT_GAME
    setGameOnLocalStorage(game)
  }

  return game
}

function useGame() {
  const [game, dispatch] = useReducer(GameReducer, init())

  function setPlayerInPosition(position, playerId) {
    dispatch({ type: SET_PLAYER_IN_POSITION, payload: { position, playerId } })
  }

  return { game, setPlayerInPosition }
}

export default useGame
