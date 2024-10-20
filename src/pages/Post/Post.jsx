import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/authContext';
import { useParams, Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import HeaderMain from '../../Components/HeaderMain/HeaderMain';
import FooterPost from '../../Components/FooterPost/FooterPost';
import LoginModal from '../../Components/LoginModal/LoginModal';
import swal from "sweetalert";
import './Post.css'
import HeaderDefault from '../../Components/HeaderDefault/HeaderDefault';
const Post = () => {
    const authContext = useContext(AuthContext)
    const { postId } = useParams()
    const [isLoad, setIsLoad] = useState(true)
    const [postDetails, setPostDetails] = useState({})
    const [feedbackIcons, setFeedbackIcons] = useState(true)
    const [isShowLoginModal, setIsShowLoginModal] = useState(false)
    const [valueNoteTextarea, setValueNoteTextarea] = useState('')
    const [theme, setTheme] = useState(authContext.getLocalStorage('theme'))


    const date = authContext.calcuteRelativeTimeDifference(postDetails.createdAt)

    const [isBookMark, setIsBookMark] = useState(false)
    let userToken = authContext.getLocalStorage('token')
    const RecentSeenLocalID = authContext.getLocalStorage('recent-seen')

    useEffect(() => {
        authContext.isLogin().then(res => {
            let headers = res && userToken ? { Authorization: `Bearer ${userToken}` } : { "Content-Type": "application/json" }


            fetch(`${authContext.baseUrl}/v1/post/${postId}`, {
                headers,
            })
                .then(res => res.json()).then(resPost => {
                    setIsLoad(false)
                    setPostDetails(resPost.data.post)
                    setIsBookMark(resPost.data.post?.bookmarked)
                    setValueNoteTextarea(resPost.data.post?.note.content ? resPost.data.post?.note.content : '')
                    console.log(resPost.data.post);
                    if (RecentSeenLocalID) {
                        let checkSomeId = RecentSeenLocalID.some((id) => id == postId)
                        if(!checkSomeId){
                            authContext.setLocalStorage('recent-seen' , [...RecentSeenLocalID , postId] )
                        }
                    }else{
                        authContext.setLocalStorage('recent-seen' , [postId] )
                    }
                })
        })
    }, [])

    //* DarkMode Theme :)

    useEffect(() => {
        if (theme == 'light') {
            document.documentElement.style.setProperty('--white-color', '#f4f4f4');
            document.documentElement.style.setProperty('--text-color', 'rgba(0, 0, 0, 0.56)');
            document.documentElement.style.setProperty('--black-color', '#242424');
            document.documentElement.style.setProperty('--border', '1px solid rgba(0, 0, 0, 0.2)');
        } else {
            document.documentElement.style.setProperty('--white-color', '#242424');
            document.documentElement.style.setProperty('--text-color', 'rgba(255, 255, 255, 0.56)');
            document.documentElement.style.setProperty('--black-color', '#fff');
            document.documentElement.style.setProperty('--border', '1px solid rgba(255, 255, 255, 0.2)');
        }
    }, [theme])

    //* Post Func :)

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
    const SaveBookmark = async () => {
        if (postDetails.bookmarked != undefined) {

            if (isBookMark) {
                console.log('DELETE');

                // const res = await fetch(`${authContext.baseUrl}/v1/bookmark/${postDetails._id}`, {
                //   method: "DELETE",
                //   headers: {
                //     Authorization: `Bearer ${userToken}`,
                //   },
                // });

                // if (res.status === 200) {
                //   setIsBookMark(false)
                // }
            } else {
                const res = await fetch(`${authContext.baseUrl}/v1/bookmark/${postDetails._id}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });

                if (res.status === 201) {
                    setIsBookMark(true)
                }
            }

        }
    }
    const SaveNotes = async () => {
        if (postDetails.note != undefined) {

            if (postDetails.note._id) {
                await fetch(`${authContext.baseUrl}/v1/note/${postDetails.note._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userToken}`,
                    },
                    body: JSON.stringify({
                        content: valueNoteTextarea,
                    }),
                });
            } else if (valueNoteTextarea.trim()) {
                await fetch(`${authContext.baseUrl}/v1/note`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userToken}`,
                    },
                    body: JSON.stringify({
                        postId: postDetails._id,
                        content: valueNoteTextarea,
                    }),
                });
            }

        }
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
                        <HeaderDefault />
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
                                                        onClick={SaveBookmark}
                                                    >
                                                        <i className={`post__btn-icon bi bi-bookmark ${isBookMark ? 'text-danger' : ''} `}></i>
                                                    </button>
                                                    <button className="post__btn-share post__btn" id="share-icon" onClick={() => Navigator.share(location.href)}>
                                                        <i className="post__btn-icon bi bi-share"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="post__infos">
                                                <ul className="post__info-list" id="post-infoes-list">
                                                    <li className="post__info-item">
                                                        <span className="post__info-key">قیمت</span>
                                                        <span className="post__info-value">{postDetails.price.toLocaleString()} تومان</span>
                                                    </li>

                                                    {
                                                        postDetails.dynamicFields.map((filed) => (
                                                            <li className="post__info-item" key={filed._id}>
                                                                <span className="post__info-key">{filed.name}</span>
                                                                <span className="post__info-value">{filed.data}</span>
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

                                            {
                                                postDetails.pics.length != 0 && (
                                                    <Carousel>
                                                        {
                                                            postDetails.pics.map((pic) => (
                                                                <Carousel.Item key={pic._id}>
                                                                    <img
                                                                        className="d-block w-100 picSlider"
                                                                        src={authContext.baseUrl + '/' + pic.path}
                                                                        alt="First slide"
                                                                    />
                                                                </Carousel.Item>
                                                            ))
                                                        }
                                                    </Carousel>
                                                )
                                            }
                                        </div>
                                        <div className="note">
                                            <textarea
                                                id="note-textarea"
                                                className="post-preview__input"
                                                placeholder="یادداشت شما..."
                                                onClick={ShowLoginModalHandler}
                                                value={valueNoteTextarea}
                                                onChange={(e) => setValueNoteTextarea(e.target.value)}
                                                onBlur={SaveNotes}
                                            ></textarea>
                                            <i id="note-trash-icon" className="bi bi-trash3-fill" style={{ display: `${valueNoteTextarea.length ? 'block' : 'none'}` }} onClick={() => setValueNoteTextarea('')}></i>
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
                        <LoginModal isShow={isShowLoginModal} setIsShow={(e) => setIsShowLoginModal(e)} />
                    </>
                )


            }
        </>
    );
}

export default Post;