import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { SignIn } from '../SignIn';
import { useUser } from '../Firebase';
import { Hello } from '../Hello';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import MainImage from "../../images/hero-image-1.png"
import SmallImage from "../../images/hero-image-2.png"


//Dev mode
const serverURL = ""; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const useStyles = makeStyles((theme) => ({
  bigimage: {
    position: 'absolute',
    top: '90px',
    left: '500px',
    width: '440x',
    height: '520px',
  },
  littleimage: {
    width: '90px',
    height: '90px',
    position: 'absolute',
    top: '460px',
    left: '100px'
  },

  toptitle: {
    fontFamily: 'Arvo, serif',
    position: 'absolute',
    top: '150px',
    left: '100px'
  },

  bottomtitle: {
    fontFamily: 'Biryani, sans-serif',
    letterSpacing: '0.05em',
    color: '#050B8A',
    fontWeight: 800,
    position: 'absolute',
    top: '200px',
    left: '100px'
  },

  subheader: {
    fontFamily: 'Arvo, serif',
    position: 'absolute',
    top: '300px',
    left: '100px',
    fontSize: '1.3em'
  },

  lowersubheader: {
    fontFamily: 'Biryani, sans-serif',
    fontWeight: 200,
    position: 'absolute',
    top: '335px',
    left: '100px',
    maxWidth: '350px',
    fontSize: '1.2em'
  }

})

);


const Home = () => {
  const classes = useStyles()
  return (
    <div>
      <img className = {classes.bigimage} src={MainImage} alt="" />
      <img className = {classes.littleimage} src={SmallImage} alt="" />
      <Typography variant = "h4" className = {classes.toptitle}> 
        University of Waterloo
      </Typography>
      <Typography variant = "h2" className = {classes.bottomtitle}> 
        CLUBHUB
      </Typography>
      <Typography variant = "h5" className = {classes.subheader}> 
        Discover and join clubs
      </Typography>
      <Typography variant = "h6" className = {classes.lowersubheader}> 
        Browse, join, and receive updates about the university's clubs. Find your perfect space!
      </Typography>
    </div>

  )
}


const UserName = () => {
  const user = useUser()
  return (<>
    <div>{user ? (
      <>
        <p>{user.displayName}</p>
        <p>{user.email}</p>
        <p>{user.uid}</p>
      </>
    ) : 'No user'}</div>
  </>
  )
}


export default (Home);
