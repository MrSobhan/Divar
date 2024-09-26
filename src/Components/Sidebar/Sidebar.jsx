import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/authContext'
import { useNavigate, Link, useParams } from 'react-router-dom';
import './Sidebar.css'
import Social from '../Social/Social';
import BodyCategoryItem from '../bodyCategoryItem/bodyCategoryItem';

const Sidebar = () => {
    const authContext = useContext(AuthContext)
    const { categoryId } = useParams()
    const navigetor = useNavigate()

    // console.log(categoryId);

    const [category, setCategory] = useState([])
    const [subCategory, setSubCategory] = useState([])
    // const [subSubCategory, setSubSubCategory] = useState([])
    const [mainCategory, setMainCategory] = useState([])
    const [filtersSubCategory, setFiltersSubCategory] = useState([])
    useEffect(() => {
        fetch(`${authContext.baseUrl}/v1/category`)
            .then(res => res.json()).then(category => {
                setCategory(category.data.categories);
                // console.log(category.data.categories);
            })

    }, [])
    useEffect(() => {

        if (categoryId) {
            setMainCategory(category.filter(category => category._id == categoryId))

            category.forEach(category => {
                let filterArrySub = category.subCategories.filter((sub) => sub._id == categoryId)

                if (filterArrySub.length != 0 && subCategory != filterArrySub) {
                    setSubCategory(filterArrySub)
                }


            })
        }

    }, [categoryId])

    // useEffect(() => {
    // console.log(filtersSubCategory);

    // }, [filtersSubCategory])



    const changeInputHandler = () => {
        navigetor('/main/urgent=true')
    }

    const backToAllCategories = () => {
        navigetor('/main')
    }


    return (
        <div className="sidebar">
            <div className="sidebar__category">
                <span className="sidebar__category-title">دسته ها</span>
                <ul className="sidebar__category-list">

                    {
                        categoryId ?
                            (mainCategory.length != 0 ? (mainCategory.map((category) => (

                                <BodyCategoryItem {...category} key={category._id} backToAllCategories={backToAllCategories} />

                            ))) : (subCategory.length != 0 && (
                                subCategory.map((category) => (


                                    <>
                                        <BodyCategoryItem {...category} key={category._id} backToAllCategories={backToAllCategories} catID={categoryId} />
                                        {/* {category.filters.length != 0 && filtersSubCategory.length == 0 && setFiltersSubCategory(category.filters)} */}
                                        {/* {filterArry.push(subCategory.filters)} */}
                                        {/* {console.log(category)} */}

                                    </>


                                ))
                            )


                            )
                            ) : (
                                category.map((category) => (
                                    <li className="sidebar__category-item">
                                        <Link key={category._id} className="sidebar__category-link" to={'/main/' + category._id}>
                                            <i className="sidebar__category-icon bi bi-house"></i>
                                            {category.title}
                                        </Link>
                                    </li>
                                ))
                            )

                    }


                </ul>
            </div>
            <div className="sidebar__filters">


                {

                    useEffect(() => {
                        filtersSubCategory.length != 0 && filtersSubCategory.map(filter => (

                            filter.type == 'selectbox' ? (
                                <div class="sidebar__filter" key={filter._id}>
                                    <div className="accordion accordion-flush" id="accordionFlushExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button
                                                    className="accordion-button collapsed"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={'#accordion-' + filter.slug}
                                                    aria-expanded="false"
                                                    aria-controls={'accordion-' + filter.name}
                                                >
                                                    <span className="sidebar__filter-title">{
                                                        filter.name
                                                    }</span>
                                                </button>
                                            </h2>
                                            <div
                                                id={'#accordion-' + filter.slug}
                                                className="accordion-collapse collapse"
                                                aria-labelledby={'accordion-' + filter.name}
                                                data-bs-parent="#accordionFlushExample"
                                            >
                                                <div className="accordion-body">
                                                    <select className="selectbox">
                                                        {filter.options
                                                            .sort((a, b) => b - a)
                                                            .map(
                                                                (option) =>
                                                                    <option value={option}>{option}</option>
                                                            )}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div class="sidebar__filter" key={filter._id}>
                                    <label class="switch">
                                        <input id="exchange_controll" class="icon-controll" type="checkbox" />
                                        <span class="slider round"></span>
                                    </label>
                                    <p>{filter.name}</p>
                                </div>
                            )


                        ))
                    }, [filtersSubCategory])


                }

                {/* <div className="sidebar__filter">

                    <div className="sidebar__filter-title-wrapper">
                        <i className="sidebar__filter-icon bi bi-chevron-down"></i>
                        <span className="sidebar__filter-title">قیمت</span>
                    </div>
                    <div className="sidebar__filter-price sidebar__filter-item">
                        <div className="sidebar__filter-price-wrapper">
                            <label className="sidebar__filter-price-label">حداقل</label>
                            <div className="sidebar__filter-price-input">
                                <div className="sidebar__filter-price-right">
                                    <span className="sidebar__filter-price-example">مثلا 70,000,000</span>
                                </div>
                                <div className="sidebar__filter-price-left">
                                    <span className="sidebar__filter-price-text">تومان</span>
                                    <i className="sidebar__filter-price-icon bi bi-chevron-down"></i>
                                </div>
                            </div>
                        </div>
                        <div className="sidebar__filter-price-wrapper">
                            <label className="sidebar__filter-price-label">حداقل</label>
                            <div className="sidebar__filter-price-input">
                                <div className="sidebar__filter-price-right">
                                    <span className="sidebar__filter-price-example">مثلا 70,000,000</span>
                                </div>
                                <div className="sidebar__filter-price-left">
                                    <span className="sidebar__filter-price-text">تومان</span>
                                    <i className="sidebar__filter-price-icon bi bi-chevron-down"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                </div> */}

                <div className="sidebar__filter">
                    <div className="sidebar__filter-title-wrapper">
                        <i className="sidebar__filter-icon bi bi-chevron-down"></i>
                        <span className="sidebar__filter-title">قیمت</span>
                    </div>
                    <div className="sidebar__filter-price sidebar__filter-item">
                        <div className="sidebar__filter-price-wrapper">
                            <label className="sidebar__filter-price-label">حداقل</label>
                            <div className="sidebar__filter-price-input">
                                <div className="sidebar__filter-price-right">
                                    <span className="sidebar__filter-price-example">مثلا 70,000,000</span>
                                </div>
                                <div className="sidebar__filter-price-left">
                                    <span className="sidebar__filter-price-text">تومان</span>
                                    <i className="sidebar__filter-price-icon bi bi-chevron-down"></i>
                                </div>
                            </div>
                        </div>
                        <div className="sidebar__filter-price-wrapper">
                            <label className="sidebar__filter-price-label">حداقل</label>
                            <div className="sidebar__filter-price-input">
                                <div className="sidebar__filter-price-right">
                                    <span className="sidebar__filter-price-example">مثلا 70,000,000</span>
                                </div>
                                <div className="sidebar__filter-price-left">
                                    <span className="sidebar__filter-price-text">تومان</span>
                                    <i className="sidebar__filter-price-icon bi bi-chevron-down"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sidebar__filter">
                    <div className="sidebar__filter-title-wrapper">
                        <i className="sidebar__filter-icon bi bi-chevron-down"></i>
                        <span className="sidebar__filter-title">وضعیت آگهی</span>
                    </div>
                    <div className="sidebar__filter-condition sidebar__filter-item">
                        <div className="sidebar__filter-condition-wrapper">
                            <div className="sidebar__filter-condition-right">
                                <label className="sidebar__filter-condition-label">فقط عکس دار</label>
                            </div>
                            <div className="sidebar__filter-condition-left">
                                <label className="sidebar__filter-condition-switch">
                                    <input className="sidebar__filter-condition-input" type="checkbox" checked={false} onChange={changeInputHandler} />
                                    <span className="sidebar__filter-condition-slider"></span>
                                </label>
                            </div>
                        </div>
                        <div className="sidebar__filter-condition-wrapper">
                            <div className="sidebar__filter-condition-right">
                                <label className="sidebar__filter-condition-label">فقط فوری ها</label>
                            </div>
                            <div className="sidebar__filter-condition-left">
                                <label className="sidebar__filter-condition-switch">
                                    <input className="sidebar__filter-condition-input" type="checkbox" checked={true} onChange={changeInputHandler} />
                                    <span className="sidebar__filter-condition-slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sidebar__links">
                <a className="sidebar__link" href="#">درباره دیوار</a>
                <a className="sidebar__link" href="#">دریافت برنامه</a>
                <a className="sidebar__link" href="#">بلاگ دیوار</a>
                <a className="sidebar__link" href="#">کسب و کارها</a>
                <a className="sidebar__link" href="#">پشتیبانی و قوانین</a>
            </div>
            {/* <div className="sidebar__icons">
                <a className="sidebar__icon-link" href="#">
                    <i className="sidebar__icon bi bi-twitter"></i>
                </a>
                <a className="sidebar__icon-link" href="#">
                    <i className="sidebar__icon bi bi-instagram"></i>
                </a>
                <a className="sidebar__icon-link" href="#">
                    <i className="sidebar__icon bi bi-linkedin"></i>
                </a>
            </div> */}
            <div id='footer__social-media'>
                <Social />
            </div>
            <div className="sidebar__images">
                <div className="row">
                    <div className="col-4">
                        <a className="sidebar__image-link" href="#">
                            <img className="sidebar__image img-fluid" src="../images/main/enamad.png" />
                        </a>
                    </div>
                    <div className="col-4">
                        <a className="sidebar__image-link" href="#">
                            <img className="sidebar__image img-fluid" src="../images/main/etehadie.png" />
                        </a>
                    </div>
                    <div className="col-4">
                        <a className="sidebar__image-link" href="#">
                            <img className="sidebar__image img-fluid" src="../images/main/neshan.png" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;