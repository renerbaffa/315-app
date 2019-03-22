import { SET_PLAYER_IN_POSITION } from '../constants/gameReducer'

import { setGameOnLocalStorage } from '../utils/localStorage'

export default function GameReducer(game, action) {
  switch (action.type) {
  case SET_PLAYER_IN_POSITION:
    const newGame = { ...game, [action.payload.position]: action.payload.playerId }
    setGameOnLocalStorage(newGame)
    return newGame
  default:
    return game
  }
}
