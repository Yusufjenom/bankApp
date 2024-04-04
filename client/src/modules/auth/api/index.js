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
     });
     console.log(response);
     const result = await response.data.loggedInUser;
     console.log(result);
     return result;
    }
    catch(err){
        console.log(err.message)
    }
};

export const getUserByAccount = async (payload) => {
    try{
      const response = await axios.post(`${BASE_URL}/api/v1/get-user-by-account`, payload, {
        withCredentials: true
      });
      const result = await response.data;
      console.log(result);
      return result
    }
    catch(err){
        console.log(err.message)
    }
};


export const transferFunds = async (payload) => {
    try{
     const response = await axios.put(`${BASE_URL}/api/v1/credit-customer`, payload, {
        withCredentials: true
     });
     const result = await response.data;
     return result;
    }
    catch(err){
        console.log(err.message)
    }
}