import React from 'react';
import { makeStyles, Grid, Typography, Box, Button, TextField, Card, CardHeader, CardContent, CardActions } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import profile from '../../images/profile-icon.png';
import edit from '../../images/edit-icon.png';
import del from '../../images/delete-icon.png';
import close from '../../images/close-icon.png';
import lock from '../../images/lock-icon.png';
import { serverURL } from '../../constants/config';
import { toast } from 'react-toastify'; 
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles({
    root: {
      padding:'8px',
      background:'rgba(115, 115, 115, 0.38)',
      borderRadius:'8px',
      margin:'20px 70px',
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
    },
    card:{
        margin:'20px 50px'
    }, 
    cardActions:{
        display:'flex',
        justifyContent:'end'
    },
    alert:{
        margin:'20px 50px'
    }

  });

export default function AnnouncementPost(props) {
    const classes = useStyles();
    const admin = props.adminStatus;

    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [editModalOpen, setEditModelOpen] = React.useState(false);
    
    toast.configure();
    const notify = () => {
        console.log('in')
        toast.success("Success: Announcement post was edited.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
        });
    }

    const handleEditClick = (title, body) => {
        const data = {
            title: title,
            body: body
        }
        callApiEditAnnouncement(data)
            .then(res => {
                console.log('response')
                var parsed = JSON.parse(res.express);
                props.onSubmit();
                notify();
            })  
        setEditModelOpen(false);    
    }

    const callApiEditAnnouncement = async (data) => {
        const url = serverURL + '/api/editAnnouncement';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                id: props.id,
                newTitle : data.title,
                newBody: data.body,
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    const handleDeleteClick = () => {
        callApiDeleteAnnouncement()
            .then(res => {
                var parsed = JSON.parse(res.express);
                props.onSubmit();
            })
        setDeleteModalOpen(false);
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

    // CONVERT 24HR to 12HR TIMESTAMP
    function convertTime(str) {
        let result = '';
        let hour1 = Number(str[0] - '0');
        let hour2 = Number(str[1] - '0');
        let hh;
        if (hour2) {
            hh = hour1 * 10 + hour2;
        } else {
            hh = 0
        }
        let meridien;

        if (hh < 12) {
            meridien = 'AM';
        } else {
            meridien = 'PM';
        }
        hh %= 12;

        if (hh == 0) {
            result += '12';

            for (let i = 2; i < 5; i++){
                result+=str[i]
            }
        } else {
            result += hh;
            for (let i = 2; i < 5; i++){
                result+=str[i]
            } 
        }
        result += ' ' + meridien;
        return result;
    }
    console.log('visibility: ', props.visibility)
    console.log('admin status: ', admin)
    return(<>
        {((props.visibility === 'private' && admin) || (props.visibility === 'public')) &&
        <Card className={classes.card} sx={{ maxWidth: 500 }}>
            <CardHeader 
            avatar={<img src={profile} style={{height:'50px'}}></img>}
            title={
                <Grid style={{display:'flex', justifyContent:'space-between'}}>
                    <b>{props.title}</b>
                    {props.visibility === 'private' && 
                        <>
                            <Box style={{display:'flex', alignContent:'center'}}>
                                <Typography variant="body2" color='primary'>Admin Visibility</Typography>
                                <img src={lock} style={{height:'18px', marginLeft:'5px'}} />
                            </Box>
                        </>}
                </Grid>}
            subheader={props.timestamp.slice(0, 10) + '' + convertTime(props.timestamp.slice(10, 15))} />
            <CardContent>   
                <Typography variant="body2" color="text.secondary">
                {props.body}
                </Typography>
            </CardContent>
            {admin && 
            <CardActions className={classes.cardActions} disableSpacing>
                <Button onClick={() => setEditModelOpen(true)}><img src={edit} style={{height:'25px'}}></img></Button>
                <EditModal title={props.title} body={props.body} open={editModalOpen} onClose={() => setEditModelOpen(false)} onSubmit={handleEditClick}/>
                <Button onClick={() => setDeleteModalOpen(true)}><img src={del} style={{height:'25px'}}></img></Button>
                <DeleteModal title={props.title} body={props.body} open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onSubmit={handleDeleteClick} />
            </CardActions>}
        </Card>
        }
    </>)
}


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

const DeleteModal = ({title, body, open, onClose, onSubmit}) => {

    const truncate = (input) => {
        if (input.length > 100) {
           return input.substring(0, 100) + '...';
        }
        return input;
    };

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

const EditModal = ({title, body, open, onClose, onSubmit}) => {
    const [newTitle, setNewTitle] = React.useState(title);
    const [newContent, setNewContent] = React.useState(body);

    const handleEnteredTitle = (event) => {
        setNewTitle(event.target.value);
        setIsTitleMissing(false);
    }

    const handleEnteredBody = (event) => {
        setNewContent(event.target.value);
        setIsContentMissing(false);
    }

    // Error Messages
    const [isTitleMissing, setIsTitleMissing] = React.useState(false);
    const [isContentMissing, setIsContentMissing] = React.useState(false);

    const handeEditSubmission = () => {
        let caughtError = false;

        if (newTitle === "") {
            setIsTitleMissing(true);
            caughtError = true;
        }

        if (newContent === "") {
            setIsContentMissing(true);
            caughtError = true;
        }

        if (!caughtError){
            onSubmit(newTitle, newContent);
        }
    }

    if (!open) return null

    return(
        <>
            <div style={OVERLAY_STYLES} />
            <div style={MODAL_STYLES}>
                <Grid container style={{display:'flex', flexDirection:'column'}}>
                    <Grid item style={{display:'flex', justifyContent:'end'}}>
                        <Button onClick={onClose}><img src={close} style={{height:'25px'}}></img></Button>
                    </Grid>
                    <Grid item style={{display:'flex', justifyContent:'center'}}>
                        <b>Edit the following announcement:</b>
                    </Grid>
                    <Grid item style={{padding:'25px'}}>
                        <Box>
                        {isTitleMissing && (
                        <Typography style={{ color: "rgb(255,0,0)", padding:'5px 0 0 0'}} variant={"body2"}>
                        Please enter an announcement title
                        </Typography>
                        )}
                            <TextField
                                onChange={handleEnteredTitle}
                                required
                                label="Title"
                                defaultValue={title}
                                fullWidth
                                multiline
                            />
                        </Box>
                        <Box style={{padding:'15px 0 0 0'}}>
                            {isContentMissing && (
                            <Typography style={{ color: "rgb(255,0,0)", padding:'5px 0 0 0'}} variant={"body2"}>
                            Please enter content for the announcement
                            </Typography>
                            )}
                            <TextField
                                onChange={handleEnteredBody}
                                required
                                label="Content"
                                defaultValue={body}
                                multiline
                                fullWidth
                            />
                        </Box>
                    </Grid>
                    <Grid style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                        <Button onClick={onClose} variant='outlined' style={{margin:'0 10px'}}>Cancel</Button>
                        <Button onClick={handeEditSubmission} variant='outlined' style={{margin:'0 10px'}}>Edit</Button>   
                    </Grid>
                </Grid>
            </div>
        </>
    )

}