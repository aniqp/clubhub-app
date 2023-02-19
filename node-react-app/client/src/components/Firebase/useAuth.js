import { useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export function useAuth(auth) {
  const [user] = useAuthState(auth);

  // the JWT token associated with the user expires and needs to be
  // periodically refreshed; useRef is here to maintain mutable
  // placeholder for the token value
  const tokenRef = useRef("");

  useEffect(() => {
    async function updateToken() {
      const token = user && await user.getIdToken();
      if (token) {
        tokenRef.current = token;
      }
    }

    updateToken();

    // schedule refresh every minute
    const intervalId = setInterval(updateToken, 60 * 1000);
    return () => {
      clearTimeout(intervalId);
    };
  }, [user]);
  
  return { tokenRef };
}