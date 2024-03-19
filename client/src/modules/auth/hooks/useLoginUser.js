import React, { useState } from 'react';
import { loginUser } from '../api';

function useLoginUser() {
   const [loginResponse, setLoginResponse] = useState({});

   const handleLogin = async (payload) => {
    const response = await loginUser(payload)
    console.log(response)
    setLoginResponse(response)
   }
  return {loginResponse, handleLogin}
}

export default useLoginUser;