import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/authContext';
import LoginModal from '../LoginModal/LoginModal';
import { useNavigate, Link } from 'react-router-dom';

import './HeaderMain.css'

const HeaderMain = ({
    valueSearch,
    setValueSearch,
    GetAllPost,
    category }) => {
    const navigetor = useNavigate()

    const authContext = useContext(AuthContext)

    const [theme, setTheme] = useState(authContext.getLocalStorage('theme'))

    const [activeModal, setActiveModal] = useState(false)
    const [activeModalCities, setActiveModalCities] = useState(false)
    const popularSearch = ['خودروسواری',
        'اپارتمان',
        'موبایل',
        'استخدام',
        'تلویزیون',
        'استخدام',
        'تلویزیون'
    ]
    const [showCityInModal, setShowCityInModal] = useState(false)
    const [allLocation, setAllLocation] = useState({})
    const [allCity, setAllCity] = useState({})
    const [valueSearchCities, setValueSearchCities] = useState('')

    const [cities, setCities] = useState(authContext.getLocalStorage('city'))

    const [showHeaderCategory, setShowHeaderCategory] = useState(false)
    const [isShowLoginModal, setIsShowLoginModal] = useState(false)
    const [isShowDropdownDivarMe, setIsShowDropdownDivarMe] = useState(false)
    const [isLoginUser, setIsLoginUser] = useState(false)


    //* darkModeHandler

    const darkModeHandler = () => {
        setTheme(prevState => {
            let ThemeMode = prevState == 'light' ? 'dark' : 'light'
            authContext.setLocalStorage('theme', ThemeMode)
            return ThemeMode
        })
    }

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

    //* Location

    useEffect(() => {
        GetAllLocation()
    }, [])

    const GetAllLocation = () => {
        fetch(`${authContext.baseUrl}/v1/location`)
            .then(res => res.json()).then(cityAll => {
                setAllLocation(cityAll.data)
            })
    }


    //* Cities Modal


    const showCitiesHandler = (_id, name) => {

        if (!showCityInModal) {
            setShowCityInModal(true)

        }
        let FiltredCities = allLocation.cities.filter((city) => city.province_id == _id)
        if (FiltredCities != allCity.data) {
            setAllCity({ name, data: FiltredCities })
        }
    }
    const checkBoxCitiesHandler = (name, id) => {

        let IsCity = cities.some((city) => city.name == name)



        let ArryCityLocal = cities
        if (!IsCity) { //* Create
            ArryCityLocal.push({ name, id })
            GetAllLocation()
        } else { //! Delete
            ArryCityLocal = ArryCityLocal.filter(city => city.name != name)
        }


        setCities(ArryCityLocal)


    }
    const SetCitiesLocalStorage = () => {
        setActiveModalCities(false)
        authContext.setLocalStorage('city', cities)
        GetAllPost()
    }
    const EmptyCityLocalStorage = () => {
        setCities([])
    }

    useEffect(() => {
        if (valueSearchCities.length) {
            let FilterCityBySearch = allLocation.cities.filter((city) => city.name.includes(valueSearchCities))
            if (FilterCityBySearch.length) {
                setAllCity({ name: valueSearchCities, data: FilterCityBySearch })
                setShowCityInModal(true)
            }
        } else {
            setShowCityInModal(false)
        }

    }, [valueSearchCities])

    // * Categories

    const backToAllCategories = () => {
        document.title = 'دیوار ' + cities[0].name
        navigetor('/main')
    }

    //* HeaderMain Func :)

    const changeValueSearch = (value) => {
        setValueSearch(value)
    }
    const emptyValueSearch = () => {
        setValueSearch('')
        GetAllPost()
    }
    const EnterSearchHandler = (e) => {
        if (e.keyCode == 13) { //! Enter In Input
            GetAllPost()
        }
    }
    const ShowLoginModalHandler = () => {
        if (!isLoginUser) {
            setIsShowLoginModal(true)
        }
    }

    // ! Is Login
    useEffect(() => {
        authContext.isLogin().then(res => setIsLoginUser(res))
    }, [isShowLoginModal])


    return (
        <header className="header">
            <div className="container-fluid">
                <div className="header__wrapper">
                    <div className="header__right">
                        <a className="header__logo-link" href="#" onClick={() => navigetor('/main')}>
                            <img className="header__logo-img" src="../images/header/logo.svg" alt="logo" />
                        </a>
                        <button className="header__country" onClick={() => setActiveModalCities(true)}>
                            <i className="header__country-icon bi bi-geo-alt"></i>
                            <span className="header__country-title">{cities?.length ? (cities.length > 1 ? cities.length + ' شهر' : cities[0].name) : 'تهران'}</span>
                        </button>
                        {/* Start CityModal */}
                        <div className={`city-modal ${activeModalCities && 'city-modal--active'}`} id="city-modal">
                            <div className="city-modal__overlay"></div>
                            <section>
                                <div className="city-modal__header">
                                    <div className="city-modal__header-wrapper">
                                        <div className="city-modal__title-wrapper">
                                            <span className="city-modal__title">انتخاب شهر</span>
                                            <button
                                                id="delete-all-cities"
                                                className={`city-modal__btn ${cities?.length == 0 && 'delete_cities'}`}
                                                onClick={EmptyCityLocalStorage}
                                            >
                                                حذف همه
                                            </button>
                                        </div>
                                        {
                                            cities?.length != 0 ? (
                                                <div className="city-modal__selected" id="city-selected">
                                                    {
                                                        cities?.map((city) => (
                                                            <div className="city-modal__selected-item" key={city.id}>
                                                                <span className="city-modal__selected-text">{city.name}</span>
                                                                <button className="city-modal__selected-btn" onClick={() => checkBoxCitiesHandler(city.name, city.id)}>
                                                                    <i className="city-modal__selected-icon bi bi-x"></i>
                                                                </button>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            ) : (
                                                <p className='my-3 fs-5 text-danger'>حداقل یک شهر را انتخاب کنید.</p>
                                            )
                                        }

                                        <div className="city-modal__searchbar">
                                            <form className="city-modal__form">
                                                <input
                                                    className="city-modal__input"
                                                    id="city-modal-search-input"
                                                    type="text"
                                                    placeholder="جستجو در شهرها"
                                                    value={valueSearchCities}
                                                    onChange={(e) => setValueSearchCities(e.target.value)}
                                                />
                                                <i className="city-modal__icon bi bi-search"></i>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="city-modal__cities">
                                    <ul className="city-modal__cities-list" id="city_modal_list">
                                        {
                                            !showCityInModal ? (

                                                allLocation.provinces?.map((province) => (
                                                    <li
                                                        key={province.id}
                                                        onClick={() => showCitiesHandler(province.id, province.name)}
                                                        className="city-modal__cities-item province-item"
                                                    >
                                                        <span>{province.name}</span>
                                                        <i className="city-modal__cities-icon bi bi-chevron-left"></i>
                                                    </li>
                                                ))
                                            ) : (
                                                <>
                                                    <li id="city_modal_all_province" className="city_modal_all_province" onClick={() => setShowCityInModal(false)}>
                                                        <span>همه شهر ها</span>
                                                        <i className="bi bi-arrow-right-short"></i>
                                                    </li>
                                                    <li className="city-modal__cities-item select-all-city city-item">
                                                        <span>همه شهر های  {allCity.name}</span>
                                                        <div id="checkboxShape"></div>
                                                        <input type="checkbox" />
                                                    </li>

                                                    {
                                                        allCity.data?.map(city => (
                                                            <li className="city-modal__cities-item select-all-city city-item" key={city.id}>
                                                                <span>{city.name}</span>
                                                                <div id="checkboxShape" className={cities.some(citi => citi.name == city.name) ? 'active' : ''}></div>
                                                                <input type="checkbox" onClick={() => checkBoxCitiesHandler(city.name, city.id)} />
                                                                {/*  defaultChecked={cities.some(citi => citi.name == city.name) ? true : false} */}
                                                            </li>
                                                        ))
                                                    }
                                                </>
                                            )
                                        }
                                    </ul>
                                </div>
                                <div className="city-modal__footer">
                                    <div className="city-modal__footer-wrapper">
                                        <button className="city-modal__btn-footer city-modal__close" onClick={() => { setActiveModalCities(false); setShowCityInModal(false) }}>
                                            انصراف
                                        </button>
                                        <button className={`city-modal__btn-footer ${cities?.length != 0 ? 'city-modal__accept--active' : 'city-modal__accept'}`} onClick={SetCitiesLocalStorage}>
                                            تایید
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>
                        {/* End CityModal */}
                        <div className="header__category" onMouseLeave={() => setShowHeaderCategory(false)}>
                            <button className="header__category-btn">
                                <span className="header__category-btn-title" onClick={() => setShowHeaderCategory(true)}>دسته ها</span>
                                <i className="header__category-btn-icon bi bi-chevron-down"></i>
                            </button>
                            <div className={`header__category-menu ${showHeaderCategory ? 'header__category-menu--active' : ''}`}>
                                <div className="header__category-menu-right">
                                    <a className="header__category-menu-btn" href="#" onClick={backToAllCategories}>
                                        <i className="header__category-menu-btn-icon bi bi-arrow-right"></i>
                                        همه آگهی ها
                                    </a>
                                    <ul className="haeder__category-menu-list">
                                        {
                                            category.length && (
                                                category.map((catMenu) => (
                                                    <li className="header__category-menu-item" key={catMenu._id}>
                                                        <a className="header__category-menu-link" href="#">
                                                            <div className="header__category-menu-link-right">
                                                                <i className="header__category-menu-icon bi bi-house"></i>
                                                                {catMenu.title}
                                                            </div>
                                                            <div className="header__category-menu-link-left">
                                                                <i className="header__category-menu-arrow-icon bi bi-chevron-left"></i>
                                                            </div>
                                                        </a>
                                                        <div className="header__category-dropdown">
                                                            <div className="row">
                                                                {
                                                                    catMenu.subCategories.map((subCategory) => (
                                                                        <div className="col-4" key={subCategory._id}>
                                                                            <ul className="header__category-dropdown-list">
                                                                                <li><Link className="header__category-dropdown-title" to={'/main/' + subCategory._id}>{subCategory.title}</Link></li>                                                                                {
                                                                                    subCategory.subCategories.map((subSubCategory) => (
                                                                                        <li className="header__category-dropdown-item" key={subSubCategory._id}>
                                                                                            <Link className="header__category-dropdown-link"
                                                                                                to={'/main/' + subSubCategory._id}>{subSubCategory.title}</Link>
                                                                                        </li>
                                                                                    ))
                                                                                }
                                                                            </ul>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="header__searchbar" onMouseLeave={() => setActiveModal(false)}>
                            <div className="header__form">
                                <input className="header__form-input" type="text" placeholder="جستجو در تمام آگهی ها..." value={valueSearch} onChange={(e) => changeValueSearch(e.target.value)} onMouseEnter={() => setActiveModal(true)} onKeyUp={(e) => EnterSearchHandler(e)} />
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
                            theme == 'light' ? (
                                <a className="header__left-link" href="#" onClick={darkModeHandler}>
                                    <i className="header__left-icon bi bi-moon"></i>
                                    حالت تاریک
                                </a>
                            ) : (

                                <a className="header__left-link" href="#" onClick={darkModeHandler}>
                                    <i className="header__left-icon bi bi-brightness-high"></i>
                                    حالت روشن
                                </a>
                            )
                        }
                        <a className="header__left-link" href="#" onClick={() => setIsShowDropdownDivarMe(true)}>
                            <i className="header__left-icon bi bi-person"></i>
                            دیوار من
                        </a>
                        <div className={`header__left-dropdown ${isShowDropdownDivarMe ? 'header__left-dropdown--active' : ''}`} onMouseLeave={() => setIsShowDropdownDivarMe(false)}>
                            <ul className="header__left-dropdown-list">
                                {
                                    isLoginUser ? (
                                        <>
                                            <li className="header__left-dropdown-item header_dropdown-item_account">
                                                <a
                                                    href="/pages/userPanel/posts.html"
                                                    className="header__left-dropdown-link login_dropdown_link"
                                                >
                                                    <i className="header__left-dropdown-icon bi bi-box-arrow-in-left"></i>
                                                    <div>
                                                        <span>کاربر دیوار </span>
                                                        <p>تلفن </p>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="header__left-dropdown-item">
                                                <a className="header__left-dropdown-link" href="/pages/userPanel/verify.html">
                                                    <i className="header__left-dropdown-icon bi bi-bookmark"></i>
                                                    تایید هویت
                                                </a>
                                            </li>
                                            <li className="header__left-dropdown-item">
                                                <a className="header__left-dropdown-link" href="/pages/userPanel/bookmarks.html">
                                                    <i className="header__left-dropdown-icon bi bi-bookmark"></i>
                                                    نشان ها
                                                </a>
                                            </li>
                                            <li className="header__left-dropdown-item">
                                                <a className="header__left-dropdown-link" href="/pages/userPanel/notes.html">
                                                    <i className="header__left-dropdown-icon bi bi-journal"></i>
                                                    یادداشت ها
                                                </a>
                                            </li>
                                            <li className="header__left-dropdown-item logout-link" id="login_btn">
                                                <p className="header__left-dropdown-link" href="#">
                                                    <i className="header__left-dropdown-icon bi bi-shop"></i>
                                                    خروج
                                                </p>
                                            </li>

                                        </>
                                    ) : (
                                        <>

                                            <li className="header__left-dropdown-item">
                                                <a className="header__left-dropdown-link" href="#" onClick={ShowLoginModalHandler}>
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
                                        </>
                                    )
                                }
                            </ul>
                        </div>
                        <a className="header__left-link" href="#">
                            <i className="header__left-icon bi bi-chat"></i>
                            چت
                        </a>
                        <Link className="header__left-link" to="/support">
                            پشتیبانی
                        </Link>
                        <button className="header__left-btn">ثبت آگهی</button>
                    </div>
                </div>
            </div>
            {/* Show Login Modal */}
            <LoginModal isShow={isShowLoginModal} setIsShow={(e) => setIsShowLoginModal(e)} />
        </header>
    );
}

export default HeaderMain;