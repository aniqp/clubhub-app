import { Button } from '@material-ui/core'
import { getAuth } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { authContext } from '../App'


export const SignIn = () => {
    const [auth] = useState(getAuth())
    const [signInWithGoogle] = useSignInWithGoogle(auth)
    const token = useContext(authContext)

    const logIn = async () => {
        signInWithGoogle()
    }
    return (
        <Button onClick={logIn}>
            Log In
        </Button>
    )
}
