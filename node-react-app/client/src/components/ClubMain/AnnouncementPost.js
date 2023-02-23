import React, { Component } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
    root: {
      padding:'8px',
      background:'#9DB4C0',
      borderRadius:'8px',
      margin:'25px 70px'
    },
    title:{
        textAlign:'center',
        background:'#fff', 
        margin:'10px',
        padding:'10px 0px',
        borderRadius:'3px',
        fontSize:'1rem',
    },
    content:{
        background:'#fff', 
        margin:'20px 10px',
        padding:'10px 10px',
        textAlign:'left',
        borderRadius:'3px',
        fontSize:'0.8rem',
    },
    titleFont:{
        fontSize:'1.3rem',
        fontWeight:'600',
    },
    contentFont:{
        fontSize:'0.9rem',
    }


  });

export default function AnnouncementPost(props) {
    const classes = useStyles();

    return(
        <Grid item className={classes.root}>
            <Box className={classes.title}>
                <Typography className={classes.titleFont}>{props.title}</Typography>
            </Box>
            <Box className={classes.content}>
                <Typography className={classes.contentFont}>{props.body}</Typography>
            </Box>
        </Grid>
    )
}