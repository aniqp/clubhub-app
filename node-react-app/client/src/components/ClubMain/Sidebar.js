import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles({
    root: {
      position: "sticky",
      top: "5rem",
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems:'center',
      boxShadow: "0px 8px 9px -5px rgb(0 0 0 / 10%), 0px 15px 22px 2px rgb(0 0 0 / 1%), 0px 6px 28px 5px rgb(0 0 0 / 1%)",
    },
  });


export default function SideBar() {
    const classes = useStyles();

    return (
        <Card className={classes.root} elevation={15}>
        <CardActions>
            <Button size="large" color="secondary">
            Upcoming Events
            </Button>
        </CardActions>
        <CardActions>
            <Button size="large" color="secondary">
                Photos
            </Button>
        </CardActions>
        <CardActions>
            <Button size="large" color="secondary">
                Members
            </Button>
        </CardActions>
        </Card>
    );
}
  