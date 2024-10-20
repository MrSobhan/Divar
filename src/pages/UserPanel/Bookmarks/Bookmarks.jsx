import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/authContext';
import { Link } from 'react-router-dom';
import './Bookmarks.css'
const Bookmarks = () => {
    const authContext = useContext(AuthContext)
    const [posts, setPosts] = useState([])


    const token = authContext.getLocalStorage('token')

    useEffect(() => {
        fetch(`${authContext.baseUrl}/v1/user/bookmarks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(res => res.json()).then((response) => {
            setPosts(response.data.posts)
        });
    }, [])

    const removeBookmark = async (postID) => {
        console.log(postID);
        swal({
            title: "آیا از حذف این نشان مطمئن هستید؟",
            icon: "warning",
            buttons: ["خیر", "بله"]
        }).then((result) => {
            if (result) {
                fetch(`${authContext.baseUrl}/v1/bookmark/${postID}`, {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                }).then((res) => {
                    if (res.status === 200) {
                        posts = posts.filter((post) => post._id !== postID);

                        if (posts.length) {
                            setPosts(posts)
                        }
                    }
                });
            }
        });

    }

    const sharePost = async (postID, postTitle) => {
        await navigator.share({
            title: postTitle,
            url: `/post/${postID}`,
        });
    };
    return (
        <>
            <section className="posts" id="posts-container"></section>
            {
                posts.length != 0 && (
                    posts.map((post) => {
                        const date = authContext.calcuteRelativeTimeDifference(post.createdAt);

                        return (
                            <div className="post">
                                <div>
                                    <div>
                                        <Link className="title" to={`/post/${post._id}`}>{
                                            post.title
                                        }</Link>
                                        <div>
                                            <p>{post.price.toLocaleString()} تومان</p>
                                            <p>{date} در {post.neighborhood.name}</p>
                                        </div>
                                    </div>
                                    {
                                        post.pics.length
                                            ? <img src={`${authContext.baseUrl}/${post.pics[0].path}`} />
                                            : <img src="/public/images/main/noPicture.PNG" />
                                    }

                                </div>
                                <div>
                                    <button onClick={() => sharePost(`${post._id}`, `${post.title}`)}>
                                        اشتراک گذاری
                                        <i className="bi bi-share"></i>
                                    </button>
                                    <button onClick={() => removeBookmark(post._id)}>
                                        حذف نشان
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        )
                    })
                )
            }
            <div className="empty" style={{ display: `${posts.length ? 'none' : 'flex'}` }}>
                <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoMjAwdjIwMEgweiIvPjxwYXRoIGZpbGw9IiNDOUQwREUiIGQ9Im04IDEzMy40MyA3MC4wNiA0MC4xOSAxMTQuMzgtNjYuOTctNjguNy00MC4yM3oiLz48cGF0aCBmaWxsPSIjRjlGQkZDIiBkPSJNMTIzLjczIDY1IDggMTMyLjAxbDcwLjA2IDQwLjIgMTE0LjM4LTY2Ljk4TDEyMy43NCA2NXoiLz48cGF0aCBmaWxsPSIjQzlEMERFIiBmaWxsLW9wYWNpdHk9Ii4zMiIgZD0ibTE0NS42IDEyMy4yIDI3LjA4LTE1LjktNTMuNzEtMzAuOTVMOTAuNTQgOTIuM3ptLTU5LjM2IDM1LjYgNTAuNi0yOS42NC01My43Mi0zMC45NC01MS45NSAyOS42OHoiLz48cGF0aCBmaWxsPSIjOTE5QkFBIiBmaWxsLW9wYWNpdHk9Ii4zMiIgZD0ibTExNC4wOSA5My40LTUxLjE2IDMwLjgyIDI3Ljg5LTEuMzgtLjE5IDE3LjQyIDUzLjE2LTMxLjE1eiIvPjxwYXRoIGZpbGw9IiNGRjY0ODUiIGQ9Ik0xMzMuNyA5OS43NmMtLjY3LjQtLjY1LTMuMjMtMS4yNC0yLjY1TDEwOS44IDg0LjU2bC0uMTQgMi40OGMwIDMuNDgtMi41NSA3LjgyLTUuNjcgOS42NWwtNDMuNSAyNS40OCAyOS41OC0xLjQ2LS4zOSAxNy41IDQ0LjAyLTI1LjhjMy4xMS0xLjgzIDUuNjctNi4xNyA1LjY3LTkuNjUgMC0zLjQ4LTIuNTYtNC44My01LjY3LTMiLz48cGF0aCBmaWxsPSIjQ0MzQzY2IiBkPSJNMTA4LjMgODMuMzNjLTEuMDQtLjYzLTIuNTItLjU2LTQuMTUuNGE5Ljg4IDkuODggMCAwIDAtMS45NSAxLjUzTDEzMS45IDEwMWguMDFhOS44NyA5Ljg3IDAgMCAxIDEuOTctMS41NmMxLjUzLS45IDIuOTItMS4wMiAzLjk0LS41MUwxMDguMyA4My4zNHptMjkuNzMgMTUuOTdjLjAzIDAgLjA1LjAyLjA3LjA0bC0uMDctLjA0eiIvPjxwYXRoIGZpbGw9IiNBNTJCNTQiIGQ9Ik0xMDIuMiA4NS4yNnYuNjNsMjkuNTMgMTUuNjN2LS42MnptMjkuNTMgMTYuMjZzLjI3LjIuNTMtLjA1Yy0uMTQtLjI1LS4zNS0uNDgtLjM1LS40OGwtLjE4LS4xdi42M3ptLTQxLjY1IDM2LjAyLS4zOS4yNHYuODRsMS4xMi0uNjN6bS0yOS41OS0xNS4zN3YuOTRsMjkuNTYtMS40NS4wMi0uOTV6Ii8+PHBhdGggZmlsbD0iI0E1MkI1NCIgZD0ibTkwLjQ4IDEzOC4xOS0uMzktLjY3IDQzLjQxLTI1LjQ0YzMuMDItMS43NyA1LjQ4LTUuOTUgNS40OC05LjMyIDAtMS41LS41LTIuNi0xLjQtMy4xMS0uOTQtLjU0LTIuMjktLjM4LTMuNjkuNDQtLjAzLjAzLS4yOC4yMi0xLjYzIDEuMzlsLS41LS41OGMxLjYtMS4zOSAxLjY5LTEuNDQgMS43NC0xLjQ3IDEuNjgtLjk4IDMuMjYtMS4xNCA0LjQ3LS40NSAxLjE1LjY2IDEuNzggMiAxLjc4IDMuNzggMCAzLjYxLTIuNjMgOC4wOS01Ljg2IDkuOThsLTQzLjQxIDI1LjQ1eiIvPjwvZz48L3N2Zz4="
                    alt
                />
                <p>
                    برای نشان‌کردن آگهی‌ها از دکمهٔ <i className="bi bi-bookmark"></i>در
                    صفحهٔ آگهی استفاده کنید.
                </p>
            </div>
            {/* <ul className="pagination-items"></ul> */}
        </>
    );
}

export default Bookmarks;