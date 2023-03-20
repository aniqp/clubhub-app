import React, { useState, useEffect } from "react";
import {
  makeStyles, Grid, TextField, FormControl, MenuItem, InputLabel,
  Select, Box, Typography, Drawer, CssBaseline, AppBar, Toolbar, List, Divider, Button,
  ListItem, ListItemIcon, ListItemText, Link, Card, CardMedia, CardContent
} from "@material-ui/core";
import ListItemButton from '@material-ui/core/ListItem'
import InboxIcon from '@material-ui/icons/Inbox'
import MailIcon from '@material-ui/icons/Mail'
import history from '../Navigation/history';
import { Pagination } from "@material-ui/lab";
import { useUser } from '../Firebase/context';
import AnnouncementPost from "../ClubMain/AnnouncementPost"
import GroupsRoundedIcon from '@material-ui/icons/Group';
import CircularProgress from "@material-ui/core/CircularProgress"
import announcementHero from "../../../src/images/announcement-background.png"

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

  const [clubSelected, setClubSelected] = React.useState("")

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
    }
    else {
      console.log('Failed')
    }
  }, [user]);

  const filteredAnnouncements = announcements.filter((announcement) => announcement.name.includes(clubSelected))

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
        setLoading(false)
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

  if (loading === true) {
    return (<div align="center">
      <CircularProgress />
    </div>)
  }

  return (
    <Grid container xs={8} spacing={6}>
      <Grid container item xs={4}>
        <Drawer
          variant="permanent"
          style={{
            zIndex: 0,
            maxWidth: "25px",
            flexShrink: 0,
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }} textAlign="center">
            <Typography variant="h6" style={{ marginTop: "25px", fontFamily: 'Biryani, sans-serif', fontWeight: 600 }}>My Clubs</Typography>
            <List>
              {myClubs.map((text, index) => (
                <div>
                  <ListItem key={text} style={{ maxWidth: "250px" }}>
                    <ListItemButton button={true} onClick={() => { setClubSelected(text) }} selected={clubSelected === text}>
                      <GroupsRoundedIcon style={{ marginRight: "15px" }} />
                      <ListItemText primary={text} sx={{ fontFamily: 'Arvo, serif' }} />
                    </ListItemButton>
                  </ListItem>
                </div>
              ))}
            </List>
          </Box>
          <ListItem key='View All' style={{ maxWidth: "250px", display: 'flex', justifyContent: 'space-between', position: 'absolute', bottom: 0 }}>
            <Link onClick={() => { setClubSelected("") }} style={{ textAlign: "right", marginLeft: "140px", cursor: 'pointer' }}>
              <ListItemText primary={'View All'} sx={{ fontFamily: 'Arvo, serif' }} />
            </Link>
          </ListItem>
        </Drawer>
      </Grid>
      <Grid container item xs={8} spacing={12}>
        <Grid item xs={12}>
          <Card style={{ backgroundColor: '#6072C7', marginLeft: '40px', marginTop: '40px', width: '150%' }}>
            <Grid container xs = {16}>
              <Grid item xs={8} style={{ display: 'flex', alignItems: 'center' }}>
                <CardContent>
                  <Typography variant="h5" style={{ fontFamily: 'Biryani, sans-serif', fontWeight: 600, color: 'white' }}>What's new in Clubsville?</Typography>
                  <Typography variant="h6" style={{ fontFamily: 'Biryani, sans-serif', fontWeight: 400, color: 'white', marginTop: '20px'}}>View all your clubs' announcements!</Typography>
                </CardContent>
              </Grid>
              <Grid item xs={4} style = {{display: 'flex', justifyContent: 'flex-end'}}>
                <CardMedia component="img" image={announcementHero} style={{ width: '100%', maxWidth: '100%' }} />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        {filteredAnnouncements.length !== 0 ? filteredAnnouncements.map((announcement, index) =>
          <Grid container item spacing={2} key={announcement.id} style={{ listStyle: 'none', width: '150%' }} xs={20}>
            <AnnouncementPost
              id={announcement.id}
              name={announcement.name}
              title={announcement.title}
              body={announcement.body}
              timestamp={announcement.time_posted}
              adminStatus={isAdmin(announcement)}
              onDashboard={onDashboard}
              club_id={announcement.club_id}
              visibility={announcement.visibility}
            />
          </Grid>
        ) : <Typography variant="h6" style={{ marginLeft: "50px", marginTop: "20px" }}>This club has no recent announcements.</Typography>}
      </Grid>
    </Grid>
  );
};

export default Dashboard;