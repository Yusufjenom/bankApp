//import { useContext } from 'react';
import {createBrowserRouter} from 'react-router-dom';
import LandingPage from './modules/pages/landingPage';
import Dashboard from './modules/pages/dashboard';
import GeneralErrorPage from './modules/pages/error';
import Signup from './modules/auth/pages/signup';
import LoginUser from './modules/auth/pages/login';
// import { AuthContext } from './modules/auth/context/authContext';
// import AuthProvider from './modules/auth/context/authContext';


export const router = createBrowserRouter([
    {
        path:"/",
        element:  <LandingPage/> 
    },
    {
        path:"/dashboard",
        element:<Dashboard/>
    },
    {
        path:"/signup",
        element:<Signup/>
    },
    {
       path:"/login",
       element:<LoginUser/>
    },
    {
        path:"*",
        element:<GeneralErrorPage/>
    }
])