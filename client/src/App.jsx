import { useState } from 'react';
import {RouterProvider} from 'react-router-dom'
import { router } from './routes';
import ProtectedRoutesProvvider from './modules/pages/contexts/ProtectedRoutes';


function App() {
 
  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
