import { Button } from '@material-ui/core'
import { getAuth } from 'firebase/auth'
import React, { useState } from 'react'
import { useSignOut } from 'react-firebase-hooks/auth'

export const SignOut = () => {
    const [auth] = useState(getAuth())
    const [logOut] = useSignOut(auth)

  return (
    <Button onClick={logOut}>
        Log Out
    </Button>
  )
}
