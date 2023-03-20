import React from "react";
import history from '../Navigation/history';
import { useParams } from 'react-router-dom';
import { makeStyles, Card, Grid, Button, Typography } from "@material-ui/core";
import event1 from '../../images/event-img1.png'
import event2 from '../../images/event-img2.jpg'
import event3 from '../../images/event-celebration.png'
import event4 from '../../images/event-celebration2.png'
import down from '../../images/down-arrow.png'

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
        
    }
  }));

const Events = () => {
    const classes = useStyles();
    const { clubID } = useParams();

    let testData = [
        {title:'FHS Formal 2019',
        location:'RCH 302',
        time:'Fri, March 28th 2023',
        body:"Faculty of Health Sciences Students' Council is thrilled to present: FHS Formal 2019! This year's theme is 007, so break out your classiest black and white couture and join us at the Doubletree by Hilton on February 8th at 8pm!",
        timeposted:'March 16th 2023',
        visibility:'private'},
        {title:'KinGames Annual Holiday Sweater Party',
        location:'RCH 302',
        time:'Thurs, December 6th, 2018',
        body:"**WRISTBANDS**🎅🏿-$5 🤶🏻-No Cover 🎅🏿-Line Skip until 11. Contact any one of the Kin Games team members (event admins) to purchase.",
        timeposted:'March 16th 2023',
        visibility:'public'}
    ];

    return(<>

        <Grid container style={{display:'flex', justifyContent:'space-around', paddingTop:'20px'}}>
            <Grid xs={8}>
                <Card style={{padding:'20px'}}>
                <Typography style={{fontSize:'22pt', fontWeight:'300'}}>Upcoming Events</Typography>
                {Object.values(testData).map((event) => 
                <Card style={{ margin:'20px 0 30px', padding:'20px'}}>
                    <Grid style={{display:'flex'}}>
                        <Grid sx={3}>
                            {event.visibility == 'public' && 
                            <img src={event3} className={classes.img} style={{background:'rgb(250,233,211)'}}/>}
                            {event.visibility == 'private' && 
                            <img src={event4} className={classes.img} />}
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
                                <Button style={{textTransform:'none', margin:'5px 0'}}>
                                    More Details <img src={down} style={{height:'20px'}} />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
                )}
                </Card>
            </Grid>
            <Grid xs={3} style={{maxWidth:'290px', textAlign:'center'}}>
                <Card style={{display:'flex',flexDirection:'column' ,alignItems:'center'}}>
                    <Typography style={{padding:'20px', fontSize:'14pt', fontWeight:'200'}}>Do you have an event coming up?</Typography>
                    <Button className={classes.btn} onClick={() => history.push(`/clubboard/${clubID}/eventform`)}>
                        <Typography style={{paddingRight:'5px'}}>+</Typography>
                        <Typography>Create Event</Typography>
                    </Button>
                    <img src={event2} className={classes.img}/>
                </Card>
            </Grid>
            
            {/* <Grid style={{display:'flex', margin:'30px', padding:'0 0 20px 0', justifyContent:'space-between', background:'#fff', borderBottom:'lightgray 1px solid'}}>
                <Typography style={{fontSize:'22pt', fontWeight:'300'}}>Upcoming Events</Typography>
                <Button className={classes.btn} onClick={() => history.push(`/clubboard/${clubID}/eventform`)}>
                    <Typography style={{paddingRight:'5px'}}>+</Typography>
                    <Typography>Create Event</Typography>
                </Button>
            </Grid>
            <Grid style={{display:'flex', margin:'30px', padding:'0 0 20px 0', justifyContent:'space-between', borderBottom:'lightgray 1px solid'}}>
                {Object.values(testData).map((event) => 
                <>
                Helo
                </>
                )}
            </Grid>
            <Grid>
                Past Events
            </Grid> */}
        </Grid>
    
    </>)

}

export default Events;

// body:"Faculty of Health Sciences Students' Council is thrilled to present: FHS Formal 2019! This year's theme is 007, so break out your classiest black and white couture and join us at the Doubletree by Hilton on February 8th at 8pm! We're providing you with delicious food and a fire playlist. Drinks will be available for purchase at the bar and a valid ID will be required if you wish to purchase alcoholic beverages. Transportation will be included, too. Tickets for students in the Faculty of Health Sciences are only $10 thanks to the Student Opportunity Fund! But don't fret- tickets for students from other faculties or outside of Western are just $15. Not too shabby of a deal for the best night of the semester 😉.",
// 