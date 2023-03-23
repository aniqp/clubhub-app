import React, { useEffect } from 'react';
import { Link, styled, Paper, Grid, Typography, Divider, makeStyles } from '@material-ui/core';
// import { Link } from 'react-router-dom';
import history from '../Navigation/history';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Announcements from './Announcements';
import Members from './Members';
import { useParams } from 'react-router-dom';
import creativeArt from '../../images/club-images/creative_art.jpg'





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
        height:'300px'
    },
    headerItems:{
        height:'300px',
    },
    clubTitle:{
        fontWeight:'600',
        fontFamily: 'Arvo, serif',
    },
    titleHeader:{
        display:'flex',
        alignItems:'end',
        padding:'0 0 50px 10px',
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

const ClubBoardHeader = ({ clubTitle, toggle, handleToggle }) => {
    const classes = useStyles();

    // React.useEffect(() => {
    //     document.body.classList.add('red');
    // }, [] )

    return (<>
        <Grid container className={classes.header}>
            <Grid item xs={5} className={classes.headerItems}>
                <img className={classes.headerImg} src={creativeArt}></img>
            </Grid>
            <Grid item xs={7} className={`${classes.titleHeader} ${classes.headerItems}`}>
                <Typography className={classes.clubTitle} variant='h4'>{clubTitle}</Typography>
            </Grid>
        </Grid> 
        <Grid>
            <StyledToggleButtonGroup
                className={classes.toggleGroup}
                value={toggle}
                exclusive
                onChange={handleToggle}>
                <ToggleButton value="1">
                    Announcements
                </ToggleButton>
                <ToggleButton value="2">
                    Events
                </ToggleButton>
                <ToggleButton value="3">
                    Polls
                </ToggleButton>
                <ToggleButton value="4">
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