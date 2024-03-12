const BASE_URL = "http://localhost:3000";
import axios from 'axios';


export const signupUser = async (payload) => {
    const response = await axios.post(`${BASE_URL}/api/v1/signup-user`, payload, {
        withCredentials: true
    });
    return response;
};

export const loginUser = async (payload) => {
 try{
    const response = await axios.post(`${BASE_URL}/api/v1/login-user`, payload, {
        withCredentials: true
    });
    return response;
 }
 catch(err){
    console.log(err.message)
 }
};

export const getCurrentUser = async () => {
    try{
     const response = await axios.get(`${BASE_URL}/api/v1/current-user`, {
        headers:{
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userToken"))}`
        }
     })
     return response;
    }
    catch(err){
        console.log(err.message)
    }
};