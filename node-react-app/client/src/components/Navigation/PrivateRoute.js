import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import ClubDetails from "../ClubDetails";
import Home from '../Home';
import history from './history';
import ExplorePage from "../Explore/index";
import MyClubs from "../MyClubs";
import Dashboard from "../Dashboard"
import Members from "../ClubMain/Members";
import Announcements from "../ClubMain/Announcements";
import ClubBoard from "../ClubMain/ClubBoard";

export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (

    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/explore" component={ExplorePage} />
        <Route path = "/clubs/:clubID" exact component = {ClubDetails}/>
        <Route path = "/clubboard/:clubID" exact component = {ClubBoard}/>
        <Route path = "/myclubs" exact component = {MyClubs}/>
        <Route path = "/dashboard" exact component = {Dashboard}/>
      </Switch>
    </Router>
  );
}