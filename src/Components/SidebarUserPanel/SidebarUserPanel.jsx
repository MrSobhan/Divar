import React, { useState , useContext } from 'react';
import './SidebarUserPanel.css'
import AuthContext from '../../context/authContext';
import { NavLink } from 'react-router-dom';


const SidebarUserPanel = () => {
    const authContext = useContext(AuthContext)
    const [userPhone , setUserPhone] = useState('')
    authContext.getMe().then((user) => {
        setUserPhone(user.phone)      
        // console.log(location.href);
          
    });
    return (
        <div className="sidebar">
            <div className="sidebar__user">
                <div className="sidebar__user-right">
                    <i className="sidebar__user-icon bi bi-person"></i>
                </div>
                <div className="sidebar__user-left">
                    <div className="sidebar__user-text">کاربر دیوار</div>
                    <p id="sidebar-phone-number" className="sidebar__user-phone">{userPhone}</p>
                </div>
            </div>
            <ul className="sidebar__menu-list">
                <li className="sidebar__menu-item">
                    <NavLink
                        className="sidebar__menu-link"
                        to="/userPanel/verify"
                    >
                        <i className="sidebar__menu-icon bi bi-patch-check"></i>
                        تایید هویت
                    </NavLink>
                </li>
                <li className="sidebar__menu-item">
                    <NavLink className="sidebar__menu-link" to="/userPanel/posts">
                        <i className="sidebar__menu-icon bi bi-journal"></i>
                        آگهی های من
                    </NavLink>
                </li>
                <li className="sidebar__menu-item">
                    <NavLink className="sidebar__menu-link" to="/userPanel/bookmarks">
                        <i className="sidebar__menu-icon bi bi-bookmark"></i>
                        نشان ها
                    </NavLink>
                </li>
                <li className="sidebar__menu-item">
                    <NavLink className="sidebar__menu-link" to="/userPanel/notes">
                        <i className="sidebar__menu-icon bi bi-journal"></i>
                        یادداشت ها
                    </NavLink>
                </li>
                <li className="sidebar__menu-item">
                    <NavLink className="sidebar__menu-link" to="/userPanel/recent-seen">
                        <i className="sidebar__menu-icon bi bi-clock-history"></i>
                        بازدید های اخیر
                    </NavLink>
                </li>
            </ul>
            <p className="sidebar__logout sidebar__link-item" id="logout-btn" onClick={()=>authContext.LogOut()}>
                <i
                    className="sidebar__logout-icon sidebar__link-icon bi bi-box-arrow-right"
                ></i>
                خروج
            </p>
            <div className="sidebar__links">
                <a className="sidebar__link" href="#">درباره دیوار</a>
                <a className="sidebar__link" href="#">دریافت برنامه</a>
                <a className="sidebar__link" href="#">پشتیبانی و قوانین</a>
            </div>
            <div className="sidebar__social">
                <a className="sidebar__social-link" href="#">
                    <i className="sidebar__social-icon bi bi-twitter"></i>
                </a>
                <a className="sidebar__social-link" href="#">
                    <i className="sidebar__social-icon bi bi-instagram"></i>
                </a>
                <a className="sidebar__social-link" href="#">
                    <i className="sidebar__social-icon bi bi-linkedin"></i>
                </a>
            </div>
        </div>
    );
}


export default SidebarUserPanel;