const BASE_URL = "http://localhost:5000";
import axios from 'axios';


export const signupUser = async (payload) => {
    const response = await axios.post(`${BASE_URL}/api/v1/signup-user`, payload, {
        withCredentials: true
    });
    return response;
};