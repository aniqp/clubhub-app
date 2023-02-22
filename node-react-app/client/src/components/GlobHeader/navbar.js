//create basic navbar with material-ui
import React from 'react';
import { AppBar, Toolbar, CssBaseline, Typography, makeStyles, } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { SignIn } from '../SignIn';
import { SignOut } from '../SignOut';

const useStyles = makeStyles((theme) => ({
    navlinks: {
      marginLeft: theme.spacing(10),
      display: "flex",
    },
   logo: {
      flexGrow: "1",
      cursor: "pointer",
    },
    link: {
      textDecoration: "none",
      color: "white",
      fontSize: "20px",
      marginLeft: theme.spacing(20),
      "&:hover": {
        color: "yellow",
        borderBottom: "1px solid white",
      },
    },
  }));
const Navbar = () => {
    const classes = useStyles();
    function refreshPage() {
        window.location.reload(false);
      }
    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    
                    <div className={classes.navlinks}>
                        
                        <SignIn />
                        <SignOut />
                        
                        <Link to="/" className={classes.link}>
                            {refreshPage}
                            Home
                        </Link>
                        <Link to="/dashboard" className={classes.link}>
                            Dashboard
                        </Link>
                        <Link to="/explore" className={classes.link}>
                            Explore
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
}
export default Navbar;