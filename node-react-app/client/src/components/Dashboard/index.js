import React, { useState, useEffect } from "react";
import { makeStyles, Grid, TextField, FormControl, MenuItem, InputLabel, Select, Box, Typography } from "@material-ui/core";
import history from '../Navigation/history';
import { Pagination } from "@material-ui/lab";
import { useUser } from '../Firebase/context';
import AnnouncementPost from "../ClubMain/AnnouncementPost"

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
    fontFamily: 'Arvo, serif'
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

  React.useEffect(() => {
    getAnnouncements();
  }, []);

  const user = useUser();

  const classes = useStyles();

  useEffect(() => {
    if (user) {
      console.log('User ID:', user.uid);
      getAnnouncements();
    }
    else {
      console.log('Failed')
    }
  }, [user]);

  const getAnnouncements = () => {
    callApiGetAnnouncements()
      .then(res => {
        console.log("callApiGetClubs returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiGetClubs: ", parsed);
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

  return (
    <div className={classes.root}>
      {announcements.map((announcement, index) =>
        <li key={announcement.id} style={{ listStyle: 'none' }}>
          <AnnouncementPost
            id={announcement.id}
            name={announcement.name}
            title={announcement.title}
            body={announcement.body}
            timestamp={announcement.time_posted}
            onSubmit={""}
            adminStatus={false} />
        </li>
      )}
    </div>
  );
};

export default Dashboard;