import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/authContext';
import './HeaderMain.css'

const HeaderMain = ({ changeValueSearch,
    emptyValueSearch,
    keyUpInputHandler,
    valueSearch,
    setValueSearch }) => {

    const authContext = useContext(AuthContext)
    const darkMode = authContext.getLocalStorage('theme')
    const [theme, setTheme] = useState('dark')
    const [activeModal, setActiveModal] = useState(false)
    const [popularSearch, setPopularSearch] = useState(['خودروسواری',
        'اپارتمان',
        'موبایل',
        'استخدام',
        'تلویزیون',
        'استخدام',
        'تلویزیون'
    ])

    const darkModeHandler = () => {
        // if (darkMode) {
        setTheme(prevState => {
            let ThemeMode = prevState == 'dark' ? 'light' : 'dark'
            authContext.setLocalStorage('theme', ThemeMode)
            return ThemeMode
        })
        // }
    }

    useEffect(() => {
        if (darkMode) {
            setTheme(darkMode)
        }
    }, [darkMode])

    useEffect(() => {
        if (theme == 'dark') {
            document.documentElement.style.setProperty('--white-color', '#242424');
            document.documentElement.style.setProperty('--text-color', 'rgba(255, 255, 255, 0.56)');
            document.documentElement.style.setProperty('--black-color', '#fff');
            document.documentElement.style.setProperty('--border', '1px solid rgba(255, 255, 255, 0.2)');
        } else {
            document.documentElement.style.setProperty('--white-color', '#f4f4f4');
            document.documentElement.style.setProperty('--text-color', 'rgba(0, 0, 0, 0.56)');
            document.documentElement.style.setProperty('--black-color', '#242424');
            document.documentElement.style.setProperty('--border', '1px solid rgba(0, 0, 0, 0.2)');

        }
        console.log('change!!!');
    }, [theme])

    return (
        <header className="header">
            <div className="container-fluid">
                <div className="header__wrapper">
                    <div className="header__right">
                        <a className="header__logo-link" href="#">
                            <img className="header__logo-img" src="../images/header/logo.svg" alt="logo" />
                        </a>
                        <button className="header__country">
                            <i className="header__country-icon bi bi-geo-alt"></i>
                            <span className="header__country-title">اصفهان</span>
                        </button>
                        <div className="header__category">
                            <button className="header__category-btn">
                                <span className="header__category-btn-title">دسته ها</span>
                                <i className="header__category-btn-icon bi bi-chevron-down"></i>
                            </button>
                            <div className="header__category-menu">
                                <div className="header__category-menu-right">
                                    <a className="header__category-menu-btn" href="#">
                                        <i className="header__category-menu-btn-icon bi bi-arrow-right"></i>
                                        همه آگهی ها
                                    </a>
                                    <ul className="haeder__category-menu-list">
                                        <li className="header__category-menu-item">
                                            <a className="header__category-menu-link" href="#">
                                                <div className="header__category-menu-link-right">
                                                    <i className="header__category-menu-icon bi bi-house"></i>
                                                    املاک
                                                </div>
                                                <div className="header__category-menu-link-left">
                                                    <i className="header__category-menu-arrow-icon bi bi-chevron-left"></i>
                                                </div>
                                            </a>
                                            <div className="header__category-dropdown">
                                                <div className="row">
                                                    <div className="col-4">
                                                        <ul className="header__category-dropdown-list">
                                                            <a className="header__category-dropdown-title" href="#">فروش مسکونی</a>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-4">
                                                        <ul className="header__category-dropdown-list">
                                                            <a className="header__category-dropdown-title" href="#">فروش مسکونی</a>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-4">
                                                        <ul className="header__category-dropdown-list">
                                                            <a className="header__category-dropdown-title" href="#">فروش مسکونی</a>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-4">
                                                        <ul className="header__category-dropdown-list">
                                                            <a className="header__category-dropdown-title" href="#">فروش مسکونی</a>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="header__category-menu-item">
                                            <a className="header__category-menu-link" href="#">
                                                <div className="header__category-menu-link-right">
                                                    <i className="header__category-menu-icon bi bi-house"></i>
                                                    املاک
                                                </div>
                                                <div className="header__category-menu-link-left">
                                                    <i className="header__category-menu-arrow-icon bi bi-chevron-left"></i>
                                                </div>
                                            </a>
                                            <div className="header__category-dropdown">
                                                <div className="row">
                                                    <div className="col-4">
                                                        <ul className="header__category-dropdown-list">
                                                            <a className="header__category-dropdown-title" href="#">فروش مسکونی</a>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-4">
                                                        <ul className="header__category-dropdown-list">
                                                            <a className="header__category-dropdown-title" href="#">فروش مسکونی</a>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-4">
                                                        <ul className="header__category-dropdown-list">
                                                            <a className="header__category-dropdown-title" href="#">فروش مسکونی</a>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-4">
                                                        <ul className="header__category-dropdown-list">
                                                            <a className="header__category-dropdown-title" href="#">فروش مسکونی</a>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="header__category-menu-item">
                                            <a className="header__category-menu-link" href="#">
                                                <div className="header__category-menu-link-right">
                                                    <i className="header__category-menu-icon bi bi-house"></i>
                                                    املاک
                                                </div>
                                                <div className="header__category-menu-link-left">
                                                    <i className="header__category-menu-arrow-icon bi bi-chevron-left"></i>
                                                </div>
                                            </a>
                                            <div className="header__category-dropdown">
                                                <div className="row">
                                                    <div className="col-4">
                                                        <ul className="header__category-dropdown-list">
                                                            <a className="header__category-dropdown-title" href="#">فروش مسکونی</a>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-4">
                                                        <ul className="header__category-dropdown-list">
                                                            <a className="header__category-dropdown-title" href="#">فروش مسکونی</a>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-4">
                                                        <ul className="header__category-dropdown-list">
                                                            <a className="header__category-dropdown-title" href="#">فروش مسکونی</a>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-4">
                                                        <ul className="header__category-dropdown-list">
                                                            <a className="header__category-dropdown-title" href="#">فروش مسکونی</a>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                            <li className="header__category-dropdown-item">
                                                                <a className="header__category-dropdown-link"
                                                                    href="#">آپارتمان</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="header__searchbar" onMouseLeave={() => setActiveModal(false)}>
                            <div className="header__form">
                                <input className="header__form-input" type="text" placeholder="جستجو در تمام آگهی ها..." value={valueSearch} onChange={(e) => changeValueSearch(e.target.value)} onMouseEnter={() => setActiveModal(true)} onKeyUp={(e) => keyUpInputHandler(e)} />
                                <i className={valueSearch?.length != 0 ? 'bi bi-x-circle active' : 'bi bi-x-circle'} onClick={emptyValueSearch}></i>
                            </div>
                            <i className="header__searchbar-icon bi bi-search"></i>
                            <div className="header__searchbar-dropdown" style={{ display: activeModal ? '' : 'none' }}>
                                <span className="header__searchbar-dropdown-title">بیشترین جستجوهای دیوار</span>
                                <ul className="header__searchbar-dropdown-list">
                                    {
                                        popularSearch.map((item, index) => (

                                            <li className="header__searchbar-dropdown-item" key={index}>
                                                <a className="header__searchbar-dropdown-link" href="#" onClick={(e) => setValueSearch(e.target.innerHTML)}>{item}</a>
                                            </li>
                                        ))
                                    }

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="header__left">
                        {
                            theme == 'dark' ? (
                                <a className="header__left-link" href="#" onClick={darkModeHandler}>
                                    <i className="header__left-icon bi bi-brightness-high"></i>
                                    حالت روشن
                                </a>
                            ) : (
                                <a className="header__left-link" href="#" onClick={darkModeHandler}>
                                    <i className="header__left-icon bi bi-moon"></i>
                                    حالت تاریک
                                </a>
                            )
                        }
                        <a className="header__left-link" href="#">
                            <i className="header__left-icon bi bi-person"></i>
                            دیوار من
                        </a>
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

export default HeaderMain;