import React, {useEffect, useState} from 'react';
import { getCurrentUser } from '../api';

function useGetCurrentUser() {
 const [currentUserLoggedIn, setCurrentUserLoggedIn] = useState({});
 const abortController = new AbortController()

 useEffect(() => {
   
    const fetchCurrentUser = async () => {
       const res = await getCurrentUser();
       setCurrentUserLoggedIn(res);
       console.log(currentUserLoggedIn)
    }
     
    fetchCurrentUser()

    return () => {
        abortController.abort();
    }
 }, []);

  return {currentUserLoggedIn}
}

export default useGetCurrentUser