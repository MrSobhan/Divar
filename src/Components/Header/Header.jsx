import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/authContext';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {

    const authContext = useContext(AuthContext)
    const [theme, setTheme] = useState(authContext.getLocalStorage('theme'))
    useEffect(() => {
        if (theme == 'light') {
            document.documentElement.style.setProperty('--white-color', '#f4f4f4');
            document.documentElement.style.setProperty('--text-color', 'rgba(0, 0, 0, 0.56)');
            document.documentElement.style.setProperty('--black-color', '#242424');
            document.documentElement.style.setProperty('--border', '1px solid rgba(0, 0, 0, 0.2)');
        } else {
            document.documentElement.style.setProperty('--white-color', '#242424');
            document.documentElement.style.setProperty('--text-color', 'rgba(255, 255, 255, 0.56)');
            document.documentElement.style.setProperty('--black-color', '#fff');
            document.documentElement.style.setProperty('--border', '1px solid rgba(255, 255, 255, 0.2)');
        }
    }, [theme])
    return (
        <header className="header">
            <img className="header__logo" src="../images/header/logo.svg" />
            <ul className="header__menu-list">
                <li className="header__menu-item">
                    <Link className="header__menu-link" to="/new">ثبت آگهی</Link>
                </li>
                <li className="header__menu-item">
                    <Link className="header__menu-link" to="/support">درباره دیوار</Link>
                </li>
                <li className="header__menu-item">
                    <Link className="header__menu-link" to="#">دریافت برنامه</Link>
                </li>
                <li className="header__menu-item">
                    <Link className="header__menu-link" to="/support">بلاگ</Link>
                </li>
                <li className="header__menu-item">
                    <Link className="header__menu-link" to="/support">پشتیبانی</Link>
                </li>
            </ul>
        </header>
    );
}

export default Header;