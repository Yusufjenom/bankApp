import React, {createContext} from 'react';
import useGetCurrentUser from '../hooks/useGetCurrentUser';

export const AuthContext = createContext()
const {currentUserLoggedIn} = useGetCurrentUser()

function authContext({children}) {
    
  return (
    <AuthContext.Provider>

    </AuthContext.Provider>
  )
}

export default authContext