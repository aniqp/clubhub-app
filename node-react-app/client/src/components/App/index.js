import React, { useCallback } from 'react';
// import {
//   BrowserRouter as Router
// } from 'react-router-dom';
import Home from '../Home';
import ExplorePage from '../Explore/explorepage';
import Navbar from '../GlobHeader/navbar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from '../Navigation/PrivateRoute.js';
import { useAuth, auth, UserContext, AuthHeaderContext } from '../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const App = () => {

  const { tokenRef } = useAuth(auth)
  
  const [user] = useAuthState(auth)

  const authHeader = useCallback(() => ({
    Authorization: `Bearer ${tokenRef.current}`
  }))

  function refreshPage() {
    window.location.reload(false);
  }


  return (
    <Router>
      <AuthHeaderContext.Provider value={authHeader}>
        <UserContext.Provider value={user ?? null}>
          <div>
            {/* <Navbar/>
            
            
            <PrivateRoute exact path="/" component={Home} /> */}
            <Router>
              <Navbar />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/explore" component={ExplorePage} />

              </Switch>
            </Router>
          </div>
        </UserContext.Provider>
      </AuthHeaderContext.Provider>
    </Router >
  )
}


export default App;