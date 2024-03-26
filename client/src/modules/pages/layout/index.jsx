import React from 'react';
import ApplicationHeader from '../components/header';
import ApplicationSidebar from '../components/sidebar';

function ApplicationLayout({children}) {
  return (
    <div className='application_layout_container'>
        <div className="header">
          <ApplicationHeader/>
        </div>

        <div className="sidebar">
          <ApplicationSidebar/>
        </div>

        <div className="content">
          {children}
        </div>
    </div>
  )
}

export default ApplicationLayout;