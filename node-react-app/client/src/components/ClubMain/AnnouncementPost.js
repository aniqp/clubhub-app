import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Button } from '@material-ui/core';
import profile from '../../images/profile-icon.png';
import edit from '../../images/edit-icon.png';
import del from '../../images/delete-icon.png';
import close from '../../images/close-icon.png';

const serverURL = "";

const useStyles = makeStyles({
    root: {
      padding:'8px',
      background:'#9DB4C0',
      borderRadius:'8px',
      margin:'25px 70px',
      maxWidth: '90%',
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
        margin:'20px 10px 10px 10px',
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
    const admin = true;

    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

    const classes = useStyles();

    const handleEditClick = () => {

    }

    const handleDeleteClick = () => {
        callApiDeleteAnnouncement()
            .then(res => {
                var parsed = JSON.parse(res.express);
            })
        
        setTimeout(() => props.onChange(), 1000);

    }
    
    const callApiDeleteAnnouncement = async () => {
        const url = serverURL + '/api/deleteAnnouncement';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                id: props.id
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }


    return(
        <Grid item className={classes.root}>
            <Box style={{display:'flex', padding:'5px 0px 5px 10px'}}>
                <img src={profile} style={{height:'50px'}}></img>
                <Box style={{padding:'3px 0 0 10px'}}>
                    <Typography>{props.name}</Typography>
                    <Typography>{props.timestamp.slice(0, 15)}</Typography> 
                </Box>
            </Box>
            <Box className={classes.title}>
                <Typography className={classes.titleFont}>{props.title}</Typography>
            </Box>
            <Box className={classes.content}>
                <Typography className={classes.contentFont}>{props.body}</Typography>
            </Box>
            {admin &&
            <Box style={{display:'flex', justifyContent:'end', margin:'0 8px 10px 0'}}>
                <Button onClick={handleEditClick}><img src={edit} style={{height:'25px'}}></img></Button>
                <Button onClick={() => setDeleteModalOpen(true)}><img src={del} style={{height:'25px'}}></img></Button>
                <DeleteModal title={props.title} body={props.body} open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onSubmit={handleDeleteClick} />
            </Box>}
        </Grid>
    )
}

const DeleteModal = ({title, body, open, onClose, onSubmit}) => {

    const MODAL_STYLES = {
        position:'fixed',
        top:'50%',
        left:'50%',
        transform:'translate(-50%, -50%)',
        backgroundColor:'#fff',
        padding:'20px',
        zIndex:1000,
        width:'40vw',
    }

    const OVERLAY_STYLES = {
        position:'fixed', 
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor:'rgba(0,0,0,.7)',
        zIndex:1000
    }

    const truncate = (input) => {
        if (input.length > 100) {
           return input.substring(0, 100) + '...';
        }
        return input;
    };

    console.log(open);
    if (!open) return null
    
    return (
        <>
            <div style={OVERLAY_STYLES} />
            <div style={MODAL_STYLES}>
                <Grid container style={{display:'flex', flexDirection:'column'}}>
                    <Grid item style={{display:'flex', justifyContent:'end'}}>
                        <Button onClick={onClose}><img src={close} style={{height:'25px'}}></img></Button>
                    </Grid>
                    <Grid item style={{display:'flex', justifyContent:'center'}}>
                        <b>Are you sure you want to delete the following announcement?</b>
                    </Grid>
                    <Grid item style={{padding:'25px'}}>
                        <Box>
                            <b>Title: </b>{title}
                        </Box>
                        <Box>
                            <b>Content: </b>{truncate(body)} 
                        </Box>
                    </Grid>
                    <Grid style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                        <Button onClick={onClose} variant='outlined' style={{margin:'0 10px'}}>Cancel</Button>
                        <Button onClick={onSubmit} variant='outlined' style={{margin:'0 10px', border:'red 1px solid', background:'rgba(255, 0, 0, 0.13)'}}>Delete</Button>   
                    </Grid>
                </Grid>
            </div>
        </>
    )

}