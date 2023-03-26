import React, {useEffect, useRef, useQuery, useState} from "react";
import history from '../Navigation/history';
import { useParams } from 'react-router-dom';
import { makeStyles, Card, Grid, Button, Typography, Collapse, CardContent, Tooltip, Dialog } from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import sidebar from '../../images/events/sidebar.jpg'
import PeopleIcon from '@material-ui/icons/People';
import img1 from '../../images/events/celebration.png'
import img2 from '../../images/events/meeting.png'
import img3 from '../../images/events/celebration2.png'
import img4 from '../../images/events/karaoke.png'
import img5 from '../../images/events/meeting2.png'
import img6 from '../../images/events/cocktail.png'
import img7 from '../../images/events/conference.png'
import img8 from '../../images/events/celebration3.png'
import img9 from '../../images/events/concert.png'
import img10 from '../../images/events/meeting3.jpg'
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { serverURL } from "../../constants/config";
import { deepOrange, indigo, teal, red, deepPurple, lightGreen } from '@material-ui/core/colors';
import { useUser } from '../Firebase';
import EventForm from "./EventForm";
import ClubBoardHeader from "./ClubBoardHeader";


const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 800,
      margin: "0 auto",
      alignItems: "center",
      justifycontent: "center",
      marginTop: '30px'
    },
    btn: {
        textTransform:'none',
        background:'#3f51b5',
        color:'#fff',
        display:'flex',
        borderRadius:'18px',
        padding:'8px 15px',
        "&:hover":{
            background:'#5362b8'
        }
    },
    card: {
      border: "1px solid #ddd",
      borderRadius: 5,
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      padding: 16,
    },
    img:{
        height:'180px',
        borderRadius:'12px',
        
    }, detailsHeader:{
        color:'#808080', 
        fontSize:'10.5pt',
        paddingBottom:'2.5px'
    },
    avatarGroup:{
        "&:hover":{
            cursor: 'pointer',
        }
    },
    orangeAvatar:{
        backgroundColor: deepOrange[300],
    },
    indigoAvatar:{
        backgroundColor: indigo[300],
    },
    blueAvatar:{
        backgroundColor: teal[300],
    },
    redAvatar:{
        backgroundColor: red[300],
    },
    purpleAvatar:{
        backgroundColor: deepPurple[300],
    },
    greenAvatar:{
        backgroundColor: lightGreen[300],
    },
    activeBtn1:{
        background: 'rgb(63, 81, 181)',
        color: 'white !important',
        '&:hover':{
            background:'#495CC7',
        }
    }, activeBtn2:{
        background: '#808080',
        color: 'white !important',
        border:'1px solid #808080'
    },
    inactiveBtn:{
        border: 'lightgrey 1px solid',
        color: 'grey',
    }, hidden:{
        display:'none',
    }

  }));

const Events = () => {
    const classes = useStyles();
    const { clubID } = useParams();
    const [upcomingEvents, setUpcomingEvents] = React.useState([]);
    const [pastEvents, setPastEvents] = React.useState([]);
    const [openEventForm, setOpenEventForm] = React.useState(false);
    const user = useUser();


    React.useEffect(() => {
        getEvents();
    }, [])

    const timestamp = () => {
        let today = new Date();
        const leadingZero = (n) => {
            if (n.toString.length == 1){
                n = '0' + n;
                return n;
            }
            return n;
        }
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+leadingZero(today.getHours())+':'+leadingZero(today.getMinutes())+':'+today.getSeconds();
        return date;
    }

    const getEvents = () => {
        callApiGetUpcomingEvents()
            .then(res => {
                var parsed = JSON.parse(res.express);
                setUpcomingEvents(parsed);
            })
        
        callApiGetPastEvents()
            .then(res => {
                var parsed = JSON.parse(res.express);
                setPastEvents(parsed);
            })
    }

    const callApiGetUpcomingEvents = async () => {
        const url = serverURL + '/api/getUpcomingEvents';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                clubID: clubID,
                todaysDate: timestamp(),
            })
        });

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    const callApiGetPastEvents = async () => {
        const url = serverURL + '/api/getPastEvents';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                clubID: clubID,
                todaysDate: timestamp(),
            })
        });

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    const handleClose = (e) => {
        console.log('close')
        setOpenEventForm(false);
        console.log(openEventForm);
    };

    const handleOpen = (e) => {
        console.log('open')
        setOpenEventForm(true);
    };

    console.log(openEventForm)


    return(<>
        <ClubBoardHeader active={"2"}/>
        <Grid style={{display:'flex', justifyContent:'space-around', paddingTop:'20px', background:'#f5f5f5'}}>
            <Grid xs={8}>
                <Grid>
                    <Card style={{padding:'20px'}}>
                    <Typography style={{fontSize:'22pt', fontWeight:'300'}}>Upcoming Events</Typography>
                        {Object.values(upcomingEvents).map((event, index) => 
                            <EventList event={event} index={index} currentUser={user} pastEvent={false}/>
                        )}
                    </Card>
                </Grid>
                <Grid style={{marginTop:'50px'}}>
                    <Card style={{padding:'20px'}}>
                    <Typography style={{fontSize:'22pt', fontWeight:'300'}}>Past Events</Typography>
                        {Object.values(pastEvents).map((event, index) => 
                            <EventList event={event} index={index} currentUser={user} pastEvent={true}/>
                        )}
                    </Card>
                </Grid>
            </Grid>
            <Grid xs={3} style={{maxWidth:'290px', textAlign:'center'}}>
                <Card style={{display:'flex',flexDirection:'column' ,alignItems:'center'}}>
                    <Typography style={{padding:'20px', fontSize:'14pt', fontWeight:'200'}}>Do you have an event coming up?</Typography>
                    <Button 
                        className={classes.btn} 
                        onClick = {handleOpen}>
                        <Typography style={{paddingRight:'5px'}}>+</Typography>
                        <Typography>Create Event</Typography>
                    </Button>
                    <EventFormDialog open={openEventForm} close={handleClose} clubID={clubID} onChange={getEvents}/>
                    <Grid style={{padding:'10px', display:'flex', justifyContent:'center', flexDirection:'column'}}>
                        <EventImage image={11} skeletonWidth={250} skeletonHeight = {160}/>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    </>)
}

export default Events;

const EventImage = ({image, skeletonWidth, skeletonHeight}) => {
    const placeholders = {
        1:img1,
        2:img2,
        3:img3,
        4:img4,
        5:img5,
        6:img6,
        7:img7,
        8:img8,
        9:img9,
        10:img10,
        11:sidebar,
    }

    const classes = useStyles();
    const [loading, setLoading] = useState(true);

    return(
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", }} >
            <img 
                src={placeholders[image]} 
                className={classes.img}
                style={{display: loading?"none":"block", width:"100%"}} 
                onLoad={(e)=>{setLoading(false)}} />
            <Skeleton 
                variant="rect" 
                animation="pulse" 
                width={skeletonWidth} 
                height={skeletonHeight} 
                style={{display: !loading&&"none", borderRadius:'12px'}} />
        </div> 
    )
}

const EventList = ({event, index, currentUser, pastEvent}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(null);
    const [attendance, setAttendance] = React.useState([]);
    const [status, setStatus] = React.useState(null);

    React.useEffect(() => {
        getAttendance();
    }, [])

    const getAttendance = () => {
        callApiGetAttendance()
            .then(res => {
                var parsed = JSON.parse(res.express);
                setAttendance(parsed);
                if (parsed.length > 0){
                    let user = parsed.find((member) => member.uid === currentUser.uid);
                    let status = user.status
                    if (status){
                        setStatus(status)
                    } else {
                        setStatus(null);
                    }
                }
            })
    }
    
    const callApiGetAttendance = async () => {
        const url = serverURL + '/api/getAttendance';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                eventID: event.id,
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }
    
    const getStatus = () => {
        if (attendance.length > 0){
            console.log('in')
            let user = attendance.find((member) => member.uid === currentUser.uid);
            let status = user.status
            return status || null
        }
        return null
    }

    const handleEvent = (e) => {
        // console.log(currentUser);
        // let name = currentUser.displayName
        // console.log(name)
        if (status) {
            callApiChangeAttendance(e.currentTarget.value)
            .then(res => {
                var parsed = JSON.parse(res.express);
                getAttendance();
            })

        } else {
            callApiSetAttendance(e.currentTarget.value)
            .then(res => {
                var parsed = JSON.parse(res.express);
                getAttendance();
            })
        }
    
    }

    const callApiSetAttendance = async (newStatus) => {
        const url = serverURL + '/api/setAttendance';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                eventID: event.id,
                userID: currentUser.uid,
                attendanceStatus: newStatus,
                name: currentUser.displayName,
            })
        });

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    const callApiChangeAttendance = async (newStatus) => {
        const url = serverURL + '/api/changeAttendance';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                eventID: event.id,
                userID: currentUser.uid,
                attendanceStatus: newStatus,
            })
        });

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }
    
    const attending = attendance.filter((member) => member.status === 'going');
    const maybeAttending = attendance.filter((member) => member.status === 'maybe');
    const notAttending = attendance.filter((member) => member.status === 'not going');

    const handleExpandClick = (clickedIndex) => {
        if (expanded === clickedIndex){
            setExpanded(null)
        } else {
            setExpanded(clickedIndex)
        }
    };

    
    let startDateTime = event.start_time_text.split(' ');
    startDateTime = startDateTime[1] + ' '+ startDateTime[2] + ' '+  startDateTime[4] + ' ' + startDateTime[5]

    let endDateTime = ''
    if (event.end_time_text){
        let endDateTime = event.start_time_text.split(' ');
        endDateTime = endDateTime[1] + ' '+ endDateTime[2] + ' '+  endDateTime[4] + ' ' + endDateTime[5]
    }


    return(
        <Card style={{ margin:'20px 0 30px', padding:'20px 10px 20px 20px'}}>
            <Grid style={{display:'flex'}}>
                <Grid sx={3}>
                    <EventImage image={event.placeholderPhoto} skeletonWidth={280} skeletonHeight = {180}/>
                </Grid>
                <Grid xs={7} style={{borderRight:'1px solid lightgray',}}>
                    <Typography color='secondary' style={{fontFamily:"system-ui",letterSpacing:'1.1px', padding: '2px 30px 0px 30px', fontSize: '11pt', fontWeight: 400}}>
                        {event.start_time_text}
                    </Typography>
                    <Typography style={{padding: '5px 30px', fontSize: '18pt', fontWeight: 600}}>{event.title}</Typography>
                    <Typography style={{padding: '5px 30px', fontSize: '10pt', fontWeight: 400}}>{event.body}</Typography>
                    <Grid style={{display:'flex', justifyContent:'end', padding:'0 30px'}}>
                        <Button onClick={() => {handleExpandClick(index)}} style={{textTransform:'none', margin:'5px 0'}}>
                            <b style={{color:'rgba(0, 0, 0, 0.54)', letterSpacing:'0.5px', fontSize:'9.5pt'}}>
                               {expanded === null && <>MORE</>}{expanded !== null && <>LESS</>} DETAILS
                            </b>
                            {expanded === null && <ExpandMoreIcon color="action"/>}
                            {expanded !== null && <ExpandLessIcon color="action"/>}
                        </Button>
                    </Grid>
                </Grid>
                <Grid xs={2} style={{ paddingLeft:'10px', display:'flex', flexDirection:'column', alignItems:'end', justifyContent:'space-between'}}>
                    <Grid style={{display:'flex', flexDirection:'column'}}>
                        <Typography style={{display: 'flex', paddingLeft:'10px', paddingBottom: '6px',fontSize: '10.5pt',color: 'grey'}}>
                            {!pastEvent && <>{(status) ? <>Your status:</> : <>Set your status:</> }</>}
                        </Typography>
                        {!pastEvent && <>
                        <Button 
                            value={"going"}
                            disabled={pastEvent}
                            onClick={handleEvent}
                            className={[status === 'going' && classes.activeBtn1, (status && status !== 'going') && classes.inactiveBtn, ]} 
                            style={{fontSize:'10.5pt', width:'130px', textTransform:'none', margin:'5px', borderRadius:'20px'}} 
                            variant='outlined' 
                            color='primary'>
                            Attending{!status && <>?</>}
                        </Button>
                        <Button value={"maybe"}
                            disabled={pastEvent}
                            onClick={handleEvent} className={[status === 'maybe' && classes.activeBtn1,(status && status !== 'maybe') && classes.inactiveBtn]} style={{fontSize:'10.5pt',width:'130px',textTransform:'none', margin:'5px', borderRadius:'20px'}} variant='outlined' color='primary'>
                            Might Attend{!status && <>?</>}
                        </Button>
                        <Button value={"not going"}
                            disabled={pastEvent}
                            onClick={handleEvent} className={[status === 'not going' && classes.activeBtn1, (status && status !== 'not going') && classes.inactiveBtn]} style={{fontSize:'10.5pt',width:'130px',textTransform:'none', margin:'5px', borderRadius:'20px'}} variant='outlined' color='primary'>
                            Not Attending{!status && <>?</>}
                        </Button> </>}
                        {pastEvent && <>
                            <Button
                                disabled
                                className={[status === 'going' ? classes.activeBtn2 : classes.hidden]} 
                                style={{fontSize:'10.5pt', width:'130px', textTransform:'none', margin:'5px', borderRadius:'20px'}} 
                                variant='outlined' 
                                color='primary'>
                                Attended
                            </Button>
                            <Button
                                disabled
                                className={[status !== 'going' ? classes.activeBtn2 : classes.hidden]} 
                                style={{fontSize:'10.5pt',width:'130px',textTransform:'none', margin:'5px', borderRadius:'20px'}} 
                                variant='outlined' 
                                color='primary'>
                                Did not attend
                            </Button>
                        </>}
                    </Grid>
                </Grid>
            </Grid>
            <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                <CardContent style={{borderTop:'1px solid lightgrey', marginTop:'20px'}}>
                    <Grid style={{display:'flex'}}>
                        <Grid xs={4} style={{paddingRight:'15px'}}>
                            <Typography className={classes.detailsHeader}>Additional Event Info</Typography>
                            <Typography paragraph>{event.additionalDetails}</Typography>
                        </Grid>
                        <Grid xs={4} style={{display:'flex', flexDirection:'column', padding:'0 15px', borderLeft:'1px lightgrey solid', borderRight:'1px lightgrey solid'}}>
                            <Grid style={{display:'flex',justifyContent:'space-between', marginBottom:'15px'}}>
                                <Grid style={{display:'flex', flexDirection:'column', margin: '0 0 0 10px'}}>
                                    <Typography className={classes.detailsHeader}>Start Date/Time</Typography>
                                    <Typography style={{marginRight:'3px'}}>{startDateTime}</Typography>
                                </Grid>
                                {event.end_time_text &&
                                <Grid style={{display:'flex', flexDirection:'column',  borderLeft: '1px solid lightgrey', margin: '0 0px 0 10px'}}>
                                    <Typography className={classes.detailsHeader}>End Date/Time</Typography>
                                    <Typography>{endDateTime}</Typography>
                                </Grid>}
                            </Grid>
                            <Grid style={{display:'flex', flexDirection:'column', marginLeft:'10px', marginBottom:'15px'}}>
                                <Typography className={classes.detailsHeader}>Type of Event</Typography>
                                <Grid style={{display:'flex'}}>
                                    {event.location_type === 'online' &&
                                    <Typography style={{fontSize:'11pt', borderRadius:'14px', background:'#FF6B6B', padding:'5px 10px', marginRight:'5px', color:'white'}}>Online</Typography>}
                                    {event.location_type === 'in-person' &&
                                    <Typography style={{fontSize:'11pt', borderRadius:'14px', background:'#7A86CC', padding:'5px 10px', marginRight:'5px', color:'white'}}>In-person</Typography>}
                                    {event.allDay == 1 &&
                                     <Typography style={{fontSize:'11pt', borderRadius:'14px', background:'#5FB49C', padding:'5px 10px', color:'white', marginRight:'5px'}}>All Day</Typography>}
                                </Grid>
                            </Grid>
                            <Grid style={{display:'flex', flexDirection:'column', marginLeft:'10px', marginBottom:'15px'}}>
                                <Typography className={classes.detailsHeader}>Location</Typography>
                                {event.location_type === 'online' &&
                                <Typography><a>{event.location}</a></Typography>}
                                {event.location_type === 'in-person' && 
                                <Typography style={{fontSize:'11pt'}}>{event.location}</Typography>}
                            </Grid>
                            {event.price &&
                            <Grid style={{display:'flex', flexDirection:'column', marginLeft:'10px'}}>
                                <Typography className={classes.detailsHeader}>Price</Typography>
                                <Typography style={{fontSize:'11pt'}}>${event.price}</Typography>
                            </Grid>}
                        </Grid>
                        <Grid xs={4} style={{padding:'0 15px', display:'flex', flexDirection:'column'}}>
                            <Grid style={{display:'flex'}}>
                                <PeopleIcon color="action"  />
                                <Typography style={{color:'rgba(0, 0, 0, 0.54)', padding:'0 0 10px 10px'}}>{attendance.length} member{attendance.length != 1 && <>s</>} responded</Typography>
                            </Grid>
                            {attending.length > 0 &&
                            <Grid>
                                <Typography className={classes.detailsHeader}>Going</Typography>
                                <AvatarGroupList list={attending} />
                            </Grid>}
                            {maybeAttending.length > 0 && 
                            <Grid>
                                <Typography className={classes.detailsHeader}>Maybe</Typography>
                                <AvatarGroupList list={maybeAttending} />
                            </Grid>}
                            {notAttending.length > 0 &&
                            <Grid>
                                <Typography className={classes.detailsHeader}>Not Going</Typography>
                                <AvatarGroupList list={notAttending} />
                            </Grid>}
                        </Grid>  
                    </Grid>
                </CardContent>
            </Collapse>
        </Card>
        )
        
}

const AvatarGroupList = ({list}) => {
    const classes = useStyles();
    const colours = [indigo[300], deepOrange[300], deepPurple[300], teal[300], lightGreen[300], red[300]];
    const getColour = () => colours[Math.floor(Math.random() * colours.length)];
    
    const initials = (name) => {
        let x = name.split(' ');
        let firstInitial = x[0][0];
        let lastInitial = x[1][0]
        return firstInitial+lastInitial
    }

    return(<>
        <AvatarGroup max={2} className={classes.avatarGroup}>
            {Object.values(list).map((member) =>
                <Tooltip title={member.name}>
                    <Avatar 
                    style={{backgroundColor: getColour()}}>
                        {initials(member.name)}
                    </Avatar>
                </Tooltip>
            )}
        </AvatarGroup>
    </>)
}

const EventFormDialog = ({open, close, clubID, onChange}) => {
    if (!open) return null
    return(
        <>
        <Dialog open={open} close={close}>
            <EventForm close={close} clubID={clubID} onChange={onChange}/>
        </Dialog>
        </>
    )
}