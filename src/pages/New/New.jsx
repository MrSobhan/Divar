import React, { useContext, useEffect, useState } from 'react';
import HeaderDefault from '../../Components/HeaderDefault/HeaderDefault';
import AuthContext from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import './New.css';
const New = () => {
    const navigator = useNavigate()
    const authContext = useContext(AuthContext)
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [repositoryCategory, setRepositoryCategory] = useState([])
    const [isShowCategoryContainer, setIsShowCategoryContainer] = useState(false)
    const [titleSection, setTitleSection] = useState('')
    const [idSection, setIdSection] = useState('')
    const [valueSearch, setValueSearch] = useState('')
    const [descriptionCheckbox, setDescriptionCheckbox] = useState(false)
    const [filteredCategories, setFilteredCategories] = useState([])

    useEffect(() => {
        fetch(`${authContext.baseUrl}/v1/category`)
            .then(res => res.json()).then(res => {
                setCategories(res.data.categories)
                setRepositoryCategory(res.data.categories)
            })
        fetch(`${authContext.baseUrl}/v1/category/sub`)
            .then(res => res.json()).then(res => {
                setSubCategories(res.data.categories)
            })
    }, [])


    const categoryClickHandler = (categoryID) => {

        const category = categories.find((category) => category._id === categoryID);

        if (category) {
            setRepositoryCategory(category.subCategories)
            setTitleSection("همه دسته‌ها")
            setIdSection('')
        } else {
            const allSubCategories = categories.flatMap(
                (category) => category.subCategories
            );

            const subCategory = allSubCategories.find(
                (subCategory) => subCategory._id === categoryID
            );

            if (subCategory) {
                const subCategoryParent = categories.find(
                    (category) => category._id === subCategory.parent
                );

                setRepositoryCategory(subCategory.subCategories)
                setTitleSection(subCategoryParent.title)
                setIdSection(subCategoryParent._id)

            } else {
                navigator(`/registerPost/${categoryID}`)
            }
        }
    }


    const backToAllCategories = () => {
        setRepositoryCategory(categories)
        setTitleSection('')
        setIdSection('')
    }


    useEffect(() => {
        console.log(subCategories);

        if (valueSearch.trim()) {
            setFilteredCategories(subCategories.filter((subCategory) =>
                subCategory.title.includes(valueSearch.trim())
            ))

        }
    }, [valueSearch])

    return (
        <>
            <HeaderDefault />
            <main className="main">
                <div className="container">
                    <p className="new_title">چه چیزی آگهی می‌کنید؟</p>
                    <p className="select_category_title">
                        با جستجو در کادر زیر، دستهٔ آگهی را انتخاب کنید.
                    </p>
                    <div className="search_box">
                        <i className="bi bi-search"></i>
                        <input type="text" id="search-input" placeholder="جستجو در دسته‌ها" value={valueSearch} onChange={(e) => setValueSearch(e.target.value)} />
                        <i id="remove-icon" className={`bi bi-x remove-icon ${valueSearch.trim() ? 'active' : ''}`} onClick={() => setValueSearch('')}></i>
                        <div className={`result ${valueSearch.trim() ? 'active' : ''}`} id="result-container">
                            {
                                filteredCategories.length ? (
                                    filteredCategories.map((category) => (
                                        <Link to={`/registerPost/${category._id}`} className="search-result">
                                            <p>{category.title}</p>
                                            <i className="bi bi-chevron-left"></i>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="empty">
                                        <img src="https://support-faq.divarcdn.com/web/2024/03/static/media/magnifier.7f88b2e3f8ae30f4333986d0b0fbcf1d.svg" />
                                        <p>نتیجه‌ای برای جستجوی شما یافت نشد</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div id="show-categoies" className={`box show-categoies ${isShowCategoryContainer ? '' : 'active'}`} onClick={() => setIsShowCategoryContainer(true)}>
                        <div>
                            <p>دیدن تمام دسته‌های دیوار</p>
                        </div>
                        <i className="bi bi-chevron-left"></i>
                    </div>

                    <div id="categories-container" className={`${isShowCategoryContainer ? 'active' : ''}`}>
                        <div className="guide" id="guide-container">
                            <p>نمایش راهنمای دسته‌بندی</p>
                            <label className="switch">
                                <input
                                    id="description-checkbox"
                                    className="icon-controll"
                                    type="checkbox"
                                    checked={descriptionCheckbox}
                                    onClick={() => setDescriptionCheckbox(prev => !prev)}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>

                        <section id="categories">
                            {
                                titleSection && (
                                    <div className="back" onClick={idSection ? () => categoryClickHandler(idSection) : backToAllCategories}>
                                        <i className="bi bi-arrow-right"></i>
                                        <p>بازگشت به {titleSection}</p>
                                    </div>
                                )

                            }
                            {

                                repositoryCategory.map((category) =>
                                (
                                    <div className="box" onClick={() => categoryClickHandler(category._id)}>
                                        <div className="details">
                                            <div>
                                                <i className="bi bi-house-door"></i>
                                                <p>{category.title}</p>
                                            </div>

                                            {
                                                descriptionCheckbox
                                                    ? <span>{category.description}</span>
                                                    : ""
                                            }

                                        </div>
                                        <i className="bi bi-chevron-left"></i>
                                    </div>
                                ))
                            }
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}


export default New;