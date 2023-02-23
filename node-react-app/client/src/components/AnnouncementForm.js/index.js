import React, { Component, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
// import Datetime from 'react-datetime';

const AnnouncementForm = () => {
    
    const [title, setTitle] = React.useState('');
    const [body, setBody] = React.useState('');

    const handleEnteredTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleEnteredBody = (event) => {
        setBody(event.target.value);
    }

    const handleSubmit = (event) => {
        console.log(title, body);
    }


    return(
        <Grid item style={{display:'flex', flexDirection:'column', padding:'25px 25px 20px 0'}}>
            <TextField value={title} onChange={handleEnteredTitle} style={{padding:'10px 0'}} label="Title" variant="outlined"/>
            <TextField value={body} onChange={handleEnteredBody} style={{padding:'0 0 10px 0'}} label="Content" multiline rows={4} variant="outlined"/>
            <Button onClick={handleSubmit} variant="outlined">Post Announcement</Button>
        </Grid>
    )
}

export default AnnouncementForm;