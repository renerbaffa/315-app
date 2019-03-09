import React from 'react'

import SplashScreen from '../components/SplashScreen'

import TeamProvider from '../providers/TeamProvider'

function App() {
  return (
    <TeamProvider>
      <SplashScreen />
    </TeamProvider>
  )
}

export default App
