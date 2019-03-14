import React from 'react'

import TeamProvider from '../providers/TeamProvider'
import GameProvider from '../providers/GameProvider'
import Main from '../screens/Main'

function App() {
  return <TeamProvider><GameProvider><Main /></GameProvider></TeamProvider>
}

export default App
