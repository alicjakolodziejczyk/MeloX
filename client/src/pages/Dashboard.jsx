import React from 'react'
import '../assets/css/Dashboard.css'
import DashboardSidebar from '../components/DashboardSidebar'
import DashboardNavbar from '../components/DashboardNavbar'
import DashboardContainer from '../components/DashboardContainer'
import MusicPlayer from '../components/MusicPlayer'


function Dashboard() {
  return (
    <div>
      <DashboardNavbar/>
      <div className="dashboard-container">
        <DashboardSidebar/>
        <div className="main-content">
          <DashboardContainer/>
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard