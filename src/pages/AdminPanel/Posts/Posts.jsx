import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/authContext';
import { Link } from 'react-router-dom';
import './Posts.css'
const Posts = () => {
    const authContext = useContext(AuthContext)
    const [posts, setPosts] = useState([])


    const token = authContext.getLocalStorage('token')

    useEffect(() => {
        fetch(`${authContext.baseUrl}/v1/user/posts`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(res => res.json()).then((response) => {
            setPosts(response.data.posts)
        });
    }, [])

    return (
        <>
            <section className="posts" id="posts-container">
                {
                    posts.length != 0 && (
                        posts.map((post) => {
                            const date = authContext.calcuteRelativeTimeDifference(post.createdAt);

                            return (
                                <Link className="post" to={`/post/${post._id}`}>
                                    <div className="post-info">
                                        {post.pics.length
                                            ? <img src={`${authContext.baseUrl}/${post.pics[0].path}`} />
                                            : <img src="/public/images/main/noPicture.PNG" />
                                        }
                                        <div>
                                            <p className="title">{post.title}</p>
                                            <p className="price">{post.price.toLocaleString()} تومان</p>
                                            <p className="location">{date} در {post.city.name}</p>
                                        </div>
                                    </div>
                                    <div className="post-status">
                                        <div>
                                            <p>وضعیت آگهی:</p>
                                            {post.status === "published"
                                                ? <p className="publish">منتشر شده</p>
                                                : ""
                                            }
                                            {post.status === "rejected"
                                                ? <p className="reject">رد شده</p>
                                                : ""
                                            }
                                            {post.status === "pending"
                                                ? <p className="pending">در صف انتشار</p>
                                                : ""
                                            }

                                        </div>
                                        <button className="controll-btn">مدیریت اگهی</button>
                                    </div>
                                </Link>
                            )
                        })
                    )
                }
            </section>
            <div className="empty" style={{ display: `${posts.length ? 'none' : 'flex'}` }}>
                <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoMjAwdjIwMEgweiIvPjxnIGZpbGwtcnVsZT0ibm9uemVybyI+PHBhdGggZmlsbD0iIzkxOUJBQSIgZD0ibTEzNi43NiAxNzQuNjMtMzQuNDMtMTAuNzgtNDIuNjctOS40LTMxLjAzLTEwLjYgMjIuMTctMjUuOCA5MC4zMyAzMi4zMnoiIG9wYWNpdHk9Ii4zMiIvPjxwYXRoIGZpbGw9IiNFQUVERUYiIGQ9Im0yMC44IDEyNy44NCAzOC42OCAyNS44NiA0Mi44NS01Mi45NS0zOC42Ny0yNS44N3oiLz48cGF0aCBmaWxsPSIjRjlGQkZDIiBkPSJtNTkuNDggMTUzLjcgMzguNDItNC45M0wxNDEgOTUuODJsLTM4LjY3IDQuOTN6Ii8+PHBhdGggZmlsbD0iI0U5RURFRiIgZD0ibTk3LjkgMTQ4Ljc3IDM4LjQzIDI1Ljg2IDQzLjEtNTIuN0wxNDEgOTUuODF6Ii8+PHBhdGggZmlsbD0iI0NCRDBFMCIgZD0ibTY0LjczIDEyOS4yMyAyLjAzIDEuNDEgMjQuNTgtMzAuMjMtMi4wMy0xLjQ4em0xMy41LTguODIgMi4wMyAxLjQxIDE0Ljg0LTE4LjIxLTIuMDMtMS40OHoiLz48cGF0aCBmaWxsPSIjRTNFOEYyIiBkPSJtNzcuNDYgMTM2LjM2IDIuMTUtLjI1TDEwMy44IDEwNmgtMi4yMnptMTMuMTctNC42MiAyLjE1LS4yNSA4Ljg4LTExLjA4aC0yLjIyem0xMS4wMy0xNC4wNCAyLjE1LS4yNSA4Ljg3LTExLjA3aC0yLjIyem0tMTQuNTQgMTIuMTYgMi4xNS0uMjUgMTguODUtMjMuNThoLTIuMjJ6Ii8+PHBhdGggZmlsbD0iI0U0RTlFRSIgZD0ibTEwNC44MyAxNDAuNDYtNi4wOS42NyAxOS40Ni0yNC4zNyA2LjQtLjc0eiIvPjxwYXRoIGZpbGw9IiNDOUQwREUiIGQ9Im0xMDQuODMgMTQwLjQ2IDExLjAzIDcuNTEgMTkuNy0yNC42Mi0xMC45Ni03LjMzem0tNTUuMjUtMzEuMjggMTAuOCA3LjgzTDgwLjggOTIuOTdsLTEwLjc0LTcuNjV6bTEwMi4xNCAyOS44IDEuOTQgMS41IDE0LjgtMTguMS0yLjItMS41N3oiLz48L2c+PC9nPjwvc3ZnPg=="
                    alt='Not Posts'
                />
                <p>در حال حاضر آگهی ثبت‌شده ندارید.</p>
            </div>
            {/* <ul className="pagination-items"></ul> */}
        </>
    );
}

export default Posts;