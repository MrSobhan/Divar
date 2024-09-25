import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const BodyCategoryItem = ({ backToAllCategories, title, subCategories }) => {
    return (
        <li className="sidebar__category-item">
            <div className="all-categories" onClick={backToAllCategories}>
                <p>همه اگهی ها</p>
                <i className="bi bi-arrow-right"></i>
            </div>

            <div className="sidebar__category-link active-category" href="#">
                <div className="sidebar__category-link_details">
                    <i className="sidebar__category-icon bi bi-house"></i>
                    <p>{title}</p>
                </div>
                <ul className="subCategory-list">
                    {subCategories?.map(subCategory => (

                        <li key={subCategory._id} >
                            <Link to={'/main/' + subCategory._id}>{subCategory.title}</Link>
                            {/* {subCategory.title} */}
                        </li>

                    ))}
                </ul>
            </div>
        </li>
    );
}


export default BodyCategoryItem;