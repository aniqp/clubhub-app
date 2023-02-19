import React, { useCallback } from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import Home from '../Home';
import PrivateRoute from '../Navigation/PrivateRoute.js';
import { useAuth, auth, UserContext, AuthHeaderContext } from '../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const App = () => {

  const { tokenRef } = useAuth(auth)
  
  const [user] = useAuthState(auth)

  const authHeader = useCallback(() => ({
    Authorization: `Bearer ${tokenRef.current}`
  }))


  return (
    <Router>
      <AuthHeaderContext.Provider value={authHeader}>
        <UserContext.Provider value={user ?? null}>
          <div>
            <PrivateRoute exact path="/" component={Home} />
          </div>
        </UserContext.Provider>
      </AuthHeaderContext.Provider>
    </Router >
  )
}


export default App;