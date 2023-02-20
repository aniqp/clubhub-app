import { Button } from '@material-ui/core'
import { getAuth } from 'firebase/auth'
import React, { useState } from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'


export const SignIn = () => {
    const [auth] = useState(getAuth())
    const [signInWithGoogle] = useSignInWithGoogle(auth)

    const logIn = async () => {
        signInWithGoogle()
    }
    return (
        <Button onClick={logIn}>
            Log In
        </Button>
    )
}
