import { Button, makeStyles, Typography, Tooltip, Zoom } from '@material-ui/core'
import { getAuth } from 'firebase/auth'
import React, { useState } from 'react'
import { useSignInWithGoogle, useSignOut } from 'react-firebase-hooks/auth'
import { serverURL } from '../../constants/config'
import { useAuthHeader, useUser } from '../Firebase/context'
import profile from '../../images/login-profile.png';
import history from '../Navigation/history'


const useStyles = makeStyles((theme) => ({
    log:{
        textTransform: 'none',
        fontFamily: 'Biryani, sans-serif',
        color:'#fff',
        fontWeight:'600',
        padding:'5px 25px'

    },
    login:{
        border:'#fff solid 0.5px',
        transition: 'all 0.2s linear 0s',
        "&:hover": {
            background: "rgba(74, 96, 217, 0.6)",
        },

    },
    icon:{
        height:'30px'
    },

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
    console.log('user:' + user);
    return !user ? 
    (<>
        <Button variant='outlined' className={`${classes.log} ${classes.login}`} onClick={logIn}>
            Log In
        </Button>
    </>
    ):
    (<>
        <Tooltip 
            title={
                <React.Fragment>
                <Typography color="inherit">Logged in as:&nbsp;<b>{user.displayName}</b></Typography>
                </React.Fragment>}
            TransitionComponent={Zoom}
            TransitionProps={{ timeout: 200 }}
            >
            <Button>
                <img src={profile} className={classes.icon}></img>
            </Button>
        </Tooltip>
        <Button className={classes.log} onClick={()=>{logOut(); history.push(`/`)}}>
            Log Out
        </Button>
    </>)
}