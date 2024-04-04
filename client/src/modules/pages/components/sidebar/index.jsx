import React from 'react';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import WindowIcon from '@mui/icons-material/Window';
import SendIcon from '@mui/icons-material/Send';
import useLogoutUser from '../../../auth/hooks/useLogoutUser';
import { Link } from 'react-router-dom';

function ApplicationSidebar() {
  const { logout } = useLogoutUser();
  return (
    <div className='application_sidebar_container'>

      <div className="first_sidebar_section">
        <ElectricBoltIcon />
        <CreditCardIcon />
        <WindowIcon />

        <Link to="/transfer">
          <SendIcon />
        </Link>
      </div>

      <div className="seconde_sidebar_section">

      </div>

      <div className="third_sidebar_section">
        <SettingsIcon />
        <LogoutIcon onClick={logout} />
      </div>

    </div>
  )
}

export default ApplicationSidebar