import React, {useState} from "react";
import { useParams } from 'react-router-dom';
import { makeStyles, Menu, MenuItem, IconButton, Box, Card, Grid, Button, ButtonGroup, Typography, Collapse, CardContent, Tooltip, Dialog } from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import { Pagination } from "@material-ui/lab";
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
import CloseIcon from '@material-ui/icons/Close';
import { serverURL } from "../../constants/config";
import { deepOrange, indigo, teal, red, deepPurple, lightGreen } from '@material-ui/core/colors';
import { useUser } from '../Firebase';
import EventForm from "./EventForm";
import ClubBoardHeader from "./ClubBoardHeader";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import caution from '../../images/caution-icon.png';
import { Link } from "react-router-dom";
import EventPost from "./EventPost";


const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 800,
      margin: "0 auto",
      alignItems: "center",
      justifycontent: "center",
      marginTop: '30px',
      minHeight:'100vh',
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
        width:'265px',
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
    }, activeBtn3:{
        background:'rgba(0, 0, 0, 0.08)',
    }

  }));

const Events = () => {
    const classes = useStyles();
    const { clubID } = useParams();
    const [upcomingEvents, setUpcomingEvents] = React.useState([]);
    const [pastEvents, setPastEvents] = React.useState([]);
    const [openEventForm, setOpenEventForm] = React.useState(false);
    const user = useUser();
    const [isLoadingUpcomingEvents, setIsLoadingUpcomingEvents] = React.useState(true);
    const [isLoadingPastEvents, setIsLoadingPastEvents] = React.useState(true);
    const [admin, setAdmin] = React.useState(false);

    React.useEffect(() => {
        if (user) {
            let userID = user.uid;
            // console.log(userID)
            getUserRole(userID);
        } else {
            setAdmin(false);
        }
    }, [user]);

    const getUserRole = (userID) => {
        callApiGetUserRole(userID)
            .then(res => {
                var parsed = JSON.parse(res.express);
                if (parsed.length >= 1){
                    if (parsed[0].role === 'owner' || parsed[0].role === 'admin'){
                        setAdmin(true);
                    }
                } else {
                    setAdmin(false);
                }
                // console.log(parsed);
            })
    }

    const callApiGetUserRole = async (userID) => {
        const url = serverURL + '/api/getCurrentUserRole';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                clubID: clubID,
                userID: userID,
            })
        });

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

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
                setIsLoadingUpcomingEvents(false);

            })
        
        callApiGetPastEvents()
            .then(res => {
                var parsed = JSON.parse(res.express);
                setPastEvents(parsed);
                setIsLoadingPastEvents(false);
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
        <Grid style={{minHeight:'100vh', display:'flex', justifyContent:'space-around', paddingTop:'20px', background:'#f5f5f5'}}>
            <Grid xs={8}>
                <Grid>
                    <Card style={{padding:'20px'}}>
                    <Typography style={{fontSize:'22pt', fontWeight:'300'}}>Upcoming Events</Typography>
                        {upcomingEvents.length > 0 ? <>
                        {Object.values(upcomingEvents).map((event, index) => 
                            <EventPost event={event} admin={admin} index={index} currentUser={user} pastEvent={false} onChange={getEvents}/>
                        )}</> : <>
                        {!isLoadingUpcomingEvents &&
                        <Grid style={{display:'flex', justifyContent:'center', padding:'50px'}}>
                            <Typography style={{color: '#C0C0C0', letterSpacing: '0.5px', fontSize: '14pt'}}>NO UPCOMING EVENTS</Typography>
                        </Grid>
                        }</>}  
                    </Card>
                </Grid>
                <Grid style={{marginTop:'50px'}}>
                    <Card style={{padding:'20px'}}>
                    <Typography style={{fontSize:'22pt', fontWeight:'300'}}>Past Events</Typography>
                        {pastEvents.length > 0 ? 
                        <> 
                        {Object.values(pastEvents).map((event, index) => 
                            <EventPost event={event} admin={admin} index={index} currentUser={user} pastEvent={true} onChange={getEvents}/>
                        )}
                        </> : <> {!isLoadingPastEvents &&
                        <Grid style={{display:'flex', justifyContent:'center', padding:'50px'}}>
                            <Typography style={{color:'#C0C0C0', letterSpacing: '0.5px', fontSize: '14pt'}}>NO PAST EVENTS</Typography>
                        </Grid>} </>
                        }
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

// const EventPost = ({event, index, currentUser, pastEvent, onChange, admin}) => {
//     const classes = useStyles();
//     const [expanded, setExpanded] = React.useState(null);
//     const [attendance, setAttendance] = React.useState([]);
//     const [status, setStatus] = React.useState(null);

//     const [deleteEventModal, setDeleteEventModal] = React.useState(false);
//     const [attendanceModal, setAttendanceModal] = React.useState(false);

//     React.useEffect(() => {
//         getAttendance();
//     }, [])

//     const getAttendance = () => {
//         callApiGetAttendance()
//             .then(res => {
//                 var parsed = JSON.parse(res.express);
//                 setAttendance(parsed);
//                 if (parsed.length > 0){
//                     let user = parsed.find((member) => member.uid === currentUser.uid);
//                     let status = user.status
//                     if (status){
//                         setStatus(status)
//                     } else {
//                         setStatus(null);
//                     }
//                 }
//             })
//     }
    
//     const callApiGetAttendance = async () => {
//         const url = serverURL + '/api/getAttendance';
//         const response = await fetch(url, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 //authorization: `Bearer ${this.state.token}`
//             },
//             body: JSON.stringify({
//                 eventID: event.id,
//             })
//         });
//         const body = await response.json();
//         if (response.status !== 200) throw Error(body.message);
//         return body;
//     }
    
//     const getStatus = () => {
//         if (attendance.length > 0){
//             console.log('in')
//             let user = attendance.find((member) => member.uid === currentUser.uid);
//             let status = user.status
//             return status || null
//         }
//         return null
//     }

//     const handleEvent = (e) => {
//         if (status) {
//             callApiChangeAttendance(e.currentTarget.value)
//             .then(res => {
//                 var parsed = JSON.parse(res.express);
//                 getAttendance();
//             })

//         } else {
//             callApiSetAttendance(e.currentTarget.value)
//             .then(res => {
//                 var parsed = JSON.parse(res.express);
//                 getAttendance();
//             })
//         }
    
//     }

//     const callApiSetAttendance = async (newStatus) => {
//         const url = serverURL + '/api/setAttendance';
//         const response = await fetch(url, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 //authorization: `Bearer ${this.state.token}`
//             },
//             body: JSON.stringify({
//                 eventID: event.id,
//                 userID: currentUser.uid,
//                 attendanceStatus: newStatus,
//                 name: currentUser.displayName,
//             })
//         });

//         const body = await response.json();
//         if (response.status !== 200) throw Error(body.message);
//         return body;
//     }

//     const callApiChangeAttendance = async (newStatus) => {
//         const url = serverURL + '/api/changeAttendance';
//         const response = await fetch(url, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 //authorization: `Bearer ${this.state.token}`
//             },
//             body: JSON.stringify({
//                 eventID: event.id,
//                 userID: currentUser.uid,
//                 attendanceStatus: newStatus,
//             })
//         });

//         const body = await response.json();
//         if (response.status !== 200) throw Error(body.message);
//         return body;
//     }
    
//     const attending = attendance.filter((member) => member.status === 'going');
//     const maybeAttending = attendance.filter((member) => member.status === 'maybe');
//     const notAttending = attendance.filter((member) => member.status === 'not going');

//     const handleExpandClick = (clickedIndex) => {
//         if (expanded === clickedIndex){
//             setExpanded(null)
//         } else {
//             setExpanded(clickedIndex)
//         }
//     };

    
//     let startTimeText = event.start_time_text.split(' ');
//     let start_date = startTimeText[1] + ' ' + startTimeText[2]
//     let start_time = ''
//     if (!event.allDay){
//         start_time = startTimeText[4] + ' ' + startTimeText[5]
//     } else {
//         start_date = start_date + ' ' + startTimeText[3]
//     }

//     let endTimeText = ''
//     let end_date = ''
//     let end_time = ''
//     if (event.end_time_text){
//         endTimeText = event.start_time_text.split(' ');
//         end_date = endTimeText[1] + ' '+ endTimeText[2] 
//         end_time = endTimeText[4] + ' ' + endTimeText[5]
//     }

//     const handleDelete = () => {
//         callApiDeleteEvent()
//             .then(res => {
//                 var parsed = JSON.parse(res.express);
//                 onChange();
//             })
//     }

//     const callApiDeleteEvent = async () => {
//         const url = serverURL + '/api/deleteEvent';
//         const response = await fetch(url, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 //authorization: `Bearer ${this.state.token}`
//             },
//             body: JSON.stringify({
//                 eventID: event.id,
//             })
//         });

//         const body = await response.json();
//         if (response.status !== 200) throw Error(body.message);
//         return body;
//     }

//     let allDayTime = event.start_time_text.split(' ');
//     allDayTime = allDayTime[0] + ' ' + allDayTime[1] + ' ' + allDayTime[2] + ' ' + allDayTime[3]

//     return(
//         <Card style={{ margin:'20px 0 30px', padding:'20px 10px 20px 20px'}}>
//             <Grid style={{display:'flex'}}>
//                 <Grid sx={3}>
//                     <EventImage image={event.placeholderPhoto} skeletonWidth={280} skeletonHeight = {180}/>
//                 </Grid>

//                 <Grid xs={7} style={{borderRight:'1px solid lightgray', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
//                     <Grid>
//                         <Grid style={{display:'flex', padding:'0 10px 0 30px', justifyContent:'space-between', alignItems:'center'}}>
//                             <Typography color='secondary' style={{fontFamily:"system-ui",letterSpacing:'1.1px', fontSize: '11pt', fontWeight: 400}}>
//                                 {event.allDay ? <>{allDayTime}</> : <>{event.start_time_text}</>}
//                             </Typography>
//                             {admin && <>
//                             <LongMenu deleteEvent={()=> setDeleteEventModal(true)}/>
//                             <DeleteDialog open={deleteEventModal} close={()=>{setDeleteEventModal(false)}} onSubmit={handleDelete} title={event.title} /> </>}
//                         </Grid>
//                         <Typography style={{padding: '5px 30px', fontSize: '18pt', fontWeight: 600}}>{event.title}</Typography>
//                         <Typography style={{padding: '5px 30px', fontSize: '10pt', fontWeight: 400}}>{event.body}</Typography>
//                     </Grid>

//                     <Grid style={{display:'flex', justifyContent:'end', padding:'0 30px'}}>
//                         <Button onClick={() => {handleExpandClick(index)}} style={{textTransform:'none', margin:'5px 0'}}>
//                             <b style={{color:'rgba(0, 0, 0, 0.54)', letterSpacing:'0.5px', fontSize:'9.5pt'}}>
//                                {expanded === null && <>MORE</>}{expanded !== null && <>LESS</>} DETAILS
//                             </b>
//                             {expanded === null && <ExpandMoreIcon color="action"/>}
//                             {expanded !== null && <ExpandLessIcon color="action"/>}
//                         </Button>
//                     </Grid>
//                 </Grid>
//                 <Grid xs={2} style={{ paddingLeft:'10px', marginLeft:'10px', display:'flex', flexDirection:'column', alignItems:'end', justifyContent:'space-between'}}>
//                     <Grid style={{display:'flex', flexDirection:'column', marginRight:'10px'}}>
//                         <Typography style={{display: 'flex', paddingLeft:'10px', paddingBottom: '6px',fontSize: '10.5pt',color: 'grey'}}>
//                             {!pastEvent && <>{(status) ? <>Your status:</> : <>Set your status:</> }</>}
//                         </Typography>
//                         {!pastEvent && <>
//                         <Button 
//                             value={"going"}
//                             disabled={pastEvent}
//                             onClick={handleEvent}
//                             className={[status === 'going' && classes.activeBtn1, (status && status !== 'going') && classes.inactiveBtn, ]} 
//                             style={{fontSize:'10.5pt', width:'130px', textTransform:'none', margin:'5px', borderRadius:'20px'}} 
//                             variant='outlined' 
//                             color='primary'>
//                             Attending{!status && <>?</>}
//                         </Button>
//                         <Button value={"maybe"}
//                             disabled={pastEvent}
//                             onClick={handleEvent} className={[status === 'maybe' && classes.activeBtn1,(status && status !== 'maybe') && classes.inactiveBtn]} style={{fontSize:'10.5pt',width:'130px',textTransform:'none', margin:'5px', borderRadius:'20px'}} variant='outlined' color='primary'>
//                             Might Attend{!status && <>?</>}
//                         </Button>
//                         <Button value={"not going"}
//                             disabled={pastEvent}
//                             onClick={handleEvent} className={[status === 'not going' && classes.activeBtn1, (status && status !== 'not going') && classes.inactiveBtn]} style={{fontSize:'10.5pt',width:'130px',textTransform:'none', margin:'5px', borderRadius:'20px'}} variant='outlined' color='primary'>
//                             Not Attending{!status && <>?</>}
//                         </Button> </>}
//                         {pastEvent && <>
//                             <Button
//                                 disabled
//                                 className={[status === 'going' ? classes.activeBtn2 : classes.hidden]} 
//                                 style={{fontSize:'10.5pt', width:'130px', textTransform:'none', margin:'5px', borderRadius:'20px'}} 
//                                 variant='outlined' 
//                                 color='primary'>
//                                 Attended
//                             </Button>
//                             <Button
//                                 disabled
//                                 className={[status !== 'going' ? classes.activeBtn2 : classes.hidden]} 
//                                 style={{fontSize:'10.5pt',width:'130px',textTransform:'none', margin:'5px', borderRadius:'20px'}} 
//                                 variant='outlined' 
//                                 color='primary'>
//                                 Did not attend
//                             </Button>
//                         </>}
//                     </Grid>
//                 </Grid>
//             </Grid>
//             <Collapse in={expanded === index} timeout="auto" unmountOnExit>
//                 <CardContent style={{borderTop:'1px solid lightgrey', marginTop:'20px'}}>
//                     <Grid style={{display:'flex'}}>
//                         <Grid xs={4} style={{paddingRight:'15px'}}>
//                             <Typography className={classes.detailsHeader}>Additional Event Info</Typography>
//                             <Typography paragraph>{event.additionalDetails}</Typography>
//                         </Grid>
//                         <Grid xs={4} style={{display:'flex', flexDirection:'column', padding:'0 15px', borderLeft:'1px lightgrey solid', borderRight:'1px lightgrey solid'}}>
//                             <Grid style={{display:'flex',justifyContent:'space-between', marginBottom:'15px'}}>
//                                 <Grid style={{display:'flex', flexDirection:'column', margin: '0 0 0 10px'}}>
//                                     <Typography className={classes.detailsHeader}>Start Date/Time</Typography>
//                                     <Typography>{start_date}</Typography>
//                                     <Typography>{start_time}</Typography>
//                                 </Grid>
//                                 {(event.end_time_text && event.allDay == '0') &&
//                                 <Grid style={{display:'flex', paddingLeft:'20px', flexDirection:'column',  borderLeft: '1px solid lightgrey', margin: '0 0px 0 10px'}}>
//                                     <Typography className={classes.detailsHeader}>End Date/Time</Typography>
//                                     <Typography>{end_date}</Typography>
//                                     <Typography>{end_time}</Typography>

//                                 </Grid>}
//                             </Grid>
//                             <Grid style={{display:'flex', flexDirection:'column', marginLeft:'10px', marginBottom:'15px'}}>
//                                 <Typography className={classes.detailsHeader}>Type of Event</Typography>
//                                 <Grid style={{display:'flex'}}>
//                                     {event.location_type === 'online' &&
//                                     <Typography style={{fontSize:'11pt', borderRadius:'14px', background:'#FF6B6B', padding:'5px 10px', marginRight:'5px', color:'white'}}>Online</Typography>}
//                                     {event.location_type === 'in-person' &&
//                                     <Typography style={{fontSize:'11pt', borderRadius:'14px', background:'#7A86CC', padding:'5px 10px', marginRight:'5px', color:'white'}}>In-person</Typography>}
//                                     {event.allDay == 1 &&
//                                      <Typography style={{fontSize:'11pt', borderRadius:'14px', background:'#5FB49C', padding:'5px 10px', color:'white', marginRight:'5px'}}>All Day</Typography>}
//                                 </Grid>
//                             </Grid>
//                             <Grid style={{display:'flex', flexDirection:'column', marginLeft:'10px', marginBottom:'15px'}}>
//                                 <Typography className={classes.detailsHeader}>Location</Typography>
//                                 {event.location_type === 'online' &&
//                                 <Typography>
//                                     <Link target="_blank" to={'http://www.'+event.location}>
//                                         {event.location}
//                                     </Link>
//                                 </Typography>}
//                                 {event.location_type === 'in-person' && 
//                                 <Typography style={{fontSize:'11pt'}}>{event.location}</Typography>}
//                             </Grid>
//                             {event.price &&
//                             <Grid style={{display:'flex', flexDirection:'column', marginLeft:'10px'}}>
//                                 <Typography className={classes.detailsHeader}>Price</Typography>
//                                 <Typography style={{fontSize:'11pt'}}>${event.price}</Typography>
//                             </Grid>}
//                         </Grid>
//                         <Grid xs={4} style={{padding:'0 15px', display:'flex', flexDirection:'column'}}>
//                             <Grid style={{display:'flex'}}>
//                                 <PeopleIcon color="action"  />
//                                 <Typography style={{color:'rgba(0, 0, 0, 0.54)', padding:'0 0 10px 10px'}}>{attendance.length} member{attendance.length != 1 && <>s</>} responded</Typography>
//                             </Grid>
//                             {attending.length > 0 &&
//                             <Grid>
//                                 <Typography className={classes.detailsHeader}>Going</Typography>
//                                 <AvatarGroupList list={attending} />
//                             </Grid>}
//                             {maybeAttending.length > 0 && 
//                             <Grid>
//                                 <Typography className={classes.detailsHeader}>Maybe</Typography>
//                                 <AvatarGroupList list={maybeAttending} />
//                             </Grid>}
//                             {notAttending.length > 0 &&
//                             <Grid>
//                                 <Typography className={classes.detailsHeader}>Not Going</Typography>
//                                 <AvatarGroupList list={notAttending} />
//                             </Grid>}
//                             {attendance.length > 0 && <>
//                             <Button variant="outlined" color="primary" style={{textTransform:'none', margin:'20px 0'}} onClick={()=>{setAttendanceModal(true)}}>See Attendance List</Button>
//                             <AttendanceModal open={attendanceModal} close={()=>{setAttendanceModal(false)}} going={attending} maybe={maybeAttending} notGoing={notAttending}/>
//                             </>}
//                         </Grid>  
//                     </Grid>
//                 </CardContent>
//             </Collapse>
//         </Card>
//         )
        
// }

const AvatarGroupList = ({list}) => {
    const getColour = (name) =>{
        if (name.length <= 6 ) {
            return indigo[300];
        } else if (name.length > 6 && name.legnth <= 8){
            return deepOrange[300];
        } else if (name.length > 8 && name.legnth <= 12){
            return lightGreen[300];
        } else if (name.length > 12 && name.length <= 16){
            return red[300];
        } else if (name.length > 16 && name.length <= 20){
            return deepPurple[300];
        } 
        return teal[300];
    }
    const classes = useStyles();

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
                    style={{backgroundColor: getColour(member.name)}}>
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

const ITEM_HEIGHT = 48;

const LongMenu = ({deleteEvent}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={()=>{deleteEvent(); handleClose();}} >
            <DeleteIcon onClick={()=>{deleteEvent(); handleClose();}} style={{marginRight:'5px'}}/> Delete Event
        </MenuItem>
      </Menu>
    </div>
  );
}


const DeleteDialog = ({open, close, onSubmit, title}) => {

    if (!open) return null
    return(
        <Dialog open={open} close={close}>
            <Grid container style={{display:'flex', flexDirection:'column', padding:'25px 25px 15px'}}>
                <Grid item style={{display:'flex', justifyContent:'center'}}>
                    <img src={caution} style={{height:'70px', marginLeft:'15px'}} />
                    <Box>
                        <Typography style={{margin:'10px 20px 5px 20px', fontWeight:'600', letterSpacing:'0.02em'}}>Delete Event</Typography>
                        <Typography style={{margin:'0 20px 20px 20px'}}>Are you sure you want to delete the following event?</Typography>
                        <Typography style={{margin:'0 20px 20px 20px'}}>Event title: <b>{title}</b></Typography>
                    </Box> 
                </Grid>
                <Grid style={{display:'flex', flexDirection:'row', justifyContent:'center', padding:'10px 10px 15px 10px'}}>
                    <Button fullWidth onClick={close} variant='outlined' style={{margin:'0 10px'}}>Cancel</Button>
                    <Button fullWidth onClick={()=> {onSubmit(); close();}} variant='outlined' style={{margin:'0 10px', background:'#F01C39', color:'white'}}>Delete</Button>   
                </Grid>
            </Grid>
        </Dialog>
    )
}

const AttendanceModal = ({open, close, going, notGoing, maybe}) => {
    const classes = useStyles();
    const [activeBtn, setActiveBtn] = React.useState('1');

    const handleClick = (e) => {
        setActiveBtn(e.currentTarget.value);
    };

    
    if (!open) return null
    return(
        <>
        <Dialog open={open} close={close}>
            <Grid style={{width:'400px'}}>
                <Grid style={{display:'flex', justifyContent:'end'}}>
                    <IconButton onClick={close}>
                        <CloseIcon/>
                    </IconButton>
                </Grid>
                <Grid style={{padding:'0 20px 20px'}}>
                    <Grid style={{textAlign:'center', margin:'-25px 0 10px 0'}}>
                        <Typography>Event Attendance List</Typography>
                    </Grid>
                    <Grid>
                        <ButtonGroup fullWidth value={activeBtn}>
                            <Button 
                                value="1" 
                                onClick={handleClick}
                                className={activeBtn === '1' && classes.activeBtn3 }
                                style={{padding:'10px 0', borderBottomLeftRadius: 0, color:'rgba(0, 0, 0, 0.38)'}}>
                                Going
                            </Button>
                            <Button onClick={handleClick} className={activeBtn === '2' && classes.activeBtn3 } value="2" style={{color:'rgba(0, 0, 0, 0.38)'}}>
                                Maybe
                            </Button>
                            <Button onClick={handleClick} className={activeBtn === '3' && classes.activeBtn3 } value="3" style={{borderBottomRightRadius: 0, color:'rgba(0, 0, 0, 0.38)'}}>
                                Not Going
                            </Button>
                        </ButtonGroup>
                    </Grid>
                    {activeBtn === '1' && <ButtonListItem list={going} emptyMessage={"No members declared they are going"}/>}
                    {activeBtn === '2' && <ButtonListItem list={maybe} emptyMessage={"No members declared they might be going"}/>}
                    {activeBtn === '3' && <ButtonListItem list={notGoing} emptyMessage={"No members declared they are not attending"}/>}
                </Grid>
            </Grid>
        </Dialog>
        </>
    )

}

const ButtonListItem = ({list, emptyMessage}) => {
    const classes = useStyles();
    const getColour = (name) =>{
        if (name.length <= 6 ) {
            return indigo[300];
        } else if (name.length > 6 && name.legnth <= 8){
            return deepOrange[300];
        } else if (name.length > 8 && name.legnth <= 12){
            return lightGreen[300];
        } else if (name.length > 12 && name.length <= 16){
            return red[300];
        } else if (name.length > 16 && name.length <= 20){
            return deepPurple[300];
        } 
        return teal[300];
    }
    const initials = (name) => {
        let x = name.split(' ');
        let firstInitial = x[0][0];
        let lastInitial = x[1][0]
        return firstInitial+lastInitial
    }
    
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(4);
    const indexOfLastUser = (currentPage) * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = list.slice(indexOfFirstUser, indexOfLastUser);
    const handlePageClick = (event, value) => {
        setCurrentPage(value);
    }

    return(<> 
    <Grid style={{border:'1px solid rgba(0, 0, 0, 0.12)', borderTop:'0', borderBottom:'0'}}>
        {list.length > 0 ? <>
        {Object.values(currentUsers).map((member, index) => 
            <Grid style={{display:'flex', padding:'10px 5px', alignItems:'center', borderBottom:'1px solid rgba(0, 0, 0, 0.12)'}}>
                <Avatar 
                    style={{backgroundColor: getColour(member.name)}}>
                    {initials(member.name)}
                </Avatar>
                <Typography style={{paddingLeft:'10px'}}>
                    {member.name}
                </Typography>
            </Grid>
        )}</> : 
        <Grid style={{borderBottom:'1px solid rgba(0, 0, 0, 0.12)', textAlign:'center'}}>
            <Typography style={{padding:'30px', color:'grey'}}>
                    {emptyMessage}
            </Typography>
        </Grid>}
    </Grid>
    <Grid style={{display:'flex', justifyContent:'center', padding:'10px 0'}}>
        <Pagination variant="outlined" color="primary" shape='rounded' count={Math.ceil(list.length/usersPerPage)} page={currentPage} onChange={handlePageClick}/>
    </Grid></>)
}
