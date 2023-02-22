import { Button } from '@material-ui/core'
import { getAuth } from 'firebase/auth'
import React, { useState } from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { serverURL } from '../../constants/config'
import { useAuthHeader } from '../Firebase/context'


export const SignIn = () => {
    const [auth] = useState(getAuth())
    const [signInWithGoogle] = useSignInWithGoogle(auth)
    const authHeader = useAuthHeader()

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

    return (
        <Button onClick={logIn}>
            Log In
        </Button>
    )
}
