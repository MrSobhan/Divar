import React, { useContext, useEffect, useState } from 'react';
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/authContext';
import './Index.css'

const Index = () => {

    const [cities, SetCities] = useState([])
    const navigetor = useNavigate()

    const authContext = useContext(AuthContext)
    const [getCitiesIndex, setGetCitiesIndex] = useState(authContext.getLocalStorage('city'))
    const [valueSearchCity, setValueSearchCity] = useState('')
    const [citySearch, setCitySearch] = useState([])


    useEffect(() => {

        if (getCitiesIndex) {
            navigetor(`/main`)
        }
        fetch(`${authContext.baseUrl}/v1/location`)
            .then(res => res.json()).then(cityAll => {
                SetCities(cityAll.data.cities)
                // console.log(cities.data.cities);
            })
    }, [])

    const cityUrlHandler = (e, cityName, cityId) => {
        e.preventDefault()
        navigetor(`/main`)
        // document.cookie = `city=${cityHref}`
        authContext.setLocalStorage('city', [{ name: cityName, id: cityId }])
    }

    const changeValueCityHandler = (city) => {
        setValueSearchCity(city)
    }

    useEffect(() => {

        setCitySearch(cities.filter((city) => city.name.startsWith(valueSearchCity)))

    }, [valueSearchCity])


    return (
        <>
            <Header />
            <main className="main">
                <span className="main__text-first">
                    دﯾﻮار، ﭘﺎﯾﮕﺎه ﺧﺮﯾﺪ و ﻓﺮوش ﺑﯽ‌واﺳﻄﻪ‌!
                </span>
                <span className="main__text-second">
                    اﮔﻪ دﻧﺒﺎل ﭼﯿﺰی ﻫﺴﺘﯽ، ﺷﻬﺮت رو اﻧﺘﺨﺎب ﮐﻦ و ﺗﻮ دﺳﺘﻪ‌ﺑﻨﺪی‌ﻫﺎ ﺑﻪ دﻧﺒﺎﻟﺶ
                    ﺑﮕﺮد. اﮔﺮ ﻫﻢ ﻣﯽ‌ﺧﻮای ﭼﯿﺰی ﺑﻔﺮوﺷﯽ، ﭼﻨﺪ ﺗﺎ ﻋﮑﺲ ﺧﻮب ازش ﺑﮕﯿﺮ و آﮔﻬﯿﺖ رو
                    ﺑﭽﺴﺒﻮن ﺑﻪ دﯾﻮار.</span>
                <form className="main__form">
                    <i className="main__icon-input bi bi-search"></i>
                    <input className="main__input" type="text" placeholder="جستجوی شهر" onChange={(e) => changeValueCityHandler(e.target.value)} />

                    <ul className={valueSearchCity.length != 0 ? "search-result-cities active" : "search-result-cities"}>
                        {citySearch.length != 0 ? (citySearch.map((city) => (

                            <li onClick={(e) => cityUrlHandler(e, city.name, city.id)}>{city.name}</li>
                        ))) : (
                            <>
                                <img src="https://support-faq.divarcdn.com/web/2024/03/static/media/magnifier.7f88b2e3f8ae30f4333986d0b0fbcf1d.svg" className='imgNotFound' alt="" />
                                <p className="empty">نتیجه‌ای برای جستجوی شما پیدا نشد.</p>
                            </>
                        )}

                    </ul>
                </form>
                <div className="main__cities">
                    <span className="main__cities-title">شهر های پر بازدید</span>
                    <ul className="main__cities-list">
                        <div className="row">
                            {cities.filter(city => city.popular).map(city => (


                                <div className="col-2 d-flex justify-content-center" key={city.id}>
                                    <li className="main__cities-item">
                                        <a className="main__cities-link" onClick={(e) => cityUrlHandler(e, city.name, city.id)} href="#">{city.name}</a>
                                    </li>
                                </div>
                            ))}

                        </div>
                    </ul>
                </div>
            </main>
            <Footer />
        </>

    );
}

export default Index;