import React, { useContext, useEffect, useState } from 'react';
import HeaderDefault from '../../../Components/HeaderDefault/HeaderDefault';
import AuthContext from '../../../context/authContext';
import { Link, useParams, useNavigate, Outlet } from 'react-router-dom';

// import SidebarUserPanel from '../../../Components/SidebarUserPanel/SidebarUserPanel';
import './DashboordPanel.css'
const DashboordPanel = () => {
    const authContext = useContext(AuthContext)
    const navigator = useNavigate()

    if(!authContext.isLogin()){
        navigator('/main')
    }

    

    return (
        <>
            <HeaderDefault />
            <main className="main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            {/* <SidebarUserPanel /> */}
                        </div>
                        <div className="col-9">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}


export default DashboordPanel;