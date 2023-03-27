import React, { useState, useEffect } from "react";
import {
  makeStyles, Grid, Box, Typography, Drawer, Toolbar, List, Divider, Button,
  ListItem, ListItemText, Link, Card, CardMedia, CardContent, Collapse
} from "@material-ui/core";
import ListItemButton from "@material-ui/core/ListItem"
import { useUser } from '../Firebase/context';
import AnnouncementPost from "../ClubMain/AnnouncementPost"
import GroupsRoundedIcon from '@material-ui/icons/Group';
import CircularProgress from "@material-ui/core/CircularProgress"
import announcementHero from "../../../src/images/announcement-background.png"
import eventsHero from "../../../src/images/events-hero.png"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import AnnouncementIcon from '@material-ui/icons/Announcement';
import EventIcon from "@material-ui/icons/Event"
import EventPost from "../ClubMain/EventPost";

const serverURL = ""

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    margin: "0 auto",
    alignItems: "center",
    justifycontent: "center",
    marginTop: '30px'
  },
  title: {
    fontFamily: 'Biryani, sans-serif',
    fontWeight: 600,
    marginTop: '60px'
  },
  title2: {
    fontFamily: 'Biryani, sans-serif',
    fontWeight: 600,
    marginTop: '40px',
    textDecoration: 'underline'
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: 5,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: 16,
  }
}));

const Dashboard = () => {

  const [announcements, setAnnouncements] = React.useState([])
  const [events, setEvents] = React.useState([]);

  const [clubAnnouncementSelected, setClubAnnouncementSelected] = React.useState("")

  const [clubEventSelected, setClubEventSelected] = React.useState(false)

  const [myClubs, setMyClubs] = React.useState([])

  const [loading, setLoading] = React.useState(true)

  const onDashboard = true;

  const user = useUser();

  const classes = useStyles();

  useEffect(() => {
    if (user) {
      console.log('User ID:', user.uid);
      getAnnouncements();
      getMyClubs();
      getEvents();
    }
    else {
      console.log('Failed')
    }
  }, [user]);

  const filteredAnnouncements = announcements.filter((announcement) => announcement.name.includes(clubAnnouncementSelected))
  const filteredEvents = events.filter((event) => event.name.includes(clubEventSelected))

  function isAdmin(announcement) {
    return (((announcement.role == "owner" || announcement.role == "admin") && announcement.visibility == "private") || announcement.visibility == "public")
  }

  const getAnnouncements = () => {
    callApiGetAnnouncements()
      .then(res => {
        console.log("callApiGetAnnouncements returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiGetAnnouncements: ", parsed);
        parsed.sort(function (a, b) {
          var timeA = a.time_posted.toLowerCase(), timeB = b.time_posted.toLowerCase()
          if (timeA > timeB) //sort string ascending
            return -1
          if (timeA < timeB)
            return 1
          return 0 //default return value (no sorting)
        })
        setAnnouncements(parsed)
      })
  }

  const callApiGetAnnouncements = async () => {
    const url = serverURL + '/api/getAnnouncements';
    const userID = user.uid
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: userID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Searched club: ", body);
    return body;
  }

  const getMyClubs = () => {
    callApiGetMyClubs()
      .then(res => {
        console.log("callApiGetClubs returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiGetClubs: ", parsed);
        const clubs = parsed.map((club) => club.name)
        console.log(clubs)
        setMyClubs(clubs)
      })
  }

  const callApiGetMyClubs = async () => {
    const url = serverURL + '/api/getMyClubs';
    const userID = user.uid
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: userID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Searched club: ", body);
    return body;
  }

  const getEvents = () => {
    callApiGetUpcomingEvents()
    .then(res => {
        var parsed = JSON.parse(res.express);
        // parsed.sort(function (a, b) {
        //   var timeA = a.time_posted, timeB = b.time_posted.toLowerCase()
        //   if (timeA > timeB) //sort string ascending
        //     return -1
        //   if (timeA < timeB)
        //     return 1
        //   return 0 //default return value (no sorting)
        // })
        setEvents(parsed)
        setLoading(false);
        
      })
  }


  const callApiGetUpcomingEvents = async () => {
    const url = serverURL + '/api/getDashboardEvents';
    const userID = user.uid
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            //authorization: `Bearer ${this.state.token}`
        },
        body: JSON.stringify({
            userID: userID,
        })
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }  

  if (loading === true) {
    return (<div align="center">
      <CircularProgress />
    </div>)
  }

  return (
    <Grid container>
      <Grid item xs={3} style={{zIndex:'100'}}>
        <SideBar
          myClubs={myClubs}
          clubAnnouncementSelected={clubAnnouncementSelected}
          setClubAnnouncementSelected={setClubAnnouncementSelected}
          setClubEventSelected={setClubEventSelected}
        />
      </Grid>
      <Grid item xs={8}>
        {clubEventSelected === false ?
          <>
            <Grid item>
              <AnnouncementHeader />
            </Grid>
            <Grid item style={{ listStyle: 'none', paddingBottom:'50px'}} xs={12}>
              {(filteredAnnouncements.length !== 0) ?
                filteredAnnouncements.map((announcement, index) =>
                  <AnnouncementPost
                    admin={isAdmin(announcement)}
                    announcement={announcement}
                    name={announcement.name}
                    onDashboard={onDashboard}
                    club_id={announcement.club_id}
                  />
                ) :
                myClubs.length > 0 && announcements.length > 0? <Typography variant="h6" style={{marginTop: "20px" }}>This club has no recent announcements.</Typography> :
                myClubs.length > 0 && announcements.length === 0 && <Typography variant="h6" style={{marginTop: "20px" }}>You have no recent announcements.</Typography>
              }
            </Grid>
          </>
          :<>
            <Grid item xs={12}>
              <EventsHeader />
            </Grid>
            <Grid style={{ listStyle: 'none', paddingBottom:'50px'}} xs={12}>
              {filteredEvents.length !== 0 ? 
              filteredEvents.map((event, index) =>
              <EventPost
                event={event} 
                admin={false} 
                index={index} 
                currentUser={user} 
                pastEvent={false} 
                onChange={getEvents}
                onDashboard={onDashboard}
                club_name={event.name}
                club_id={event.club_id}
              />
            ) :
              <Typography variant="h6" style={{marginTop: "20px" }}>This club has no upcoming events.</Typography>
            }
            </Grid> 
          </>
        }
      </Grid>
    </Grid>
  );
};

const SideBar = (props) => {
  return (
    <Drawer
      variant="permanent"
      style={{
        zIndex: 0,
        maxWidth: "250px",
        flexShrink: 0,
        minWidth:'244px'
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', maxWidth: '250px' }} textAlign="center">
        <Typography variant="h6" style={{ marginTop: "25px", fontFamily: 'Biryani, sans-serif', fontWeight: 600 }}>My Clubs</Typography>
        {props.myClubs.map((text, index) => (
          <MyClubs
            myClubs={props.myClubs}
            setClubAnnouncementSelected={props.setClubAnnouncementSelected}
            setClubEventSelected={props.setClubEventSelected}
            text={text}
          />
        ))}
        {props.myClubs.length === 0 && 
          <Typography style = {{maxWidth:"225px", paddingTop: '10px'}}>You haven't joined any clubs yet. Check out the explore page to get started!</Typography>
        }
      </Box>
    </Drawer>
  )
}

const MyClubs = (props) => {
  const [listExpand, setListExpand] = React.useState(false)
  return (
    <List>
      <div>
        <ListItem key={props.text} style={{ maxWidth: "250px" }}>
          <ListItemButton button={true} onClick={() => { setListExpand(!listExpand) }}>
            <GroupsRoundedIcon style={{ marginRight: "15px" }} />
            <ListItemText primary={props.text} sx={{ fontFamily: 'Arvo, serif' }} />
            {listExpand ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={listExpand} timeout="auto" unmountOnExit>
          <List component="div" disablePadding style={{ paddingLeft: '15%' }}>
            <ListItemButton selected={props.clubAnnouncementSelected === props.text} button={true} style={{ textAlign: 'justify' }} onClick=
              {() => {
                props.setClubAnnouncementSelected(props.text)
                props.setClubEventSelected(false)
              }}>
              <AnnouncementIcon />
              <ListItemText primary="Announcements" style={{ paddingLeft: '5%' }} />
            </ListItemButton>
            <ListItemButton button={true} style={{ textAlign: 'justify' }} onClick=
              {() => {
                props.setClubAnnouncementSelected(false)
                props.setClubEventSelected(props.text)
              }}>
              <EventIcon />
              <ListItemText primary="Events" style={{ paddingLeft: '5%' }} />
            </ListItemButton>
          </List>
        </Collapse>
      </div>
    </List>
  )
}

const AnnouncementHeader = () => {
  return (
    <Card style={{ height:'250px', backgroundColor: '#6072C7', margin: '40px 0 30px 0', display: 'flex', alignContent: 'center'}}>
      <Grid container xs={12}>
        <Grid item xs={7} style={{ display: 'flex', alignItems: 'center' }}>
          <CardContent>
            <Typography variant="h5" style={{ fontFamily: 'Biryani, sans-serif', fontWeight: 600, color: 'white' }}>What's new in Clubsville?</Typography>
            <Typography variant="h6" style={{ fontFamily: 'Biryani, sans-serif', fontWeight: 400, color: 'white', marginTop: '20px' }}>View your clubs' recent announcements!</Typography>
          </CardContent>
        </Grid>
        <Grid item xs={5} style={{ display: 'flex', justifyContent: 'flex-end'}}>
          <CardMedia component="img" image={announcementHero} />
        </Grid>
      </Grid>
    </Card>)
}

const EventsHeader = () => {
  return (
    <Card style={{ height:'250px', backgroundColor: '#ee9d79', margin: '40px 0 30px 0', display: 'flex', alignContent: 'center'}}>
      <Grid container xs={12}>
        <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
          <CardContent>
            <Typography variant="h5" style={{ fontFamily: 'Biryani, sans-serif', fontWeight: 600, color: 'white' }}>Get ready for get-togethers</Typography>
            <Typography variant="h6" style={{ fontFamily: 'Biryani, sans-serif', fontWeight: 400, color: 'white', marginTop: '20px' }}>View your club's upcoming events!</Typography>
          </CardContent>
        </Grid>
        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end'}}>
          <CardMedia component="img" image={eventsHero} style = {{width: '90%', paddingRight: '10px'}} />
        </Grid>
      </Grid>
    </Card>)
}

export default Dashboard;