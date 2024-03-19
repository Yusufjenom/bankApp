import React, {createContext} from 'react';
import useGetCurrentUser from '../hooks/useGetCurrentUser';

export const AuthContext = createContext()

function AuthProvider({children}) {
  const {currentUserLoggedIn} = useGetCurrentUser();

    
  return (
    <AuthContext.Provider value={{currentUserLoggedIn}} >
     {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;