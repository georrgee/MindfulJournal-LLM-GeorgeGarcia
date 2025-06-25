import { useContext } from "react";
import { AuthContext } from "../providers";
/**
 * @author George Garcia
 * @description Custom hook to access the authentication context.
 * @returns { AuthContextType } The authentication context
 */

export const useAuth = () => {

  const authContext = useContext(AuthContext);

  if (authContext === undefined) throw new Error ('(useAuth.tsx) Error: useAuth must be used within the Authentication Provider');
  return authContext;
}