import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/authContext';
import { Link } from 'react-router-dom';

const MainAdminPanel = () => {
    const authContext = useContext(AuthContext)
    const [userData, setUserData] = useState([])
    let token = authContext.getLocalStorage('token')

    useEffect(() => {
        fetch(`${authContext.baseUrl}/v1/dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(res => res.json()).then(response => {
            setUserData(response.data)
            console.log(response);

        });
    }, [])
    return (
        <div className="contents">
            <div className="logout">
                <i className="bi bi-box-arrow-left"></i>
                <p>خروج</p>
            </div>
            <div className="contents-title">
                <p>داشبورد</p>
            </div>
            <section className="boxes">
                <div className="box-panel">
                    <span id="articles-count">{userData.articlesCount}</span>
                    <div>
                        <p>مجموع مقالات</p>
                        <img
                            width="64"
                            height="64"
                            src="/public/images/main/articles.png"
                        />
                    </div>
                </div>
                <div className="box-panel">
                    <span id="posts-count">{userData.postsCount}</span>
                    <div>
                        <p>مجموع اگهی ها</p>
                        <img width="64" height="64" src="/public/images/main/posts.png" />
                    </div>
                </div>
                <div className="box-panel">
                    <span id="users-count">{userData.usersCount}</span>
                    <div>
                        <p>مجموع کاربران</p>
                        <img width="64" height="64" src="/public/images/main/users.png" />
                    </div>
                </div>
            </section>
            <div className="statistics">
                <div className="users">
                    <p className="title">آخرین کاربران</p>
                    <table className="table" id="users-table">
                        <tr>
                            <th>شماره</th>
                            <th>هویت</th>
                            <th>تعداد آگهی</th>
                        </tr>
                        {
                            userData.users.map((user) => (
                                <tr>
                                    <td>{user.phone}</td>
                                    <td>{user.verified ? "تایید شده" : "تایید نشده"}</td>
                                    <td>{user.postsCount}</td>
                                </tr>
                            ))
                        }
                    </table>
                </div>
                <div className="posts">
                    <p className="title">آخرین آگهی ها</p>
                    <table className="table" id="posts-table">
                        <tr>
                            <th>تیتر</th>
                            <th>کاربر</th>
                            <th>دسته بندی</th>
                        </tr>
                        {
                            userData.posts.map((post) => (
                                <tr>
                                    <td>{post.title}</td>
                                    <td>{post.creator.phone}</td>
                                    <td>{post.category.title}</td>
                                </tr>
                            ))
                        }
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MainAdminPanel;