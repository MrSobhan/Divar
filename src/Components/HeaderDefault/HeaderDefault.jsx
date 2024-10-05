import React from 'react';
import '../HeaderMain/HeaderMain.css'
import { useNavigate, Link } from 'react-router-dom';

const HeaderDefault = () => {
const navigetor = useNavigate()
    return(
        <header className="header">
            <div className="container-fluid">
                <div className="header__wrapper">
                    <div className="header__right">
                        <a className="header__logo-link" href="#" onClick={()=>navigetor('/main')}>
                            <img className="header__logo-img" src="../images/header/logo.svg" alt="logo" />
                        </a>
                    </div>
                    <div className="header__left">

                        <div className="header__left-dropdown">
                            <ul className="header__left-dropdown-list">
                                <li className="header__left-dropdown-item">
                                    <a className="header__left-dropdown-link" href="#">
                                        <i className="header__left-dropdown-icon bi bi-box-arrow-in-left"></i>
                                        ورود
                                    </a>
                                </li>
                                <li className="header__left-dropdown-item">
                                    <a className="header__left-dropdown-link" href="#">
                                        <i className="header__left-dropdown-icon bi bi-bookmark"></i>
                                        نشان ها
                                    </a>
                                </li>
                                <li className="header__left-dropdown-item">
                                    <a className="header__left-dropdown-link" href="#">
                                        <i className="header__left-dropdown-icon bi bi-journal"></i>
                                        یادداشت ها
                                    </a>
                                </li>
                                <li className="header__left-dropdown-item">
                                    <a className="header__left-dropdown-link" href="#">
                                        <i className="header__left-dropdown-icon bi bi-clock-history"></i>
                                        بازدید های اخیر
                                    </a>
                                </li>
                                <li className="header__left-dropdown-item">
                                    <a className="header__left-dropdown-link" href="#">
                                        <i className="header__left-dropdown-icon bi bi-shop"></i>
                                        دیوار برای کسب و کارها
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <a className="header__left-link" href="#">
                            <i className="header__left-icon bi bi-chat"></i>
                            چت
                        </a>
                        <a className="header__left-link" href="#">
                            پشتیبانی
                        </a>
                        <button className="header__left-btn">ثبت آگهی</button>
                    </div>
                </div>
            </div>

        </header>
    );
}

export default HeaderDefault;