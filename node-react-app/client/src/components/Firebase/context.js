import { createContext, useContext } from "react";

export const UserContext = createContext(null);

/**
 * Hook to return currently authenticated user as provided by the /me endpoint.
 */
export function useUser() {
  return useContext(UserContext);
}
