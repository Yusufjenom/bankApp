import React, { useEffect, useState, useContext } from 'react';
import AuthProvider from '../../auth/context/authContext';
import { AuthContext } from '../../auth/context/authContext';
import ApplicationLayout from '../layout';

function Dashboard() {
  const [userr, setUserr] = useState(null);
  const {currentUserLoggedIn, user} = useContext(AuthContext);
  console.log(currentUserLoggedIn)
  
  // useEffect(() => {
    
  //     setUserr(currentUserLoggedIn.data?.loggedInUser)
   
  // }, []);
 
  console.log(user)
  

  return (
    <>
    <ApplicationLayout>

    </ApplicationLayout> 
    </>
  )
}

export default Dashboard