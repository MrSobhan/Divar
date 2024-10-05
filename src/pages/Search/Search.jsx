import React, { useContext, useEffect, useState } from 'react';
import HeaderDefault from '../../Components/HeaderDefault/HeaderDefault';
import FooterPost from '../../Components/FooterPost/FooterPost';
import AuthContext from '../../context/authContext';
import { useNavigate, Link, useParams } from 'react-router-dom';
import './Search.css'
const Search = () => {
    const authContext = useContext(AuthContext)
    const navigator = useNavigate()
    const { searchKey } = useParams()
    const [resultSearch, setResultSearch] = useState([])
    useEffect(() => {

        fetch(`${authContext.baseUrl}/v1/support/articles/search?s=${searchKey}`)
            .then(res => res.json()).then(res => {
                // console.log(res.data.articles);
                setResultSearch(res.data.articles)

            })

    }, [])
    return (

        <>
            <HeaderDefault />
            <main className="main">
                <div className="breadcrumb" id="breadcrumb">
                    <a href="/pages/support.html">پشتیبانی</a>
                    <i className="bi bi-chevron-left"></i>
                    <span>نتایج جستجوی</span>
                </div>
                <div className="search-title">
                    <p>نتایج جستجوی</p>
                    <span>{`«${searchKey}»`}</span>
                </div>
                <section className="search-results" id="search-results">
                    {
                        resultSearch.length != 0 ? (
                            resultSearch.map((article) => (
                                <Link to={`/article/${article._id}`}>
                                    <div>
                                        <p>{article.title}</p>
                                    </div>
                                    <i className="bi bi-chevron-left"></i>
                                </Link>
                            )
                            )
                        ) : (
                            <>
                                <img src="https://support-faq.divarcdn.com/web/2024/03/static/media/magnifier.7f88b2e3f8ae30f4333986d0b0fbcf1d.svg" />
                                <p>نتیجه‌ای برای جستجوی شما یافت نشد</p>
                                <span>پیشنهاد می‌کنیم:</span>
                                <span>نگارش کلمات خود را بررسی نمایید.</span>
                                <span>کلمات کلیدی دیگری را انتخاب کنید.</span>
                            </>
                        )
                    }
                </section>
            </main>
            <FooterPost />
        </>
    );
}


export default Search;