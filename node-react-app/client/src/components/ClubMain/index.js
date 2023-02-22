import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { SignIn } from '../SignIn';
import { useUser } from '../Firebase';
import { Hello } from '../Hello';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import { CardHeader } from '@material-ui/core';
import Item from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';

const classes = {
    root:{
        textAlign: "center",
    },
    
}

const ClubMain = () => {

    return(
        <div style={classes.root}>
            <Grid
            container
            spacing={2}
            >
                <Grid item xs>
                    <h3>Announcements</h3>
                    <Announcement />
                </Grid>
                <Grid item xs style={{border:'1px green solid'}}>
                    <h3>Polls</h3>
                </Grid>
                <Grid item xs style={{border:'1px pink solid'}}>
                    <h3>Sidebar</h3>
                </Grid>
            </Grid>
            
        </div>

    )
}

const Announcement = () => {
    return(
        <Grid item style={{padding:'8px', background:'grey', padding:'5px', borderRadius:'10px', margin:'10px'}}>
            <Box style={{background:'white', margin:'10px'}}>
                Announcement Title
            </Box>
            <Box style={{background:'white', margin:'10px', padding:'5px', textAlign:'left'}}>
                Announcement Content
            </Box>
        </Grid>
    )
}


export default ClubMain;