import React, {useState, useContext } from 'react';
import AuthProvider from '../../auth/context/authContext';
import { AuthContext } from '../../auth/context/authContext';
import ApplicationLayout from '../layout';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { Button } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { currentUserLoggedIn, user } = useContext(AuthContext);
  console.log(currentUserLoggedIn)

  const handleVisibility = () => {
    setOpen(!open);
  }

  console.log(user);

  return (
    <>
      <ApplicationLayout>
        <div className='dashboard_main_content_parent'>

          <div className='child_one'>
            <div className='child_one_one'>
              <CurrencyExchangeIcon />
              <h3>{user?.accountNum}</h3>
              <p>{user?.email}</p>
            </div>

            <div className='child_one_two'>
              {
                open ? (
                  <h1><AttachMoneyIcon />{user.accountBalance}</h1>
                )
                  : (
                    <h1><AttachMoneyIcon /> ******</h1>
                  )
              }

              <Button variant='contained' onClick={handleVisibility}
                endIcon={open ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}>
                {open ? "Hide Balance" : "Show Balance"}
              </Button>
            </div>
          </div>


          <div className='child_two'></div>


          <div className='child_three'></div>


          <div className='child_four'></div>


          <div className='child_five'></div>


          <div className='child_six'></div>


          <div className='child_seven'></div>


          <div className='child_eight'></div>


          <div className='child_nine'></div>
        </div>
      </ApplicationLayout>
    </>
  )
}

export default Dashboard