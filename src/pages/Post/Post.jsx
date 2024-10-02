import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/authContext';
import { useParams, Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import HeaderMain from '../../Components/HeaderMain/HeaderMain';
import FooterPost from '../../Components/FooterPost/FooterPost';
import LoginModal from '../../Components/LoginModal/LoginModal';
import swal from "sweetalert";
import './Post.css'
const Post = () => {
    const authContext = useContext(AuthContext)
    const { postId } = useParams()
    const [isLoad, setIsLoad] = useState(true)
    const [postDetails, setPostDetails] = useState({})
    const [feedbackIcons, setFeedbackIcons] = useState(true)
    const [isShowLoginModal, setIsShowLoginModal] = useState(false)
    const [valueNoteTextarea, setValueNoteTextarea] = useState('')


    const date = authContext.calcuteRelativeTimeDifference(postDetails.createdAt)

    useEffect(() => {
        fetch(`${authContext.baseUrl}/v1/post/${postId}`)
            .then(res => res.json()).then(resPost => {
                setIsLoad(false)
                setPostDetails(resPost.data.post)
            })
    }, [])

    const ShowModalInfoCall = (PhoneNumber) => {
        swal({
            title: "شماره تماس : " + PhoneNumber,
            icon: "info",
            buttons: "تماس گرفتن",
        })
    }

    const ShowLoginModalHandler = () => {
        authContext.isLogin().then(res => !res && setIsShowLoginModal(true))
    }
    
    return (


        <>

            {
                isLoad ? (
                    <div id="loading-container">
                        <div id="loading"></div>
                    </div>
                ) : (
                    <>
                        {/* <HeaderMain /> */}
                        
                        <main className="main">
                            <div className="container">
                                <ul className="main__breadcrumb" id="breadcrumb">

                                    <li className="main__breadcrumb-item">
                                        <Link to={'/main/' + postDetails.breadcrumbs?.category._id} id="category-breadcrumb">{postDetails.breadcrumbs.category.title}</Link>
                                        <i className="main__breadcrumb-icon bi bi-chevron-left"></i>
                                    </li>
                                    <li className="main__breadcrumb-item">
                                        <Link to={`/main/${postDetails.breadcrumbs.subCategory._id}`} id="category-breadcrumb">{postDetails.breadcrumbs.subCategory.title}</Link>
                                        <i className="main__breadcrumb-icon bi bi-chevron-left"></i>
                                    </li>
                                    <li className="main__breadcrumb-item">
                                        <Link to={`/main/${postDetails.breadcrumbs.subSubCategory._id}`} id="category-breadcrumb">{postDetails.breadcrumbs.subSubCategory.title}</Link>
                                        <i className="main__breadcrumb-icon bi bi-chevron-left"></i>
                                    </li>
                                    <li className="main__breadcrumb-item">{postDetails.title}</li>

                                </ul>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="post">
                                            <h1 id="post-title" className="title">{postDetails.title}</h1>
                                            <span id="post-location" className="location">

                                                {
                                                    `${date} در ${postDetails.city.name}
                                                        ${postDetails.neighborhood ? postDetails?.neighborhood?.name : ""}
                                                    `
                                                }
                                            </span>
                                            <div className="post__verify">
                                                <img
                                                    className="post__verify-img"
                                                    src="/public/images/main/verify.png"
                                                />
                                                <span className="post__verify-text">عضو دیوار فروشگاه ها</span>
                                            </div>
                                            <div className="post__btns">
                                                <div className="post__btns-right">
                                                    <button className="post__btn-tel" id="phone-info-btn" onClick={() => ShowModalInfoCall(postDetails.creator.phone)}>
                                                        اطلاعات تماس
                                                    </button>
                                                </div>
                                                <div className="post__btns-left">
                                                    <button
                                                        className="post__btn-save post__btn"
                                                        id="bookmark-icon-btn"
                                                    >
                                                        <i className="post__btn-icon bi bi-bookmark"></i>
                                                    </button>
                                                    <button className="post__btn-share post__btn" id="share-icon" onClick={() => Navigator.share(location.href)}>
                                                        <i className="post__btn-icon bi bi-share"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="post__infos">
                                                <ul className="post__info-list" id="post-infoes-list">
                                                    <li class="post__info-item">
                                                        <span class="post__info-key">قیمت</span>
                                                        <span class="post__info-value">{postDetails.price.toLocaleString()} تومان</span>
                                                    </li>

                                                    {
                                                        postDetails.dynamicFields.map((filed) => (
                                                            <li class="post__info-item">
                                                                <span class="post__info-key">{filed.name}</span>
                                                                <span class="post__info-value">{filed.data}</span>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                            <div className="post__intro">
                                                <h2>توضیحات</h2>
                                                <p className="description" id="post-description">{postDetails.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="post-preview" id="post-preview">
                                            {/* <div className="swiper mySwiper2">
                                                <div className="swiper-wrapper" id="main-slider-wrapper"></div>
                                                <div className="swiper-button-next"></div>
                                                <div className="swiper-button-prev"></div>
                                            </div>

                                            <div className="swiper mySwiper">
                                                <div className="swiper-wrapper" id="secend-slider-wrapper"></div>
                                            </div> */}
                                            <Carousel>

                                                {
                                                    postDetails.pics.map((pic) => (
                                                        <Carousel.Item>
                                                            <img
                                                                className="d-block w-100 picSlider"
                                                                src={authContext.baseUrl + '/' + pic.path}
                                                                alt="First slide"
                                                            />
                                                        </Carousel.Item>
                                                    ))
                                                }
                                            </Carousel>
                                        </div>
                                        <div className="note">
                                            <textarea
                                                id="note-textarea"
                                                className="post-preview__input"
                                                placeholder="یادداشت شما..."
                                                onClick={ShowLoginModalHandler}
                                                value={valueNoteTextarea}
                                                onChange={(e)=>setValueNoteTextarea(e.target.value)}
                                            ></textarea>
                                            <i id="note-trash-icon" className="bi bi-trash3-fill" style={{display:`${valueNoteTextarea.length ? 'block' : 'none'}`}} onClick={()=>setValueNoteTextarea('')}></i>
                                            <span className="post-preview__input-notics">یادداشت تنها برای شما قابل دیدن است و پس از حذف آگهی، پاک خواهد شد.</span>
                                        </div>

                                        <div id="map"></div>

                                        <div className="post__feedback">
                                            <p>بازخورد شما دربارهٔ این آگهی چیست؟</p>
                                            <div>
                                                <i className={`bi post_feedback_icon bi-hand-thumbs-up  ${feedbackIcons ? 'active' : ''}`} onClick={() => setFeedbackIcons(true)}></i>
                                                <i className={`bi post_feedback_icon bi-hand-thumbs-down ${!feedbackIcons ? 'active' : ''} `} onClick={() => setFeedbackIcons(false)}></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>

                        <FooterPost />

                        {/* Show Login Modal */}
                        <LoginModal isShow={isShowLoginModal} setIsShow={(e) => setIsShowLoginModal(e)}/>
                    </>
                )

                
            }
        </>
    );
}

export default Post;