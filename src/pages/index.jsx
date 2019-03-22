import React from 'react'

import TeamProvider from '../providers/TeamProvider'
import GameProvider from '../providers/GameProvider'
import SubstitutionProvider from '../providers/SubstitutionProvider'

import Main from '../screens/Main'

function App() {
  return (
    <TeamProvider>
      <GameProvider>
        <SubstitutionProvider>
          <Main />
        </SubstitutionProvider>
      </GameProvider>
    </TeamProvider>
  )
}

export default App
