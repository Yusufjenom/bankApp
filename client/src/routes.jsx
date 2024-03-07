import {createBrowserRouter} from 'react-router-dom';
import LandingPage from './modules/pages/landingPage';
import Dashboard from './modules/pages/dashboard';
import GeneralErrorPage from './modules/pages/error';
import Signup from './modules/auth/pages/signup';


export const router = createBrowserRouter([
    {
        path:"/",
        element:<LandingPage/>
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
        path:"*",
        element:<GeneralErrorPage/>
    }
])