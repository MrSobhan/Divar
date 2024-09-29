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

    const [cities, setCities] = useState(authContext.getLocalStorage('city'))




    const darkModeHandler = () => {
        setTheme(prevState => {
            let ThemeMode = prevState == 'dark' ? 'light' : 'dark'
            authContext.setLocalStorage('theme', ThemeMode)
            return ThemeMode
        })
    }

    const fetchAllLocation = () => {
        fetch(`${authContext.baseUrl}/v1/location`)
            .then(res => res.json()).then(cityAll => {
                setAllLocation(cityAll.data)
            })
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
    }, [theme])

    useEffect(() => {
        fetchAllLocation()
    }, [])



    const showCitiesHandler = (_id, name) => {

        if (!showCityInModal) {
            setShowCityInModal(true)

        }
        let FiltredCities = allLocation.cities.filter((city) => city.province_id == _id)
        if (FiltredCities != allCity.data) {
            setAllCity({ name, data: FiltredCities })
        }
    }
    const SetCityToLocalStorage = (name, id) => {

        let IsCity = cities.some((city) => city.name == name)



        let ArryCityLocal = cities
        if (!IsCity) { //* Create
            ArryCityLocal.push({ name, id })
            fetchAllLocation()
        } else { //! Delete
            ArryCityLocal = ArryCityLocal.filter(city => city.name != name)
        }


        setCities(ArryCityLocal)


    }
    const SetCitiesLocalStorage = () => {
        setActiveModalCities(false)
        authContext.setLocalStorage('city', cities)
    }
    const EmptyCityLocalStorage = () => {
        setCities([])
    }

    return (
        <header className="header">
            <div className="container-fluid">
                <div className="header__wrapper">
                    <div className="header__right">
                        <a className="header__logo-link" href="#">
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
                                                                <button className="city-modal__selected-btn" onClick={() => SetCityToLocalStorage(city.name, city.id)}>
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
                                                            <li className="city-modal__cities-item select-all-city city-item">
                                                                <span>{city.name}</span>
                                                                <div id="checkboxShape" className={cities.some(citi => citi.name == city.name) ? 'active' : ''}></div>
                                                                <input type="checkbox" onClick={() => SetCityToLocalStorage(city.name, city.id)} />
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
                                        <button className="city-modal__btn-footer city-modal__close" onClick={() => setActiveModalCities(false)}>
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