import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';

const serverURL = "";

const AnnouncementForm = (props) => {
    
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    const timestamp = () => {
        let today = new Date();

        const leadingZero = (n) => {
            if (n.toString.length == 1){
                n = '0' + n;
                return n;
            }
            return;
        }

        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+leadingZero(today.getHours())+':'+leadingZero(today.getMinutes())+':'+today.getSeconds();
        
        return date;
    }

    const handleEnteredTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleEnteredBody = (event) => {
        setContent(event.target.value);
    }
    

    const handleSubmit = () => {
        callApiPostAnnouncement()
            .then(res => {
            var parsed = JSON.parse(res.express);     
        })

        setTitle('');
        setContent('');
        setTimeout(() => props.onSubmit(), 1000);
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
        <Grid item style={{border:'solid 2px #152532', margin:'30px 0 0 0',display:'flex', flexDirection:'column', padding:'25px 20px 20px 20px', textAlign:'center'}}>
            <Typography>Post New Announcement</Typography>
            <TextField value={title} onChange={handleEnteredTitle} style={{background:'#fff', padding:'10px 0'}} label="Title" variant="outlined"/>
            <TextField value={content} onChange={handleEnteredBody} style={{padding:'0 0 10px 0'}} label="Content" multiline rows={4} variant="outlined"/>
            <Button onClick={handleSubmit} variant="outlined" style={{background:'#152532', color:'#fff'}}>Post Announcement</Button>
        </Grid>
    )
}

export default AnnouncementForm;