import React from 'react'

import GameContext from '../contexts/GameContext'

import useGame from '../hooks/useGame'

function GameProvider(props) {
  const gameContext = useGame()

  return (
    <div>
      <GameContext.Provider
        {...props}
        value={gameContext}
      />
    </div>
  )
}

export default GameProvider
