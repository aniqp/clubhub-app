import { Button, makeStyles } from '@material-ui/core'
import { getAuth } from 'firebase/auth'
import React, { useState } from 'react'
import { useSignInWithGoogle, useSignOut } from 'react-firebase-hooks/auth'
import { serverURL } from '../../constants/config'
import { useAuthHeader, useUser } from '../Firebase/context'
import profile from '../../images/login-profile.png'


const useStyles = makeStyles((theme) => ({
    log:{
        textTransform: 'none',
        fontFamily: 'Biryani, sans-serif',
        color:'#fff',
        fontWeight:'600',
        padding:'0 25px'

    },
    login:{
        border:'#fff solid 0.5px',
        transition: 'all 0.2s linear 0s',
        "&:hover": {
            background: "rgba(74, 96, 217, 0.6)",
        },

    },

    signIn:{
        color:'white',
        background:'#f50057',
        border:'none',
        textTransform:'none',
        marginLeft:'20px',
        fontFamily: 'Biryani, sans-serif',
        fontWeight:'600',
        "&:hover":{
            background:'rgb(252, 35, 113)'
        }


    },
    icon:{
        height:'30px'
    }

}));

export const SignIn = () => {
    const classes = useStyles();
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
    (<>
        <Button variant='outlined' className={[classes.log, classes.login]} onClick={logIn}>
            Log In
        </Button>
        <Button variant='outlined' className={classes.signIn} onClick={logIn}>
           Sign Up
        </Button>
    </>
    ):
    (<>
        <Button onClick={() => alert('User Profile: Coming in Sprint 2!')}>
            <img src={profile} className={classes.icon}></img>
        </Button>
        <Button className={classes.log} onClick={logOut}>
            Log Out
        </Button>
    </>)
}