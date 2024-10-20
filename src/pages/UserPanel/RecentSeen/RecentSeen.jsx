import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/authContext';
import { Link } from 'react-router-dom';
import './RecentSeen.css'

const RecentSeen = () => {
    const authContext = useContext(AuthContext)
    const [posts, setPosts] = useState([])
    let recentSeens = authContext.getLocalStorage('recent-seen')

    useEffect(() => {
        if (recentSeens) {
            setPosts([])
            for (const postID of recentSeens) {
                GetAllRecentPosts(postID)
            }
        }
    }, [])

    const GetAllRecentPosts = async (postId) => {
        await fetch(`${authContext.baseUrl}/v1/post/${postId}`)
            .then(res => { if (res.status !== 404) { return res.json() } }).then((response) => {

                if (!posts.includes(response.data.post)) {

                    setPosts(prevPost => [...prevPost, response.data.post])
                }

            });



    }


    const removeRecentSeen = (postID) => {
        const newRecentSeens = recentSeens.filter((post) => post !== postID);
        recentSeens = newRecentSeens;
        setPosts(posts.filter((post) => post._id !== postID))

        if (recentSeens.length) {
            authContext.setLocalStorage("recent-seen", newRecentSeens);
        } else {
            localStorage.removeItem("recent-seen");
        }

    }

    const sharePost = async (postID, postTitle) => {
        await navigator.share({
            title: postTitle,
            url: `/post/${postID}`,
        });
    };
    return (
        <>
            <section className="posts" id="posts-container">
                {
                    posts.length != 0 && (
                        posts.map((post) => {
                            const date = authContext.calcuteRelativeTimeDifference(post.createdAt);

                            return (
                                <div className="post">
                                    <div>
                                        {
                                            post.pics.length
                                                ? <img src={`${authContext.baseUrl}/${post.pics[0].path}`} />
                                                : <img src="/public/images/main/noPicture.PNG" />
                                        }

                                        <div>
                                            <Link className="title" to={`/post/${post._id}`}>{
                                                post.title
                                            }</Link>
                                            <p>{date} در {post.city.name}، {
                                                post.neighborhood.id !== 0 ? post.neighborhood.name : ""
                                            }</p>
                                        </div>
                                    </div>
                                    <i onClick={() => sharePost(`${post._id}`, `${post.title}`)} className="bi bi-share"></i>
                                    <i onClick={() => removeRecentSeen(post._id)} className="bi bi-trash"></i>
                                </div>
                            )
                        })
                    )
                }
            </section>
            <div className="empty" style={{ display: `${recentSeens && posts.length ? 'none' : 'flex'}` }}>
                <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoMjAwdjIwMEgweiIvPjxnIGZpbGwtcnVsZT0ibm9uemVybyI+PHBhdGggZmlsbD0iIzkxOUJBQSIgZD0ibTEzNi43NiAxNzQuNjMtMzQuNDMtMTAuNzgtNDIuNjctOS40LTMxLjAzLTEwLjYgMjIuMTctMjUuOCA5MC4zMyAzMi4zMnoiIG9wYWNpdHk9Ii4zMiIvPjxwYXRoIGZpbGw9IiNFQUVERUYiIGQ9Im0yMC44IDEyNy44NCAzOC42OCAyNS44NiA0Mi44NS01Mi45NS0zOC42Ny0yNS44N3oiLz48cGF0aCBmaWxsPSIjRjlGQkZDIiBkPSJtNTkuNDggMTUzLjcgMzguNDItNC45M0wxNDEgOTUuODJsLTM4LjY3IDQuOTN6Ii8+PHBhdGggZmlsbD0iI0U5RURFRiIgZD0ibTk3LjkgMTQ4Ljc3IDM4LjQzIDI1Ljg2IDQzLjEtNTIuN0wxNDEgOTUuODF6Ii8+PHBhdGggZmlsbD0iI0NCRDBFMCIgZD0ibTY0LjczIDEyOS4yMyAyLjAzIDEuNDEgMjQuNTgtMzAuMjMtMi4wMy0xLjQ4em0xMy41LTguODIgMi4wMyAxLjQxIDE0Ljg0LTE4LjIxLTIuMDMtMS40OHoiLz48cGF0aCBmaWxsPSIjRTNFOEYyIiBkPSJtNzcuNDYgMTM2LjM2IDIuMTUtLjI1TDEwMy44IDEwNmgtMi4yMnptMTMuMTctNC42MiAyLjE1LS4yNSA4Ljg4LTExLjA4aC0yLjIyem0xMS4wMy0xNC4wNCAyLjE1LS4yNSA4Ljg3LTExLjA3aC0yLjIyem0tMTQuNTQgMTIuMTYgMi4xNS0uMjUgMTguODUtMjMuNThoLTIuMjJ6Ii8+PHBhdGggZmlsbD0iI0U0RTlFRSIgZD0ibTEwNC44MyAxNDAuNDYtNi4wOS42NyAxOS40Ni0yNC4zNyA2LjQtLjc0eiIvPjxwYXRoIGZpbGw9IiNDOUQwREUiIGQ9Im0xMDQuODMgMTQwLjQ2IDExLjAzIDcuNTEgMTkuNy0yNC42Mi0xMC45Ni03LjMzem0tNTUuMjUtMzEuMjggMTAuOCA3LjgzTDgwLjggOTIuOTdsLTEwLjc0LTcuNjV6bTEwMi4xNCAyOS44IDEuOTQgMS41IDE0LjgtMTguMS0yLjItMS41N3oiLz48L2c+PC9nPjwvc3ZnPg=="
                    alt
                />
                <p>اخیراً از هیچ آگهی‌ای بازدید نکرده‌اید</p>
            </div>

        </>
    );
}


export default RecentSeen;