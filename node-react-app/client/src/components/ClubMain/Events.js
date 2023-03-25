import React, {useEffect, useRef, useQuery, useState} from "react";
import history from '../Navigation/history';
import { useParams } from 'react-router-dom';
import { makeStyles, Card, Grid, Button, Typography, Collapse, CardContent } from "@material-ui/core";
import down from '../../images/down-arrow.png'
import Skeleton from '@material-ui/lab/Skeleton';
import sidebar from '../../images/events/sidebar.jpg'
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
import { serverURL } from "../../constants/config";


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
    }
  }));

const Events = () => {
    const classes = useStyles();
    const { clubID } = useParams();
    const [upcomingEvents, setUpcomingEvents] = React.useState([]);
    const [pastEvents, setPastEvents] = React.useState([]);

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

    // CLUB ANNOUNCEMENTS
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


    console.log(upcomingEvents);
    return(<>
        <Grid style={{display:'flex', justifyContent:'space-around', paddingTop:'20px'}}>
            <Grid xs={8}>
                <Grid>
                    <Card style={{padding:'20px'}}>
                    <Typography style={{fontSize:'22pt', fontWeight:'300'}}>Upcoming Events</Typography>
                        {Object.values(upcomingEvents).map((event, index) => 
                            <EventList event={event} index={index}/>
                        )}
                    </Card>
                </Grid>
                <Grid style={{marginTop:'50px'}}>
                    <Card style={{padding:'20px'}}>
                    <Typography style={{fontSize:'22pt', fontWeight:'300'}}>Past Events</Typography>
                        {Object.values(pastEvents).map((event, index) => 
                            <EventList event={event} index={index}/>
                        )}
                    </Card>
                </Grid>
            </Grid>
            <Grid xs={3} style={{maxWidth:'290px', textAlign:'center'}}>
                <Card style={{display:'flex',flexDirection:'column' ,alignItems:'center'}}>
                    <Typography style={{padding:'20px', fontSize:'14pt', fontWeight:'200'}}>Do you have an event coming up?</Typography>
                    <Button className={classes.btn} onClick={() => history.push(`/clubboard/${clubID}/eventform`)}>
                        <Typography style={{paddingRight:'5px'}}>+</Typography>
                        <Typography>Create Event</Typography>
                    </Button>
                    <Grid style={{padding:'10px', display:'flex', justifyContent:'center', flexDirection:'column'}}>
                        <EventImage image={sidebar} skeletonWidth={250} skeletonHeight = {160}/>
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
        10:img10
    }

    const classes = useStyles();
    const [loading, setLoading] = useState(true);

    return(
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", }} >
            <img 
                src={placeholders.image} 
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

const EventList = ({event, index}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(null);


    const handleExpandClick = (clickedIndex) => {
        if (expanded === clickedIndex){
            setExpanded(null)
        } else {
            setExpanded(clickedIndex)
        }
    };
    
    return(
        <Card style={{ margin:'20px 0 30px', padding:'20px'}}>
            <Grid style={{display:'flex'}}>
                <Grid sx={3}>
                    {event.visibility == 'public' && 
                        <EventImage image={img1} skeletonWidth={280} skeletonHeight = {180}/>
                    }
                    {event.visibility == 'private' && <>
                        <EventImage image={img2} skeletonWidth={280} skeletonHeight = {180}/>
                        </> }
                </Grid>
                <Grid xs={7}>
                    <Typography color='secondary' style={{fontFamily:"system-ui",letterSpacing:'1.1px', padding: '2px 30px 0px 30px', fontSize: '11pt', fontWeight: 400}}>{event.time}</Typography>
                    <Typography style={{padding: '5px 30px', fontSize: '18pt', fontWeight: 600}}>{event.title}</Typography>
                    <Typography style={{padding: '5px 30px', fontSize: '10pt', fontWeight: 400}}>{event.body}</Typography>
                </Grid>
                <Grid xs={2} style={{borderLeft:'1px solid lightgray', display:'flex', flexDirection:'column', alignItems:'end', justifyContent:'space-between'}}>
                    <Grid style={{display:'flex', flexDirection:'column'}}>
                        <Button style={{width:'110px', textTransform:'none', margin:'5px', borderRadius:'20px'}} variant='outlined' color='secondary'>
                            Attending
                        </Button>
                        <Button style={{width:'110px',textTransform:'none', margin:'5px', borderRadius:'20px'}} variant='outlined' color='primary'>
                            Interested
                        </Button>
                    </Grid>
                    <Grid>
                        <Button onClick={() => {handleExpandClick(index)}} style={{textTransform:'none', margin:'5px 0'}}>
                            More Details <img src={down} style={{height:'20px'}} />
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                <CardContent style={{borderTop:'1px solid lightgrey', marginTop:'20px'}}>
                    <Grid style={{display:'flex'}}>
                        <Grid xs={4} style={{paddingRight:'15px'}}>
                            <Typography className={classes.detailsHeader}>Additional Event Info</Typography>
                            <Typography paragraph>Faculty of Health Sciences Students' Council is thrilled to present: FHS Formal 2019! This year's theme is 007, so break out your classiest black and white couture and join us at the Doubletree by Hilton on February 8th at 8pm!</Typography>
                        </Grid>
                        <Grid xs={4} style={{display:'flex', flexDirection:'column', padding:'0 15px', borderLeft:'1px lightgrey solid', borderRight:'1px lightgrey solid'}}>
                            <Grid style={{display:'flex',justifyContent:'space-between', marginBottom:'15px'}}>
                                <Grid style={{display:'flex', flexDirection:'column', borderRight: '1px solid lightgrey', margin: '0 0 0 10px'}}>
                                    <Typography className={classes.detailsHeader}>Start Date/Time</Typography>
                                    <Typography>March 28 6:00PM</Typography>
                                </Grid>
                                <Grid style={{display:'flex', flexDirection:'column', margin: '0 0px 0 10px'}}>
                                    <Typography className={classes.detailsHeader}>End Date/Time</Typography>
                                    <Typography>March 28 9:00PM</Typography>

                                </Grid>
                            </Grid>
                            <Grid style={{display:'flex', flexDirection:'column', marginLeft:'10px', marginBottom:'15px'}}>
                                <Typography className={classes.detailsHeader}>Location</Typography>
                                <Typography style={{fontSize:'11pt'}}>RCH 302</Typography>
                            </Grid>
                            <Grid style={{display:'flex', flexDirection:'column', marginLeft:'10px'}}>
                                <Typography className={classes.detailsHeader}>Type of Event</Typography>
                                <Grid style={{display:'flex'}}>
                                    <Typography style={{fontSize:'11pt', borderRadius:'14px', background:'#F7ADC1', padding:'5px 10px', marginRight:'5px', color:'white'}}>Formal</Typography>
                                    <Typography style={{fontSize:'11pt', borderRadius:'14px', background:'#7A86CC', padding:'5px 10px', color:'white'}}>Recurring Event</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={4} style={{padding:'0 15px', display:'flex', flexDirection:'column', justifyContent:"space-between"}}>
                            <Grid>
                                <Typography className={classes.detailsHeader}>Going</Typography>
                                <AvatarGroup max={8} onClick={()=>{console.log('hello')}} className={classes.avatarGroup}>
                                    <Avatar alt="Remy Sharp">RT</Avatar>
                                    <Avatar alt="Travis Howard">AK</Avatar>
                                    <Avatar alt="Cindy Baker">LT</Avatar>
                                    <Avatar alt="Agnes Walker" >BM</Avatar>
                                    <Avatar alt="Trevor Henderson" >JR</Avatar>
                                    <Avatar alt="Cindy Baker">LT</Avatar>
                                    <Avatar alt="Agnes Walker" >BM</Avatar>
                                    <Avatar alt="Trevor Henderson" >JR</Avatar>
                                    <Avatar alt="Cindy Baker">LT</Avatar>
                                    <Avatar alt="Agnes Walker" >BM</Avatar>
                                    <Avatar alt="Trevor Henderson" >JR</Avatar>
                                    <Avatar alt="Cindy Baker">LT</Avatar>
                                    <Avatar alt="Agnes Walker" >BM</Avatar>
                                    <Avatar alt="Trevor Henderson" >JR</Avatar>
                                </AvatarGroup>
                            </Grid>
                            <Grid>
                                <Typography className={classes.detailsHeader}>Not Going</Typography>
                                <AvatarGroup max={8}>
                                    <Avatar alt="Remy Sharp">RT</Avatar>
                                    <Avatar alt="Travis Howard">AK</Avatar>
                                    <Avatar alt="Cindy Baker">LT</Avatar>
                                    <Avatar alt="Agnes Walker" >BM</Avatar>
                                    <Avatar alt="Trevor Henderson" >JR</Avatar>
                                </AvatarGroup>
                            </Grid>
                            <Grid>
                            <Typography className={classes.detailsHeader}>Maybe</Typography>
                                <AvatarGroup max={8}>
                                    <Avatar alt="Remy Sharp">RT</Avatar>
                                    <Avatar alt="Travis Howard">AK</Avatar>
                                    <Avatar alt="Cindy Baker">LT</Avatar>
                                    <Avatar alt="Agnes Walker" >BM</Avatar>
                                    <Avatar alt="Trevor Henderson" >JR</Avatar>
                                </AvatarGroup>
                        </Grid>
                            </Grid>
                            
                    </Grid>
                </CardContent>
            </Collapse>
        </Card>
        )
        
}

const AvatarGroupList = () => {

    return(<>
    </>)
}