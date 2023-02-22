import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
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
import SideBar from './Sidebar';
import AnnouncementPost from './AnnouncementPost';

const classes = {
    root:{
        textAlign: "center",
        margin:'20px 10px 0 10px'
    },
    
}

const ClubMain = () => {

    return (
        <div style={classes.root}>
            <Grid
            container
            spacing={5}
            >
                <Grid item xs={8}>
                    <Typography variant="div" component="h1">
                        ANNOUNCEMENTS
                    </Typography>
                    <AnnouncementPost />
                    <AnnouncementPost />
                    <AnnouncementPost />
                    <AnnouncementPost />
                    <AnnouncementPost />
                    <AnnouncementPost />
                </Grid>
                <Grid item xs={4}>
                    <SideBar />
                </Grid>
            </Grid>
        </div>
    )
}

export default ClubMain;