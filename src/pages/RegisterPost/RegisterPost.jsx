import React, { useContext, useEffect, useState } from 'react';
import HeaderDefault from '../../Components/HeaderDefault/HeaderDefault';
import FooterPost from '../../Components/FooterPost/FooterPost';
import AuthContext from '../../context/authContext';
import { Link, useParams , useNavigate } from 'react-router-dom';
import swal from "sweetalert";

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'


import './RegisterPost.css';

const RegisterPost = () => {
    const authContext = useContext(AuthContext)
    const navigator = useNavigate()
    const { categoryId } = useParams()
    const [subCategory, setSubCategory] = useState([])
    const [itemCitySelectBox, setItemCitySelectBox] = useState('301')
    const [neighborhoodSelectBox, setNeighborhoodSelectBox] = useState('')

    const [lenCategoryFields, setLenCategoryFields] = useState(0)
    let categoryFields = {};

    const [pics, setPics] = useState([])
    const [picsSrc, setPicsSrc] = useState([])

    let mapView = { x: 35.715298, y: 51.404343 };

    const [cities, setCities] = useState([])
    const [neighborhoods, setNeighborhoods] = useState([])
    const [showNeighborhoods, setShowNeighborhoods] = useState([])


    // Value Static
    const [postTitleInput, setPostTitleInput] = useState('')
    const [postDescriptionTextarea, setPostDescriptionTextarea] = useState('')
    const [postPriceInput, setPostPriceInput] = useState('')
    const [exchangeCheckbox, setExchangeCheckbox] = useState(false)
    useEffect(() => {


        fetch(`${authContext.baseUrl}/v1/category/sub`)
            .then(res => res.json()).then(res => {

                const FindCategoryArry = res.data.categories.find(
                    (category) => category._id == categoryId
                )

                setSubCategory(FindCategoryArry)
                setLenCategoryFields(FindCategoryArry.productFields.length)

            })


        fetch(`${authContext.baseUrl}/v1/location`)
            .then(res => res.json()).then(res => {
                // console.log(res.data);

                // City
                setCities(res.data.cities)

                // neighborhoods
                setNeighborhoods(res.data.neighborhoods)

                const tehranNeighborhood = res.data.neighborhoods.filter(
                    (neighborhood) => neighborhood.city_id === 301 // 301 is tehran code
                );
                setShowNeighborhoods(tehranNeighborhood)
            })




    }, [])

    const fieldChangeHandler = (slug, data) => {

        categoryFields[slug] = data;
        console.log(categoryFields);

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
        // Static Fields Validation
        if (
            // !categoryFields.length ||
            Object.keys(categoryFields).length == lenCategoryFields ||
            itemCitySelectBox == "default" ||
            !postTitleInput.trim().length ||
            !postDescriptionTextarea.trim().length ||
            !postPriceInput.trim().length
        ) {
            swal({
                title: "لطفا همه مشخصات رو مشخص کنید",
                icon: "error",
                buttons: "تلاش مجدد"
            })
        } else {
            console.log(categoryFields , Object.keys(categoryFields).length);
            
            const formData = new FormData();
            formData.append("city", itemCitySelectBox);
            formData.append("neighborhood", neighborhoodSelectBox);
            formData.append("title", postTitleInput);
            formData.append("description", postDescriptionTextarea);
            formData.append("price", postPriceInput);
            formData.append("exchange", exchangeCheckbox);
            formData.append("map", JSON.stringify(mapView));
            formData.append("categoryFields", JSON.stringify(categoryFields));
            
            

            pics.map((pic) => {
                formData.append("pics", pic);
            });            

            const res = await fetch(`${authContext.baseUrl}/v1/post/${categoryId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authContext.getLocalStorage('token')}`,
                },
                body: formData,
            });

            const data = await res.json();
            console.log("Response Data ->", data);

            if (res.status === 201) {
                swal({
                    title: "آگهی مورد نظر با موفقیت در صف انتشار قرار گرفت",
                    icon: "success",
                    buttons: "اوکی"
                }).then(()=>navigator('/'))
                // location.href = `/pages/userPanel/posts/preview.html`;
            }
        }
    }

    const deleteImage = (picName) => {
        setPics(pics.filter((pic) => pic.name !== picName))
        setPicsSrc(picsSrc.filter((pic) => pic.name !== picName))
    };


    useEffect(() => {
        setShowNeighborhoods(neighborhoods.filter(
            (neighborhood) => neighborhood.city_id === Number(itemCitySelectBox)
        ))
    }, [itemCitySelectBox])

    const MoveMapHandler = (e) => {
        console.log(e);

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
                        <select id="city-select" required="required" name="city-select" onChange={(event) => setItemCitySelectBox(event.target.value)}>
                            {
                                cities.length && (
                                    cities.map((city) => (
                                        <option value={city.id} selected={city.name == 'تهران' ? true : false }>{city.name}</option>
                                    ))
                                )
                            }
                        </select>
                    </div>
                    <div className="group">
                        <p className="field-title">محله</p>
                        <select id="neighborhood-select" required="required" name='neighborhood-select' onChange={(event)=>setNeighborhoodSelectBox(event.target.value)}>
                            {
                                showNeighborhoods.length ? (
                                    showNeighborhoods.map((neighborhood) => (
                                        <option value={neighborhood.id}>{neighborhood.name}</option>
                                    ))
                                ) : (
                                    <option>محله ای برای این شهر وجود ندارد.</option>
                                )
                            }
                        </select>
                    </div>
                </div>
                <div>
                    <p className="field-title">موقعیت مکانی آگهی</p>
                    <div id="map" onMouseMove={(e) => MoveMapHandler(e)}>
                        <MapContainer center={[35.715298, 51.404343]} zoom={13} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[35.715298, 51.404343]}></Marker>
                        </MapContainer>
                    </div>
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
                        <input id="post-price-input" type="number" onChange={(e)=>setPostPriceInput(e.target.value)} value={postPriceInput}/>
                    </div>
                    <div className="group checkbox-group">
                        <input className="checkbox" id="exchange-checkbox" type="checkbox" onChange={(e)=>setExchangeCheckbox(e.target.value)} value={exchangeCheckbox}/>
                        <p>مایلم معاوضه کنم</p>
                    </div>
                    <div className="group">
                        <p className="field-title">عنوان آگهی</p>
                        <span
                        >در عنوان آگهی به موارد مهمی مانند نوع ملک و متراژ اشاره کنید.
                        </span>
                        <input id="post-title-input" type="text" onChange={(e)=>setPostTitleInput(e.target.value)} value={postTitleInput}/>
                    </div>

                    <div className="group">
                        <p className="field-title">توضیحات آگهی</p>
                        <span>در توضیحات آگهی به مواردی مانند شرایط فروش، جزئیات و ویژگی‌های قابل
                            توجه، دسترسی‌های محلی و موقعیت قرارگیری ملک اشاره کنید.</span>
                        <textarea
                            id="post-description-textarea"
                            cols="30"
                            rows="8"
                            onChange={(e)=>setPostDescriptionTextarea(e.target.value)}
                            >{postDescriptionTextarea}</textarea>
                    </div>
                </div>
                <div className="post_controll">
                    <Link to="/main">انصراف</Link>
                    <button id="register-btn" onClick={RegisterBtn}>ارسال آگهی</button>
                </div>
            </main>
            <FooterPost />
        </>
    );
}


export default RegisterPost;