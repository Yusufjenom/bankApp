import React, { useState } from 'react';
import { loginUser } from '../api';

function useLoginUser(payload) {
   const [loginResponse, setLoginResponse] = useState({});

   const handleLogin = async () => {
    const response = await loginUser(payload)
    setLoginResponse(response)
   }
  return {loginResponse, handleLogin}
}

export default useLoginUser;