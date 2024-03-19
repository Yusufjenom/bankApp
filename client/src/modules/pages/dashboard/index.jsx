import React, { useEffect, useState, useContext } from 'react';
import AuthProvider from '../../auth/context/authContext';
import { AuthContext } from '../../auth/context/authContext';

function Dashboard() {
  const [user, setUser] = useState({});
  const {currentUserLoggedIn} = useContext(AuthContext);
  console.log(currentUserLoggedIn)
  
  useEffect(() => {
    setUser(currentUserLoggedIn.data.loggedInUser)
  }, []);


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