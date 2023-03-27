import React, { useState, useEffect } from "react";
import { makeStyles, Grid, Button, Card, Typography } from "@material-ui/core";
import history from '../Navigation/history';
import { getAuth } from 'firebase/auth';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useUser, useAuthHeader } from '../Firebase/context';
import { serverURL } from '../../constants/config'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const useStyles = makeStyles((theme) => ({
    li: {
        listStyle: 'none'
    },
    card: {
        height: '125px',
        margin: '0 0 20px 0',
        padding: '10px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    exploreBtns: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        outline: '0.8px'
    },
    btn: {
        border: '1.5px solid',
    }

}));

const ClubCard = ({ club, isMember, isPending, onJoin }) => {
    const classes = useStyles();
    const user = useUser();

    const truncate = (input) => {
        if (input.length > 100) {
            return input.substring(0, 200) + '...';
        }
        return input;
    };

    toast.configure();
    const notify = (pending) => {
        if (pending) {
            console.log('in pending')
            toast.info("Club join request was sent.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true
            });
            return;
        }
        console.log('in')
        toast.success("Success: Club was joined.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
        });
        return;
    }

    // Non-users will be redirected to sign in when trying to join a club 
    const [auth] = useState(getAuth())
    const [signInWithGoogle] = useSignInWithGoogle(auth)
    const authHeader = useAuthHeader()
    const [unfufilledJoin, setUnFulfilledJoin] = React.useState('');

    const logIn = async(clubID) => {
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

    const handleJoinClub = (clubID) => {
        if (user) {
            const userID = user.uid;
            setUnFulfilledJoin('');
            callApiJoinClub(userID, clubID)
                .then(res => {
                    console.log('club join successful')
                    onJoin();
                    console.log(res)
                    notify((JSON.parse(res.express) === 'Pending'));
                })
        } else {
            console.log('not signed in')
            logIn(clubID);
            setUnFulfilledJoin(clubID);

        }
    }
    useEffect(() => {
        console.log('change in user: ' + user);
        console.log('unfulfilled join: ' + unfufilledJoin);
        if (unfufilledJoin) {
            handleJoinClub(unfufilledJoin);
        }
    }, [user])

    const callApiJoinClub = async(userID, clubID) => {
        const url = serverURL + '/api/joinClub';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                userID: userID,
                clubID: clubID,
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }
    console.log('isPending: ' + isPending);
    return ( 
        <li key={club.id} className={classes.li} >
            <Card variant="outlined" className={classes.card} >
                <Grid item xs={ 8 } >
                    <Typography variant = 'h6' style={{padding: '0 0 10px 0'}}>{club.name}</Typography> 
                    <Typography style={{fontSize:'0.8rem'}}>{truncate(club.description)}</Typography> 
                </Grid> 
                <Grid item xs = { 3 } className = { classes.exploreBtns } >
                        <Button 
                            className={classes.btn}
                            onClick={() => history.push(`/clubs/${club.id}`)}
                            color = 'primary'
                            variant = 'outlined'> 
                            Club Details 
                        </Button>
                    {isMember.includes(club.id) ? (
                        <Button 
                        disabled 
                        className={classes.btn}
                        color='secondary'
                        variant='outlined'>{isPending.includes(club.id)? "Pending": "Joined"}</Button>
                    ) : ( 
                    <Button 
                        onClick={() => {handleJoinClub(club.id)}}
                        className={classes.btn}
                        color='secondary'
                        variant='outlined'>Join Club</Button>)} 
                </Grid> 
            </Card> 
        </li>
    )

}

export default ClubCard;