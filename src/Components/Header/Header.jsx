import React from 'react';
import './Header.css'

const Header = () => {
    return (
        <header className="header">
            <img className="header__logo" src="../images/header/logo.svg" />
            <ul className="header__menu-list">
                <li className="header__menu-item">
                    <a className="header__menu-link" href="#">ثبت آگهی</a>
                </li>
                <li className="header__menu-item">
                    <a className="header__menu-link" href="#">درباره دیوار</a>
                </li>
                <li className="header__menu-item">
                    <a className="header__menu-link" href="#">دریافت برنامه</a>
                </li>
                <li className="header__menu-item">
                    <a className="header__menu-link" href="#">بلاگ</a>
                </li>
                <li className="header__menu-item">
                    <a className="header__menu-link" href="#">پشتیبانی</a>
                </li>
            </ul>
        </header>
    );
}

export default Header;