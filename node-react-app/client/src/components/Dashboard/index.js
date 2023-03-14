import React, { useState, useEffect } from "react";
import { makeStyles, Grid, TextField, FormControl, MenuItem, InputLabel, Select, Box, Typography } from "@material-ui/core";
import history from '../Navigation/history';
import { Pagination } from "@material-ui/lab";
import { useUser } from '../Firebase/context';

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
      <h6>test</h6>
    </div>
  );
};

export default Dashboard;