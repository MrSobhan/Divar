import React, { useContext, useEffect, useState } from 'react';
import HeaderDefault from '../../Components/HeaderDefault/HeaderDefault';
import FooterPost from '../../Components/FooterPost/FooterPost';
import AuthContext from '../../context/authContext';
import { useNavigate, useParams, Link } from 'react-router-dom';

import './Support.css';
const Support = () => {
    const authContext = useContext(AuthContext)
    const navigator = useNavigate()
    const [popularArticles, setPopularArticles] = useState([])
    const [supportArticlesCategory, setSupportArticlesCategory] = useState([])
    useEffect(() => {

        fetch(`${authContext.baseUrl}/v1/support/category-articles`)
            .then(res => res.json()).then(article => {
                // console.log(article.data.categories);
                setSupportArticlesCategory(article.data.categories);
                setPopularArticles(article.data.categories.find(
                    (category) => category.shortName === "popular_articles"
                ))
            })

    }, [])

    return (
        <>
            <HeaderDefault />
            <main className="main-container">
                <div className="topbar">
                    <p>به مرکز پشتیبانی دیوار خوش آمدید</p>
                    <span>چطور می‌توانیم کمکتان کنیم؟</span>
                    <div>
                        <i id="remove-icon" className="bi bi-x"></i>
                        <input autocomplete="off" id="search-input" type="text" placeholder="جستجو در مقالات" />
                        <i className="bi bi-search input-search-icon"></i>
                        <div className="result" id="search-result">

                        </div>
                    </div>
                </div>
                <div className="support_container">
                    <div className="articles">
                        <div className="articles_title">
                            <p>شاید برای شما هم سوال باشد</p>
                        </div>
                        <section id="popular-articles">

                            {
                                popularArticles.articles?.map((article) => (
                                    <Link to={`/article/${article._id}`} class="article">
                                        <p>{article.title}</p>
                                        <span>{article.body.slice(0, 180)} ...</span>
                                        <div>
                                            <i class="bi bi-arrow-left"></i>
                                            <p>ادامه مقاله</p>
                                        </div>
                                    </Link>
                                ))
                            }
                        </section>
                    </div>

                    <div className="articles_title">
                        <p>با دیوار بیشتر آشنا شوید</p>
                    </div>
                    <div className="categories" id="categories-container">
                        {
                            supportArticlesCategory.map((category) => (
                                <Link to={`/articles/${category._id}`}>
                                    <img src={`${authContext.baseUrl}/${category.pic.path}`} width="64" height="64" alt="" />
                                    <div>
                                        <p>{category.name}</p>
                                        <span>نحوه انجام پرداخت، استفاده از کیف پول، افزایش بازدید، استفاده از
                                        </span>
                                    </div>
                                    <i class="bi bi-chevron-left"></i>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </main>
            <FooterPost />
        </>

    );
}

export default Support;