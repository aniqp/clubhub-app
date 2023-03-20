import React, { useEffect } from 'react';
import { styled, Paper, Grid, Typography, Divider, makeStyles } from '@material-ui/core';
// import { Link } from 'react-router-dom';
import history from '../Navigation/history';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Announcements from './Announcements';
import Members from './Members';
import { useParams } from 'react-router-dom';
import { serverURL } from '../../constants/config';
import { Switch, Rote, Link } from 'react-router-dom';





const useStyles = makeStyles((theme) => ({
    root: {
        display:'flex',
        boxShadow: "0px 3px 2px -2px grey",
    },
    link:{
        textDecoration:'none',
        color:'#000',
        letterSpacing:'0.02857em',
        "&:hover": {
            textDecoration:'none',
        },
        "&:active": {
            color:'#3f51b5', 
        },
    },
    header:{
        borderBottom:'rgba(121, 121, 121, 0.07) solid 1px',
        background:'#fff',
        minHeight:'144px',
    },
    clubTitle:{
        fontWeight:'600',
        fontFamily: 'Arvo, serif',
    },
    titleHeader:{
        display:'flex',
        alignItems:'end',
        margin:'50px'
        // padding:'0 0 50px 10px',
    },
    toggleGroup: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        boxShadow: "0px 3px 2px -2px grey",
        margin:'0',
        background:'#fff'
    },
    headerImg:{
        height: '95%',
        margin: '0',
        padding: '25px 0px 0 25px',
    }
    
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
      border: 0,
      padding:'11px 25px',
      '&.Mui-selected': {
        background:'none',
        color:'#3f51b5',
        borderBottom: '#3f51b5 3px solid',
        borderRadius: '0px!important',
      },
      '&.Mui-hover': {
        background:'none',
        color:'#3f51b5',
        borderBottom: '#3f51b5 3px solid',
        borderRadius: '0px!important',
      },
    },
  }));

const ClubBoardHeader = ({active}) => {
    const classes = useStyles();
    const { clubID } = useParams();
    const [clubTitle, setClubTitle] = React.useState();
    const [toggle, setToggle] = React.useState(active);
    // const [active, setActive] = React.useState(active);

    React.useEffect(() => {
        getClubTitle();
    }, []);

    const handleToggle = (event, newToggle) => {
        if (newToggle !== null) {
            setToggle(newToggle);
        }
    };

    const getClubTitle = () => {
        callApiGetClubs()
            .then(res => {
                var parsed = JSON.parse(res.express);
                setClubTitle(parsed[0].name)
            })
    }

    const callApiGetClubs = async () => {
        const url = serverURL + '/api/getClubs';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                clubID: clubID
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    return (<>
        <Grid container className={classes.header}>
            <Grid item xs={7} className={[classes.titleHeader, classes.headerItems]}>
                <Typography className={classes.clubTitle} variant='h4'>{clubTitle}</Typography>
            </Grid>
        </Grid> 
        <Grid>
            <StyledToggleButtonGroup
                className={classes.toggleGroup}
                value={toggle}
                exclusive
                onChange={handleToggle}>
                <ToggleButton value="1" onClick={()=> history.push(`/clubboard/${clubID}/`)}>
                    Announcements
                </ToggleButton>
                <ToggleButton value="2">
                    Events
                </ToggleButton>
                <ToggleButton value="3">
                    Polls
                </ToggleButton>
                <ToggleButton value="4" onClick={()=> history.push(`/clubboard/${clubID}/members`)}>
                    Members
                </ToggleButton>
                <ToggleButton value="5">
                    Photos
                </ToggleButton>
            </StyledToggleButtonGroup>
        </Grid>
   </>)
}

export default ClubBoardHeader;