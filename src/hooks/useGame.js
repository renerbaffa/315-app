import { useReducer } from 'react'

import GameReducer from '../reducers/GameReducer'
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

  if (typeof window !== `undefined`) {
    game = getGameFromLocalStorage()
  }

  if (!game) {
    game = DEFAULT_GAME
    setGameOnLocalStorage(game)
  }

  return game
}

function useGame() {
  const [game, dispatch] = useReducer(GameReducer, init())

  return { game }
}

export default useGame
