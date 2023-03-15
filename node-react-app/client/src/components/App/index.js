import React, { useCallback, useEffect } from 'react';

import Home from '../Home';
import Dashboard from '../Dashboard'
import Navbar from '../GlobHeader/navbar';
import { BrowserRouter as Router } from "react-router-dom";

import PrivateRoute from '../Navigation/PrivateRoute.js';
import { useAuth, auth, UserContext, AuthHeaderContext } from '../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
//import { database } from '../../../../config';

const App = () => {

  const { tokenRef } = useAuth(auth)
  
  const [user] = useAuthState(auth)

  const authHeader = useCallback(() => ({
    Authorization: `Bearer ${tokenRef.current}`
  }))

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = "https://fonts.googleapis.com/css2?family=Arvo&family=Biryani:wght@200;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <Router>
      <AuthHeaderContext.Provider value={authHeader}>
        <UserContext.Provider value={user ?? null}>
          <div>
            {/* <Navbar/>
          
            <PrivateRoute exact path="/" component={Home} /> */}
          <Navbar/>

          <PrivateRoute exact path="/" />
          </div>
        </UserContext.Provider>
      </AuthHeaderContext.Provider>
    </Router >
  )
}


export default App;