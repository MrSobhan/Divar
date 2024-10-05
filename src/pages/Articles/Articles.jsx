import React, { useContext, useEffect, useState } from 'react';
import HeaderDefault from '../../Components/HeaderDefault/HeaderDefault';
import FooterPost from '../../Components/FooterPost/FooterPost';
import AuthContext from '../../context/authContext';
import { Link, useParams } from 'react-router-dom';

import './Articles.css'
const Articles = () => {
    const authContext = useContext(AuthContext)
    const { articlesId } = useParams()
    const [category, setCategory] = useState([])

    useEffect(() => {

        fetch(`${authContext.baseUrl}/v1/support/category-articles`)
            .then(res => res.json()).then(article => {
                const FiltredCategory = article.data.categories.find((category) => category._id === articlesId)
                setCategory(FiltredCategory)
                // console.log(FiltredCategory);

                document.title = FiltredCategory.name; //! Set Title Doc :)
            })


    }, [])


    return (

        <>
            <HeaderDefault />
            <main className="main-article">
                <div className="breadcrumb" id="breadcrumb">
                    <a href="/pages/support.html">پشتیبانی</a>
                    <i className="bi bi-chevron-left"></i>
                    <span>{category.name}</span>
                </div>

                <div className="category-info" id="category-info">
                    <img className="category-info-icon" src={`${authContext.baseUrl}/${category.pic?.path}`} />
                    <p className="category-info-title">{category.name}</p>
                </div>
                <div className="articles" id="articles">
                    {
                        category.articles?.map((article) => (
                            <Link to={`/article/${article._id}`} className="article" key={article._id}>
                                <p>{article.title}</p>
                                <div>
                                    <i className="bi bi-arrow-left"></i>
                                    <span>{article.body.slice(0, 180)} ...</span>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </main>
            <FooterPost />
        </>
    );
}


export default Articles;