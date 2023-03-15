import React, { useState, useEffect } from "react";
import { makeStyles, Grid, TextField, FormControl, MenuItem, InputLabel, Select, Box, Typography } from "@material-ui/core";
import history from '../Navigation/history';
import { Pagination } from "@material-ui/lab";
import { useUser } from '../Firebase/context';
import MyClubCard from './MyClubCard'

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

const MyClubs = () => {

  const user = useUser();

  const [myClubs, setMyClubs] = useState([])

  const classes = useStyles();

  useEffect(() => {
    if (user) {
      console.log('User ID:', user.uid);
      getMyClubs();
    }
    else {
      console.log('Failed')
    }
  }, [user]);

  useEffect(() => {
    if (myClubs) {
      console.log('myClubs state has been updated:', myClubs);
    }
  }, [myClubs]);

  console.log('myClubs outside of useEffect: ' + myClubs)

  const getMyClubs = () => {
    callApiGetMyClubs()
        .then(res => {
            console.log("callApiGetClubs returned: ", res)
            var parsed = JSON.parse(res.express);
            console.log("callApiGetClubs: ", parsed);
            setMyClubs(parsed)
            console.log('setMyClubs:' + myClubs)
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
      <Grid container style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography className = {classes.title} variant = "h4"> My Clubs </Typography>
      <br></br>
        <MyClubCard clubs = {myClubs} onChange={getMyClubs} />
      </Grid>
    </div>
  );
};

export default MyClubs;