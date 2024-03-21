import React, {useEffect, useState, useMemo} from 'react';
import { getCurrentUser } from '../api';

function useGetCurrentUser() {
 const [currentUserLoggedIn, setCurrentUserLoggedIn] = useState({});
 const abortController = new AbortController();
 
 useEffect(() => {
   
    const fetchCurrentUser = async () => {
       const res = await getCurrentUser();
       setCurrentUserLoggedIn(res);
        console.log(currentUserLoggedIn)
    }
    fetchCurrentUser();
    return () => {
        abortController.abort();
    }
 }, []);

 const user = useMemo(() => currentUserLoggedIn, [currentUserLoggedIn]);
 console.log(user)

  return {currentUserLoggedIn, user}
}

export default useGetCurrentUser