import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/authContext';
import { Link, useParams, useNavigate, Outlet } from 'react-router-dom';
import SidebarAdminPanel from '../../../Components/SidebarAdminPanel/SidebarAdminPanel';
import './DashboordPanel.css'
const DashboordPanel = () => {
    const authContext = useContext(AuthContext)
    const navigator = useNavigate()

    if (!authContext.isLogin()) {
        navigator('/main')
    }



    return (
        <>
            <div class="panel-container">
                <SidebarAdminPanel />
                <Outlet />
            </div>
        </>
    );
}


export default DashboordPanel;