import React, { useEffect, useState, useContext } from 'react';
import AuthProvider from '../../auth/context/authContext';
import { AuthContext } from '../../auth/context/authContext';

function Dashboard() {
  const [userr, setUserr] = useState(null);
  const {currentUserLoggedIn, user} = useContext(AuthContext);
  console.log(currentUserLoggedIn)
  
  // useEffect(() => {
    
  //     setUserr(currentUserLoggedIn.data?.loggedInUser)
   
  // }, []);
 
  console.log(user)
  

  return (
    <div>
      <h1>Dashboard</h1>
      <h4>{user?.firstname}</h4>
      <h4>{user?.lastname}</h4>
      <h4>{user?.email}</h4>
      <h4>{user?.accountNum}</h4>
      <h4>{user?.accountBalance}</h4>
    </div>
  )
}

export default Dashboard