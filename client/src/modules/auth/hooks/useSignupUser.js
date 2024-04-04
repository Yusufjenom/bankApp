
import React, { useState } from 'react';
import axios from 'axios';
import { signupUser } from '../api';

function useSignupUser() {
    const [userResponse, setUserResponse] = useState({})
        const signUp = async (payload) => {
            const response = await signupUser(payload);
            const data = await response.data
            setUserResponse(data.savedUser)
            localStorage.setItem('user', JSON.stringify(data.savedUser));
            return response
        }
    return { signUp, userResponse }
}

export default useSignupUser
