import React, { useState } from 'react'

import SubstitutionContext from '../contexts/SubstitutionContext'

function init() {
  return { open: false, positionToSubstitute: null }
}

function SubstitutionProvider(props) {
  const [{ open, positionToSubstitute }, setState] = useState(init)

  return (
    <div>
      <SubstitutionContext.Provider
        {...props}
        value={{ open, positionToSubstitute, setState }}
      />
    </div>
  )
}

export default SubstitutionProvider
