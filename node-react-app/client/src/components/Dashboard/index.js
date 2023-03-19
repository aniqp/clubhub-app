import React, { useState, useEffect } from "react";
import {
  makeStyles, Grid, TextField, FormControl, MenuItem, InputLabel,
  Select, Box, Typography, Drawer, CssBaseline, AppBar, Toolbar, List, Divider, Button,
  ListItem, ListItemIcon, ListItemText
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

  const onDashboard = true;

  const user = useUser();

  const classes = useStyles();

  const drawerWidth = 240

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

  if (filteredAnnouncements === "") {
    setTimeout(() => {
      return (<CircularProgress />)
    }, 300)
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

  return (
    <div className={classes.root}>
      <Box sx={{ display: 'flex' }}>
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
                    <ListItemButton button={true} onClick={() => { setClubSelected(text) }} selected = {clubSelected === text}>
                      <GroupsRoundedIcon style={{ marginRight: "15px" }} />
                      <ListItemText primary={text} sx={{ fontFamily: 'Arvo, serif' }} />
                    </ListItemButton>
                  </ListItem>
                </div>
              ))}
            </List>
          </Box>
        </Drawer>
        <Grid>
          <Typography variant="h5" style={{marginLeft: "50px", fontFamily: 'Arvo, serif' }}>Announcements</Typography>
          {filteredAnnouncements.map((announcement, index) =>
            <Grid item key={announcement.id} style={{ listStyle: 'none' }} xs = {12}>
              <AnnouncementPost
                id={announcement.id}
                name={announcement.name}
                title={announcement.title}
                body={announcement.body}
                timestamp={announcement.time_posted}
                adminStatus={false}
                onDashboard={onDashboard}
                club_id={announcement.club_id}
                visibility={announcement.visibility}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default Dashboard;