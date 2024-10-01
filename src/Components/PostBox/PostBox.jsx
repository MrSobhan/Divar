import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext';

import './PostBox.css'

const PostBox = ({ _id, title,
    dynamicFields,
    price,
    pics, createdAt }) => {
    const authContext = useContext(AuthContext)


    const Time = authContext.calcuteRelativeTimeDifference(createdAt)
    

    return (
        <div className="col-4">
            <Link to={'/post/' + _id} className="product-card">
                <div className="product-card__right">
                    <div className="product-card__right-top">
                        <p className="product-card__link">{title}</p>
                    </div>
                    <div className="product-card__right-bottom">
                        <span className="product-card__condition">{
                            dynamicFields[0].data
                        }</span>
                        <span className="product-card__price">
                            {
                                price === 0
                                    ? "توافقی"
                                    : price.toLocaleString() + " تومان"
                            }
                        </span>
                        <span className="product-card__time">{Time}</span>
                    </div>
                </div>
                <div className="product-card__left">
                    {
                        pics.length
                            ?
                            <img
                                className="product-card__img img-fluid"
                                src={authContext.baseUrl + '/' + pics[0].path}
                            />
                            :
                            <img
                                className="product-card__img img-fluid"
                                src="../../public/images/main/noPicture.png"
                            />
                    }

                </div>
            </Link>
        </div>
    );
}


export default PostBox;