import React, { useState } from 'react'

import SubstitutionContext from '../contexts/SubstitutionContext'

function SubstitutionProvider(props) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <SubstitutionContext.Provider
        {...props}
        value={{ open, toggleDialog: setOpen }}
      />
    </div>
  )
}

export default SubstitutionProvider
