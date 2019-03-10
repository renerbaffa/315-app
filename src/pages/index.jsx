import React from 'react'

import TeamProvider from '../providers/TeamProvider'
import Main from '../screens/Main'

function App() {
  return <TeamProvider><Main /></TeamProvider>
}

export default App
