import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { serverURL } from '../../constants/config'
import { useAuthHeader } from '../Firebase/context'

export const Hello = () => {

    const [message, setMessage] = useState("")
    const authHeader = useAuthHeader()


    const sayHello = async () => {
        const request = {
            method: "GET",
            headers: {
                ...authHeader(),
                'Accept': '*/*',
                'Origin': 'http://localhost:3000'
            }
        }
        try{
            const response = await fetch(serverURL.concat('hello/'), request)
            const text = await response.text()
            setMessage(text)
        } catch {
            setMessage('Could not say hello')
        }
    }

    return (
        <>
            <Button onClick={sayHello}>
                Say Hello to the server
            </Button>
            {message}
        </>
    )
}
