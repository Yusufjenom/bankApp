import React, {createContext, useContext} from 'react';
import { AuthContext } from '../../auth/context/authContext';
import {useNavigate} from 'react-router-dom';

export const ProtectedRoute = createContext();

function ProtectedRoutesProvvider({children}) {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    console.log(user);
    if(!user){
       navigate("/login");
    }

  return (
    <ProtectedRoute.Provider>
        {children}
    </ProtectedRoute.Provider>
  )
}

export default ProtectedRoutesProvvider