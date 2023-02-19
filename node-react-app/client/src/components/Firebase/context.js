import { createContext, useContext } from "react";

export const UserContext = createContext(null);

/**
 * Hook to return currently authenticated user as provided by Firebase
 */
export function useUser() {
  return useContext(UserContext);
}

export const AuthHeaderContext = createContext(null);

/**
 * Hook to return authentication header for http requests
 */
export function useAuthHeader() {
  return useContext(AuthHeaderContext);
}
