import React, {useContext} from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import { AuthContext } from '../../../auth/context/authContext';


function ApplicationHeader() {
    const {user} = useContext(AuthContext);
    console.log(user)
    return (
        <div className='application_header_container'>

            <div className="header_logo_container">
                <h2>CYPRUS BANK</h2>
                
            </div>

            <div className="header_search_container">
            {
                    user && <p>Welcome {user.firstname}</p>
                }
                
                <input type="text" placeholder='Search' />
            </div>

            <div className="header_profile_icons_container">
                <AccountCircleIcon/>
                <CircleNotificationsIcon/>
                <MarkUnreadChatAltIcon/>
            </div>

        </div>
    )
}

export default ApplicationHeader