import React, { useState, useEffect } from "react";
import {
  makeStyles, Grid, TextField, FormControl, MenuItem, InputLabel,
  Select, Box, Typography, Drawer, CssBaseline, AppBar, Toolbar, List, Divider,
  ListItem, ListItemIcon, ListItemText
} from "@material-ui/core";
import ListItemButton from '@material-ui/core/ListItem'
import InboxIcon from '@material-ui/icons/Inbox'
import MailIcon from '@material-ui/icons/Mail'
import history from '../Navigation/history';
import { Pagination } from "@material-ui/lab";
import { useUser } from '../Firebase/context';
import AnnouncementPost from "../ClubMain/AnnouncementPost"
import { PodcastsRounded } from "@mui/icons-material";

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
      <Typography className={classes.title} variant="h4" align="center">
        Your clubs, at a glance
      </Typography>
      <Typography className={classes.title2} variant="h5" align="center">
        Recent Announcements
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Toolbar>
        </Toolbar>
        <Drawer
          variant="permanent"
          style={{
            zIndex: 0,
            maxWidth: "25px",
            flexShrink: 0
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {myClubs.map((text, index) => (
                <ListItem key={text} disablePadding style= {{maxWidth: "250px"}}>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {announcements.map((announcement, index) =>
            <li key={announcement.id} style={{ listStyle: 'none' }}>
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
            </li>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;