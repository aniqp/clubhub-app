import { Button } from '@material-ui/core'
import { getAuth } from 'firebase/auth'
import React, { useState } from 'react'
import { useSignInWithGoogle, useSignOut } from 'react-firebase-hooks/auth'
import { serverURL } from '../../constants/config'
import { useAuthHeader, useUser } from '../Firebase/context'


export const SignIn = () => {
    const [auth] = useState(getAuth())
    const [signInWithGoogle] = useSignInWithGoogle(auth)
    const authHeader = useAuthHeader()
    const user = useUser()
    const [logOut] = useSignOut(auth)

    const logIn = async () => {
        const result = await signInWithGoogle();
        if (!result) {
            console.log('Login failed')
            return
        }

        const request = {
            method: 'PUT',
            headers: {
                ...authHeader(),
            }
        }
        const response = await fetch(serverURL.concat('api/login'), request)
    }

    return !user ? 
    (<Button onClick={logIn}>
        Log In
    </Button>):
    (<Button onClick={logOut}>
        Log Out
    </Button>)
}