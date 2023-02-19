import React, { createContext } from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom';

import Home from '../Home';
import PrivateRoute from '../Navigation/PrivateRoute.js';
import { useAuth, auth } from '../Firebase';
import { UserContext } from '../Firebase/context';
import { useAuthState } from 'react-firebase-hooks/auth';

export const authContext = createContext(null);

const App = () => {

  const { tokenRef } = useAuth(auth)

  const authHeader = { Authorization: `Bearer ${tokenRef.current}` }

  const [user] = useAuthState(auth)

  return (
    <Router>
      <authContext.Provider value={authHeader}>
        <UserContext.Provider value={user ?? null}>
          <div>
            <PrivateRoute exact path="/" component={Home} />
          </div>
        </UserContext.Provider>
      </authContext.Provider>
    </Router >
  )
}


export default App;