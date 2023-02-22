import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import ClubDetails from "../ClubDetails";
import ClubMain from "../ClubMain";
import Home from '../Home';
import history from './history';

export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (

    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/club-details" exact component={ClubDetails} />
        <Route path = "/clubs/:clubID" exact component = {ClubDetails}/>
        <Route path = "/club-main" exact component = {ClubMain}/>
      </Switch>
    </Router>
  );
}