import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import ClubDetails from "../ClubDetails";
import ClubMain from "../ClubMain";
import Home from '../Home';
import history from './history';
import ExplorePage from "../Explore/index";

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
        <Route path = "/club-space/:clubID" exact component = {ClubMain}/>
      </Switch>
    </Router>
  );
}