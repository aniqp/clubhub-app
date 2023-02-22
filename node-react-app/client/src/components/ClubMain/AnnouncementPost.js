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

const useStyles = makeStyles({
    root: {
      padding:'8px',
      background:'grey',
      borderRadius:'10px',
      margin:'10px'
    },
    title:{
        background:'white', 
        margin:'10px',
    },
    content:{
        background:'white', 
        margin:'10px',
        padding:'5px',
        textAlign:'left',
    }
  });

export default function AnnouncementPost() {
    const classes = useStyles();

    return(
        <Grid item className={classes.root}>
            <Box className={classes.title}>
                Announcement Title
            </Box>
            <Box className={classes.content}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Box>
        </Grid>
    )
}