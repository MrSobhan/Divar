import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/authContext'
import { useNavigate, Link, useParams } from 'react-router-dom';
import Social from '../Social/Social';
import BodyCategoryItem from '../bodyCategoryItem/bodyCategoryItem';
import Accordion from 'react-bootstrap/Accordion';
import './Sidebar.css'

const Sidebar = ({ setArryFilter, setMinPrice, setMaxPrice }) => {
    const authContext = useContext(AuthContext)
    const { categoryId } = useParams()
    const navigetor = useNavigate()


    const [category, setCategory] = useState([])
    const [subCategory, setSubCategory] = useState([])
    const [mainCategory, setMainCategory] = useState([])
    const [filtersSubCategory, setFiltersSubCategory] = useState([])
    const [justPhotoController, setJustPhotoController] = useState(false)
    const [exchangeController, setExchangeController] = useState(false)

    useEffect(() => {
        fetch(`${authContext.baseUrl}/v1/category`)
            .then(res => res.json()).then(category => {
                setCategory(category.data.categories);
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





    const changeInputHandler = () => {
        authContext.filtersPosts.filter = []

        if (justPhotoController) {
            authContext.filtersPosts.filter.push('justPhoto')
        }
        if (exchangeController) {
            authContext.filtersPosts.filter.push('exchange')
        }

        setArryFilter(authContext.filtersPosts.filter)


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
                                <div className="sidebar__filter" key={filter._id}>
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
                                <div className="sidebar__filter" key={filter._id}>
                                    <label className="switch">
                                        <input id="exchange_controll" className="icon-controll" type="checkbox" />
                                        <span className="slider round"></span>
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

                <Accordion defaultActiveKey="0" className='my-4'>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <span className="sidebar__filter-title">قیمت</span>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="sidebar__filter-price-wrapper my-2">
                                <label className="sidebar__filter-price-label">حداقل</label>
                                <select className='form-control mx-3 sidebar__formSelect' id="min-price-selectbox" onChange={(e)=> setMinPrice(e.target.value)}>
                                    <option value="0">مبلغ پیشفرض</option>
                                    <option value="10000">10 هزار</option>
                                    <option value="50000">50 هزار</option>
                                    <option value="200000">200 هزار</option>
                                    <option value="500000">500 هزار</option>
                                    <option value="1000000">1 میلیون</option>
                                    <option value="5000000">5 میلیون</option>
                                    <option value="10000000">10 میلیون</option>
                                    <option value="20000000">20 میلیون</option>
                                    <option value="50000000">50 میلیون</option>
                                    <option value="100000000">100 میلیون</option>
                                    <option value="150000000">150 میلیون</option>
                                    <option value="200000000">200 میلیون</option>
                                </select>
                                <p className='fs-6'>تومان</p>
                            </div>
                            <div className="sidebar__filter-price-wrapper mt-4">
                                <label className="sidebar__filter-price-label">حداکثر</label>
                                <select className='form-control mx-3 sidebar__formSelect' id="max-price-selectbox" onChange={(e)=> setMaxPrice(e.target.value)}>
                                    <option value="0">مبلغ پیشفرض</option>
                                    <option value="10000">10 هزار</option>
                                    <option value="50000">50 هزار</option>
                                    <option value="200000">200 هزار</option>
                                    <option value="500000">500 هزار</option>
                                    <option value="1000000">1 میلیون</option>
                                    <option value="5000000">5 میلیون</option>
                                    <option value="10000000">10 میلیون</option>
                                    <option value="20000000">20 میلیون</option>
                                    <option value="50000000">50 میلیون</option>
                                    <option value="100000000">100 میلیون</option>
                                    <option value="150000000">150 میلیون</option>
                                    <option value="200000000">200 میلیون</option>
                                </select>
                                <p className='fs-6'>تومان</p>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>

                </Accordion>

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
                                    <input className="sidebar__filter-condition-input" type="checkbox" checked={justPhotoController} onChange={changeInputHandler} />
                                    <span className="sidebar__filter-condition-slider" onClick={() => setJustPhotoController((prev) => !prev)}></span>
                                </label>
                            </div>
                        </div>
                        <div className="sidebar__filter-condition-wrapper">
                            <div className="sidebar__filter-condition-right">
                                <label className="sidebar__filter-condition-label">معاوضه</label>
                            </div>
                            <div className="sidebar__filter-condition-left">
                                <label className="sidebar__filter-condition-switch">
                                    <input className="sidebar__filter-condition-input" type="checkbox" checked={exchangeController} onChange={changeInputHandler} />
                                    <span className="sidebar__filter-condition-slider" onClick={() => setExchangeController((prev) => !prev)}></span>
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