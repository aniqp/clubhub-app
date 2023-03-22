import React from "react";
import { Router, Switch, Route, useLocation } from "react-router-dom";
import ClubDetails from "../ClubDetails";
import Home from '../Home';
import history from './history';
import ExplorePage from "../Explore/index";
import MyClubs from "../MyClubs";
import Dashboard from "../Dashboard"
import Members from "../ClubMain/Members";
import ClubBoard from "../ClubMain/ClubBoard";
import { useUser } from '../Firebase/context'
import CircularProgress from "@material-ui/core/CircularProgress"
import ClubBoardHeader from "../ClubMain/ClubBoardHeader";

export default function PrivateRoute() {
  const user = useUser()
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if(user) {
      console.log(user.uid)
      setLoading(false)
    }
  }, [user])

  if(loading === true) {
    setTimeout(() => {
      setLoading(false)
    }, 500)
    return (
    <div align = "center">
        <CircularProgress/>
    </div>
  )}
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={user? Dashboard: Home} />
        <Route path="/explore" component={ExplorePage} />
        <Route path="/clubs/:clubID" exact component = {ClubDetails}/>
        <Route path="/clubboard/:clubID/" exact component = {ClubBoard}/>
        <Route path="/clubboard/:clubID/members" exact component = {Members}/>
        <Route path="/myclubs" exact component={MyClubs}/>
      </Switch>
    </Router>
  );
}