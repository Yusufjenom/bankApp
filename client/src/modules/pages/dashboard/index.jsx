import React, { useEffect, useState } from 'react'

function Dashboard() {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
  }, []);


  return (
    <div>Dashboard
      <h3>{user?.firstname}</h3>
      <h3>{user?.lastname}</h3>
    </div>
  )
}

export default Dashboard