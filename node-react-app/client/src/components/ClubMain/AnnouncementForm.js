import React from 'react';
import { makeStyles, Grid, Button, Typography, RadioGroup, Radio, FormControlLabel, Card } from "@material-ui/core";
import { serverURL } from '../../constants/config';
import profile from '../../images/profile-icon.png';
import close from '../../images/close-icon.png';
import publicIcon from '../../images/public-icon.png';
import privateIcon from '../../images/private-icon.png';
import { toast } from 'react-toastify'; 
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles({
    card:{
        margin:'20px 50px',
        display:'flex',
        padding:'18px',
        alignItems:'center',

    }, 
    input:{
        margin: '0 0 15px 0',
        border: '#cccccc 1px solid',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '1px 3px 6px -2px grey',
    },
    profile: {
        height:'50px',
        paddingRight:'15px'
    },
    btn:{
        width:'100%',
        textTransform:'none',
        padding:'13px 10px',
        justifyContent:'start',
        background:'rgb(242,242,242)',
        "&:hover":{
            background:'#d9d9d9'
        }
    },
    radiobtn:{
        textTransform:'none',
        width:'100%',
        justifyContent:'space-between',
    },
    img:{
        height:'45px',
        width:'45px',
    }, 
    radioFont :{
        marginLeft:'10px',
        fontSize:'14px',
        fontWeight:'600',
        color:'rgb(75,75,75)',
    },
    header:{
        margin:'-32px',
        color:'#354497',
        fontWeight:'600',
        fontSize:'16pt'
    },
    subheader:{
        fontWeight:'600',
        paddingBottom:'10px'
    },
    divider:{
        margin:'25px 0 5px 0',
        borderBottom:'1px solid #d9d9d9'
    },
    radioGroup:{
        '&&:hover': {
            backgroundColor: 'transparent',
        }
        
    }


  });

const AnnouncementForm = (props) => {
    const classes = useStyles();
    const [postModalOpen, setPostModalOpen] = React.useState(false);

    toast.configure();
    const notify = () => {
        toast.success("Success: Announcement posted!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
        });
    }

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

    const handleSubmit = (data) => {
        callApiPostAnnouncement(data)
        .then(res => {
            var parsed = JSON.parse(res.express);  
            props.onSubmit();
            notify();   
        })
    }
    
    const callApiPostAnnouncement = async (data) => {
        const url = serverURL + "/api/postAnnouncement";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clubID: props.clubID,
            title: data.title,
            body: data.content,
            visibility: data.access,
            time_posted: timestamp(),
          }),
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    return(
        <Card className={classes.card} sx={{ maxWidth: 500 }}>
            <Grid xs={1} item>
                <img className={classes.profile} src={profile} />
            </Grid>
            <Grid xs={11} item>
                <Button className={classes.btn} onClick={()=> setPostModalOpen(true)} open={postModalOpen} onClose={()=> setPostModalOpen(false)}>Share an Announcement...</Button>
                <PostModal classes={classes} open={postModalOpen} onClose={() => setPostModalOpen(false)} onSubmit={handleSubmit} />
            </Grid>

        </Card>
    )
}

const MODAL_STYLES = {
    position:'fixed',
    top:'50%',
    left:'50%',
    transform:'translate(-50%, -50%)',
    backgroundColor:'#fff',
    padding:'20px',
    zIndex:1000,
    width:'35vw',
    borderRadius:'5px',
}

const OVERLAY_STYLES = {
    position:'fixed', 
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor:'rgba(0,0,0,.4)',
    zIndex:1000
}

const PostModal = ({ classes, open, onClose, onSubmit }) => {
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [radiobtn, setRadiobtn] = React.useState('1');
    
    // Error Messages
    const [isTitleMissing, setIsTitleMissing] = React.useState(false);
    const [isContentMissing, setIsContentMissing] = React.useState(false);

    const handleEnteredTitle = (event) => {
        setTitle(event.target.value);
        setIsTitleMissing(false);
    }

    const handleEnteredBody = (event) => {
        setContent(event.target.value);
        setIsContentMissing(false);
    }

    const handlePost = () => {
        let caughtError = false;
        let access = {1:'public', 2:'private'}

        if (title === "") {
            setIsTitleMissing(true);
            caughtError = true;
        }

        if (content === "") {
            setIsContentMissing(true);
            caughtError = true;
        }

        if (!caughtError){
            let data = {
                title: title,
                content: content,
                access: access[radiobtn],
            }
            onSubmit(data);
            setTitle('');
            setContent('');
            setRadiobtn('1');
            onClose();
        }
    }

    const handleRadioBtn1 = () => {
        setRadiobtn('1')
    }

    const handleRadioBtn2 = () => {
        setRadiobtn('2')
    }

    if (!open) return null

    return(
        <>
            <div style={OVERLAY_STYLES} />
            <div style={MODAL_STYLES}>
                <Grid container style={{background:'#fff', display:'flex', flexDirection:'column'}}>
                    <Grid item style={{display:'flex', justifyContent:'end'}}>
                        <Button onClick={onClose}><img src={close} style={{height:'25px'}}></img></Button>
                    </Grid>
                    <Grid style={{display:'flex', justifyContent:'center'}}>
                        <Typography className={classes.header}>Post an Announcement</Typography>
                    </Grid>
                    <Grid style={{display:'flex', flexDirection:'column', margin: '20px 0 0 0',}}>
                        {isTitleMissing && (
                            <Typography style={{ color: "rgb(255,0,0)"}} variant={"body2"}>
                            Please enter an announcement title
                            </Typography>
                        )}
                        <input value={title} onChange={handleEnteredTitle} className={classes.input} placeholder='Announcement title' required/>
                        {isContentMissing && (
                            <Typography style={{ color: "rgb(255,0,0)"}} variant={"body2"}>
                            Please enter content for the announcement
                            </Typography>
                        )}
                        <textarea value={content} onChange={handleEnteredBody} placeholder="Enter an announcement..." className={classes.input} rows='4' style={{resize:'none'}}/>                    
                    </Grid>
                    <Grid className={classes.divider}></Grid>
                    <Grid style={{display:'flex', flexDirection:'column', padding:'10px 0 20px 0'}}>
                        <Grid item style={{display:'flex', justifyContent:'center'}}>
                            <Typography className={classes.subheader}>Who can see your announcement post?</Typography>
                        </Grid>
                        <RadioGroup
                            column
                            name="position"
                            value={radiobtn}
                            className={classes.radioGroup}
                        >
                            <Button className={classes.radiobtn} onClick={handleRadioBtn1}>
                                <Grid style={{display:'flex', alignItems:'center'}}>
                                    <Grid style={{background:'lightgray', borderRadius:'50%', padding:'3px'}}>
                                        <img src={publicIcon} className={classes.img} />
                                    </Grid>
                                    <Grid style={{textAlign:'left'}}>
                                        <Typography className={classes.radioFont}>All Club Members</Typography>
                                        <Typography style={{fontSize:'9pt', marginLeft:'10px'}}>Visible by general club members, admins, and club owner</Typography>
                                    </Grid>
                                </Grid>
                                <FormControlLabel
                                value="1"
                                control={<Radio />}
                                labelPlacement="start"
                                className={classes.test}
                                />
                            </Button>
                            <Button className={classes.radiobtn} onClick={handleRadioBtn2}>
                                <Grid style={{display:'flex', alignItems:'center'}}>
                                    <Grid style={{background:'lightgray', borderRadius:'50%', padding:'3px'}}>
                                        <img src={privateIcon} className={classes.img} />
                                    </Grid>
                                    <Grid style={{textAlign:'left'}}>
                                        <Typography className={classes.radioFont}>Admins Only</Typography>
                                        <Typography style={{fontSize:'9pt', marginLeft:'10px'}}>Not visible by general club members</Typography>
                                    </Grid>
                                </Grid>
                                <FormControlLabel
                                value="2"
                                control={<Radio />}
                                labelPlacement="start"
                                />
                            </Button>
                        </RadioGroup>
                    </Grid>
                    <Grid style={{display:'flex', justifyContent:'end'}}>
                        <Button variant='outlined' color='primary' onClick={handlePost}>Post Announcement</Button>
                    </Grid>
                </Grid>
            </div>
        </>
    )

}

export default AnnouncementForm;