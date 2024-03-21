import React, {createContext} from 'react';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import { getCurrentUser } from '../api';

export const AuthContext = createContext()

function AuthProvider({children}) {
  const {currentUserLoggedIn, user} = useGetCurrentUser();


    
  return (
    <AuthContext.Provider value={{currentUserLoggedIn, user}} >
     {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;