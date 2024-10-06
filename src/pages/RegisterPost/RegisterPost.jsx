import React, { useContext, useEffect, useState } from 'react';
import HeaderDefault from '../../Components/HeaderDefault/HeaderDefault';
import FooterPost from '../../Components/FooterPost/FooterPost';
import AuthContext from '../../context/authContext';
import { Link, useParams } from 'react-router-dom';

import './RegisterPost.css';

const RegisterPost = () => {
    const authContext = useContext(AuthContext)
    const { categoryId } = useParams()
    const [subCategory, setSubCategory] = useState([])


    useEffect(() => {
        console.log(categoryId);

        fetch(`${authContext.baseUrl}/v1/category/sub`)
            .then(res => res.json()).then(res => {

                setSubCategory(res.data.categories.find(
                    (category) => category._id == categoryId
                ))
            })
    }, [])

    return (
        <>
            <HeaderDefault />
            <main className="main">
                <p className="category-title">ثبت آگهی</p>
                <div className="category_details">
                    <p id="subCategory-title">{subCategory.title}</p>
                    <img
                        src="https://s100.divarcdn.com/statics/2024/02/entertainment.2ee67eb3.png"
                        alt
                    />
                    <Link to="/new">تغییر دسته‌بندی</Link>
                </div>
                <div className="groups">
                    <div className="group">
                        <p className="field-title">شهر</p>
                        <select id="city-select" required="required"></select>
                    </div>
                    <div className="group">
                        <p className="field-title">محله</p>
                        <select id="neighborhood-select" required="required"></select>
                    </div>
                </div>
                <div>
                    <p className="field-title">موقعیت مکانی آگهی</p>
                    <div id="map"></div>
                    <div className="map-controll">
                        <p>موقعیت دقیق نمایش داده نشود</p>
                        <label className="switch">
                            <input className="icon-controll" type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>
                <div className="uploader">
                    <p className="field-title">عکس آگهی</p>
                    <span>عکس‌هایی مربوط به آگهی اضافه کنید.</span>
                    <span>در صورت نداشتن عکس ، آگهی را بدون عکس ثبت کنید</span>
                    <div className="post-images">
                        <div className="uploader-box">
                            <i className="bi bi-image"></i>
                            <i className="bi bi-plus-circle-fill"></i>
                            <input id="uploader" type="file" />
                        </div>
                        <div className="images" id="images-container"></div>
                    </div>
                    <span>تعداد عکس‌های انتخاب شده نباید بیشتر از ۲۰ باشد.</span>
                </div>
                <div className="groups" id="dynamic-fields">

                    {
                        subCategory.length != 0 && (
                            subCategory.productFields.map((field) => (
                                field.type === "selectbox"
                                    ?
                                    <div className="group">
                                        <p className="field-title">{field.name}</p>
                                        <div className="field-box">
                                            <select required="required">
                                                {/*  onchange="fieldChangeHandler('${field.slug
                                    }', event.target.value)" */}
                                                <option value="default">انتخاب</option>
                                                {field.options.map(
                                                    (option) =>
                                                        <option value={`${option}`}>{option}</option>
                                                )}
                                            </select>
                                            <svg>
                                                <use xlink:href="#select-arrow-down"></use>
                                            </svg>
                                        </div>
                                        <svg className="sprites">
                                            <symbol id="select-arrow-down" viewBox="0 0 10 6">
                                                <polyline points="1 1 5 5 9 1"></polyline>
                                            </symbol>
                                        </svg>
                                    </div>

                                    :
                                    <div className="group checkbox-group">
                                        <input className="checkbox" type="checkbox" onchange="fieldChangeHandler('${field.slug}', event.target.checked)" />
                                        <p>{field.name}</p>
                                    </div>

                            ))
                        )
                    }
                </div>

                <div className="groups">
                    <div className="group edit-post-title">
                        <p className="field-title">قیمت</p>
                        <input id="post-price-input" type="number" />
                    </div>
                    <div className="group checkbox-group">
                        <input className="checkbox" id="exchange-checkbox" type="checkbox" />
                        <p>مایلم معاوضه کنم</p>
                    </div>
                    <div className="group">
                        <p className="field-title">عنوان آگهی</p>
                        <span
                        >در عنوان آگهی به موارد مهمی مانند نوع ملک و متراژ اشاره کنید.
                        </span>
                        <input id="post-title-input" type="text" />
                    </div>

                    <div className="group">
                        <p className="field-title">توضیحات آگهی</p>
                        <span>در توضیحات آگهی به مواردی مانند شرایط فروش، جزئیات و ویژگی‌های قابل
                            توجه، دسترسی‌های محلی و موقعیت قرارگیری ملک اشاره کنید.</span>
                        <textarea
                            id="post-description-textarea"
                            cols="30"
                            rows="8"></textarea>
                    </div>
                </div>
                <div className="post_controll">
                    <a href="/pages/posts.html">انصراف</a>
                    <button id="register-btn">ارسال آگهی</button>
                </div>
            </main>
            <FooterPost />
        </>
    );
}


export default RegisterPost;