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
        textAlign:'center',
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

export default function AnnouncementPost(props) {
    const classes = useStyles();

    return(
        <Grid item className={classes.root}>
            <Box className={classes.title}>
                {props.title}
            </Box>
            <Box className={classes.content}>
                {props.body}
            </Box>
        </Grid>
    )
}