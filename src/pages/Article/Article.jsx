import React, { useContext, useEffect, useState } from 'react';
import HeaderDefault from '../../Components/HeaderDefault/HeaderDefault';
import FooterPost from '../../Components/FooterPost/FooterPost';
import AuthContext from '../../context/authContext';
import { Link, useParams } from 'react-router-dom';

import './Article.css'
const Article = () => {
    const authContext = useContext(AuthContext)
    const { articleId } = useParams()
    const [article, setArticle] = useState([])
    const [sameArticles, setSameArticles] = useState([])

    useEffect(() => {

        fetch(`${authContext.baseUrl}/v1/support/articles/${articleId}`)
            .then(res => res.json()).then(res => {
                setArticle(res.data.article)
                document.title = res.data.article.title; //! Set Title Doc :)


                fetch(`${authContext.baseUrl}/v1/support/categories/${res.data.article.categories[0]}/articles`)
                    .then(res => res.json()).then(res => {
                        setSameArticles(res.data.articles)
                    })
            })

    }, [])
    return (

        <>
            <HeaderDefault />
            <main className="main-Article">
                <div className="breadcrumb" id="breadcumb">
                    <Link to="/support"> پشتیبانی</Link>
                    <i className="bi bi-chevron-left"></i>
                    <span>{article.title}</span>
                </div>

                <p className="title" id="article-title">{article.title}</p>
                <div className="content" id="article-body">{article.body}</div>

            </main>

            <div className="same_articles-container">
                <p>مقالات مرتبط</p>
                <div id="same-articles">

                    {
                        sameArticles.length && sameArticles.map((article) => (
                            <Link to={`/article/${article._id}`} key={article._id}>{article.title}</Link>
                        ))
                    }
                </div>
            </div>
            <FooterPost />
        </>
    );
}


export default Article;