import React, { useContext, useEffect, useState } from 'react';
import HeaderDefault from '../../Components/HeaderDefault/HeaderDefault';
import FooterPost from '../../Components/FooterPost/FooterPost';
import AuthContext from '../../context/authContext';
import { useNavigate, Link } from 'react-router-dom';

import './Support.css';
const Support = () => {
    const authContext = useContext(AuthContext)
    const navigator = useNavigate()
    const [popularArticles, setPopularArticles] = useState([])
    const [supportArticlesCategory, setSupportArticlesCategory] = useState([])
    const [valueSearchArticle, setValueSearchArticle] = useState('')
    const [articles, setArticles] = useState([])
    const [filteredArticles, setFilteredArticles] = useState([])
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

    useEffect(() => {
        if (articles.length) {
            setFilteredArticles(articles.filter((article) => article.title?.includes(valueSearchArticle)))
        }
    }, [articles])

    const SearchArticleHandler = (e) => {
        supportArticlesCategory.forEach((category) => {
            let categoryArticles = category.articles;
            setArticles([...categoryArticles])
        })
        if (e.keyCode == 13) {
            navigator(`/support/search/${valueSearchArticle}`)
        }
    }

    return (
        <>
            <HeaderDefault />
            <main className="main-container">
                <div className="topbar">
                    <p>به مرکز پشتیبانی دیوار خوش آمدید</p>
                    <span>چطور می‌توانیم کمکتان کنیم؟</span>
                    <div>
                        <i id="remove-icon" className="bi bi-x" style={{ display: `${valueSearchArticle.length != 0 ? 'block' : 'none'}` }} onClick={() => setValueSearchArticle('')}></i>
                        <input autoComplete="off" id="search-input" type="text" placeholder="جستجو در مقالات" value={valueSearchArticle} onChange={(e) => setValueSearchArticle(e.target.value)} onKeyUp={(e) => SearchArticleHandler(e)} />
                        <i className="bi bi-search input-search-icon"></i>
                        <div className={`result ${valueSearchArticle.trim().length ? 'active' : ''}`} id="search-result">
                            {
                                filteredArticles.length ? (
                                    <>
                                        <Link to={`/support/search/${valueSearchArticle}`}>
                                            <i className="bi bi-search"></i>
                                            {valueSearchArticle}
                                        </Link>
                                        {
                                            filteredArticles.map((article) => (
                                                <Link to={`/article/${article._id}`} key={article._id}>
                                                    <i className="bi bi-card-text"></i>
                                                    {article.title}
                                                </Link>
                                            ))
                                        }
                                    </>
                                ) : (
                                    <Link to={`/support/search/${valueSearchArticle}`}>
                                        <i className="bi bi-search"></i>
                                        {valueSearchArticle}
                                    </Link>
                                )
                            }
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
                                    <Link to={`/article/${article._id}`} className="article" key={article._id}>
                                        <p>{article.title}</p>
                                        <span>{article.body.slice(0, 180)} ...</span>
                                        <div>
                                            <i className="bi bi-arrow-left"></i>
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
                                <Link to={`/articles/${category._id}`} key={category._id}>
                                    <img src={`${authContext.baseUrl}/${category.pic.path}`} width="64" height="64" alt="" />
                                    <div>
                                        <p>{category.name}</p>
                                        <span>نحوه انجام پرداخت، استفاده از کیف پول، افزایش بازدید، استفاده از
                                        </span>
                                    </div>
                                    <i className="bi bi-chevron-left"></i>
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