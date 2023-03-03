import React, { useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import { serverURL } from '../../constants/config';
import Alert from '@material-ui/lab/Alert';

const AnnouncementForm = (props) => {
    
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    //States for error messages
    const [isTitleMissing, setIsTitleMissing] = React.useState(false);
    const [isContentMissing, setIsContentMissing] = React.useState(false);
    const [isSubmitSuccess, setIsSubmitSuccess] = React.useState(false);

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
        setIsTitleMissing(false);
        setIsSubmitSuccess(false);

    }

    const handleEnteredBody = (event) => {
        setContent(event.target.value);
        setIsContentMissing(false);
        setIsSubmitSuccess(false);

    }
    

    const handleSubmit = () => {
        let caughtError = false;
        if (title === "") {
            setIsTitleMissing(true);
            caughtError = true;
        }
        if (content === "") {
            setIsContentMissing(true);
            caughtError = true;
        }

        if (!caughtError){
            callApiPostAnnouncement()
            .then(res => {
            var parsed = JSON.parse(res.express);     
            })

            setTitle('');
            setContent('');
            setTimeout(() => props.onSubmit(), 1000);
            setIsSubmitSuccess(true);
            setTimeout(()=> setIsSubmitSuccess(false), 10000)
        }

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
        <Grid item style={{border:'solid 2px #152532', margin:'30px 0 0 0',display:'flex', flexDirection:'column', padding:'25px 20px 20px 20px',}}>
            <Box style={{display:'flex', justifyContent:'center', padding:'0 0 10px 0'}}>
                <Typography>Post New Announcement</Typography>
            </Box>
            {isTitleMissing && (
            <Typography style={{ color: "rgb(255,0,0)", padding:'5px 0 0 0'}} variant={"body2"}>
              Please enter an announcement title
            </Typography>
            )}
            <TextField required value={title} onChange={handleEnteredTitle} style={{background:'#fff', padding:'5px 0 20px 0'}} label="Title" variant="outlined"/>
            {isContentMissing && (
                <Typography style={{ color: "rgb(255,0,0)",  padding:'5px 0 0 0' }} variant={"body2"}>
              Please enter content for the announcement
            </Typography>
            )}
            <TextField 
                required 
                value={content} 
                onChange={handleEnteredBody} 
                style={{padding:'5px 0 10px 0'}} 
                label="Content" 
                multiline 
                rows={4} 
                variant="outlined"/>
            <Button onClick={handleSubmit} variant="outlined" style={{background:'#152532', color:'#fff'}}>Post Announcement</Button>
            {isSubmitSuccess && <Alert onClose={() => {setIsSubmitSuccess(false)}} variant="outlined" severity="success" style={{ margin:'10px 0 0 0'}}>
            Success: Announcement post was created!
            </Alert>}
        </Grid>
    )
}

export default AnnouncementForm;