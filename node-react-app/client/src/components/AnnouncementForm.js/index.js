import React, { Component, useState } from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

const AnnouncementForm = (props) => {

    

    const serverURL = "";
    
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    const timestamp = () => {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
        return date;
    }

    const handleEnteredTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleEnteredBody = (event) => {
        setContent(event.target.value);
    }

    const handleSubmit = (e) => {
        callApiPostAnnouncement()
            .then(res => {
            var parsed = JSON.parse(res.express);     
        })
        
        setTitle('');
        setContent('');

        props.onChange();
        
    }

    const callApiPostAnnouncement = async () => {
        const url = serverURL + "/api/postAnnouncement";
    
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clubID: props.clubID,
            title: title,
            body: content,
            time_posted: timestamp(),
          }),
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
      };


    return(
        <Grid item style={{display:'flex', flexDirection:'column', padding:'25px 25px 20px 0'}}>
            <TextField value={title} onChange={handleEnteredTitle} style={{padding:'10px 0'}} label="Title" variant="outlined"/>
            <TextField value={content} onChange={handleEnteredBody} style={{padding:'0 0 10px 0'}} label="Content" multiline rows={4} variant="outlined"/>
            <Button onClick={handleSubmit} variant="outlined">Post Announcement</Button>
        </Grid>
    )
}

export default AnnouncementForm;