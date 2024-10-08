import React, { useContext, useEffect, useState } from 'react';
import HeaderDefault from '../../Components/HeaderDefault/HeaderDefault';
import FooterPost from '../../Components/FooterPost/FooterPost';
import AuthContext from '../../context/authContext';
import { Link, useParams } from 'react-router-dom';
import swal from "sweetalert";
import Choices from "choices.js";
import './RegisterPost.css';

const RegisterPost = () => {
    const authContext = useContext(AuthContext)
    const { categoryId } = useParams()
    const [subCategory, setSubCategory] = useState([])
    const categoryFields = {};
    const [pics, setPics] = useState([])
    const [picsSrc, setPicsSrc] = useState([])




    useEffect(() => {
        fetch(`${authContext.baseUrl}/v1/category/sub`)
            .then(res => res.json()).then(res => {

                const FindCategoryArry = res.data.categories.find(
                    (category) => category._id == categoryId
                )

                setSubCategory(FindCategoryArry)
                FindCategoryArry.productFields.forEach((field) => {
                    if (field.type === "checkbox") {
                        categoryFields[field.slug] = false;
                    } else {
                        categoryFields[field.slug] = null;
                    }
                });
                // console.log(categoryFields);

            })


            const cityChoices = new Choices("#city-select", {
                searchEnabled: true
            });
            const neighborhoodChoices = new Choices("#neighborhood-select", {
                searchEnabled: true
            });
        

        fetch(`${authContext.baseUrl}/v1/location`)
            .then(res => res.json()).then(res => {

                // City

                cityChoices.setChoices(
                    res.data.cities.map((city) => {
                        return {
                            value: city.id,
                            label: city.name,
                            customProperties: { id: city.id },
                            selected: city.name === "تهران" ? true : false,
                        };
                    }),
                    "value",
                    "label",
                    false
                );

                // neighborhoods

                // console.log(res.data.neighborhoods);
                

                const tehranNeighborhood = res.data.neighborhoods.filter(
                    (neighborhood) => neighborhood.city_id === 301 // 301 is tehran code
                );


                const neighborhoodChoicesConfigs = [
                    {
                        value: "default",
                        label: "انتخاب محله",
                        disabled: true,
                        selected: true,
                    },
                    ...tehranNeighborhood.map((neighborhood) => ({
                        value: neighborhood.id,
                        label: neighborhood.name,
                    })),
                ];

                neighborhoodChoices.setChoices(
                    neighborhoodChoicesConfigs,
                    "value",
                    "label",
                    false
                );

            })



    }, [])

    const fieldChangeHandler = (slug, data) => {
        categoryFields[slug] = data;
        // console.log(categoryFields);

    };

    const UploaderFileHandler = (imgFile) => {

        if (imgFile.length) {
            let fileData = imgFile[0];
            // console.log(fileData);
            // Validation for type and size + pics.length (You)
            if (
                fileData.type === "image/jpeg" ||
                fileData.type === "image/png" ||
                fileData.type === "image/jpg"
            ) {


                if (pics.length != 0) {
                    setPics([...pics, fileData])
                } else {
                    setPics([fileData])
                }

                let reader = new FileReader();
                reader.readAsDataURL(fileData);
                reader.onloadend = () => {
                    let src = reader.result;
                    if (picsSrc.length != 0) {
                        setPicsSrc([...picsSrc, { name: fileData.name, src }])
                    } else {
                        setPicsSrc([{ name: fileData.name, src }])
                    }
                };


            } else {
                swal({
                    title: "فرمت فایل آپلودی مجاز نیست ",
                    icon: "error",
                    buttons: "تلاش مجدد"
                })
            }
        }
    }



    const RegisterBtn = async () => {
        // 2 Validation (Dynamic - Static)

        const formData = new FormData();
        // formData.append()
        // pics array

        const res = await fetch(`${baseUrl}/v1/post/${subCategoryID}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (res.status === 200) {
            // Codes
        }
    }

    const deleteImage = (picName) => {
        setPics(pics.filter((pic) => pic.name !== picName))
        setPicsSrc(picsSrc.filter((pic) => pic.name !== picName))
    };


    const AddItemCitySelectBox = ()=>{
        console.log("se");
        
        // neighborhoodChoices.clearStore();
        // const neighborhoods = data.neighborhoods.filter(
        //   (neighborhood) =>
        //     neighborhood.city_id === event.detail.customProperties.id
        // );
  
        // console.log(neighborhoods);
  
        // if (neighborhoods.length) {
        //   const neighborhoodChoicesConfigs = [
        //     {
        //       value: "default",
        //       label: "انتخاب محله",
        //       disabled: true,
        //       selected: true,
        //     },
        //     ...neighborhoods.map((neighborhood) => ({
        //       value: neighborhood.id,
        //       label: neighborhood.name,
        //     })),
        //   ];
  
        //   neighborhoodChoices.setChoices(
        //     neighborhoodChoicesConfigs,
        //     "value",
        //     "label",
        //     false
        //   );
        // } else {
        //   neighborhoodChoices.setChoices(
        //     [
        //       {
        //         value: 0,
        //         label: "محله‌ای یافت نشد",
        //         disabled: true,
        //         selected: true,
        //       },
        //     ],
        //     "value",
        //     "label",
        //     false
        //   );
        // }
    }
    return (
        <>
            <HeaderDefault />
            <main className="main">
                <p className="category-title">ثبت آگهی</p>
                <div className="category_details">
                    <p id="subCategory-title">{subCategory.title}</p>
                    <img
                        src="https://s100.divarcdn.com/statics/2024/02/entertainment.2ee67eb3.png"
                        alt="Image/Find"
                    />
                    <Link to="/new">تغییر دسته‌بندی</Link>
                </div>
                <div className="groups">
                    <div className="group">
                        <p className="field-title">شهر</p>
                        <select id="city-select" required="required" name="city-select"></select>
                    </div>
                    <div className="group">
                        <p className="field-title">محله</p>
                        <select id="neighborhood-select" required="required" name='neighborhood-select'></select>
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
                            <input id="uploader" type="file" onChange={(e) => UploaderFileHandler(e.target.files)} />
                        </div>
                        <div className="images" id="images-container">
                            {
                                picsSrc.length != 0 && (
                                    picsSrc.map((pic) => (
                                        <div className="image-box">
                                            <div onClick={() => deleteImage(pic.name)}>
                                                <i className="bi bi-trash"></i>
                                            </div>
                                            <img src={pic.src} alt="post-image" />
                                        </div>
                                    ))
                                )
                            }
                        </div>
                    </div>
                    <span>تعداد عکس‌های انتخاب شده نباید بیشتر از ۲۰ باشد.</span>
                </div>
                <div className="groups" id="dynamic-fields">

                    {
                        subCategory.length != 0 && (
                            subCategory.productFields.map((field) => (
                                field.type === "selectbox"
                                    ?
                                    <div className="group" key={field._id}>
                                        <p className="field-title">{field.name}</p>
                                        <div className="field-box">
                                            <select required="required" onChange={(e) => fieldChangeHandler(field.slug, e.target.value)}>
                                                <option value="default">انتخاب</option>
                                                {field.options.map(
                                                    (option) =>
                                                        <option value={`${option}`}>{option}</option>
                                                )}
                                            </select>
                                            <svg>
                                                <use xlinkHref="#select-arrow-down"></use>
                                            </svg>
                                        </div>
                                        <svg className="sprites">
                                            <symbol id="select-arrow-down" viewBox="0 0 10 6">
                                                <polyline points="1 1 5 5 9 1"></polyline>
                                            </symbol>
                                        </svg>
                                    </div>

                                    :
                                    <div className="group checkbox-group" key={field._id}>
                                        <input className="checkbox" type="checkbox" onChange={(e) => fieldChangeHandler(field.slug, e.target.checked)} />
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
                    <button id="register-btn" onClick={RegisterBtn}>ارسال آگهی</button>
                </div>
            </main>
            <FooterPost />
        </>
    );
}


export default RegisterPost;