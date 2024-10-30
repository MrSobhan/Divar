import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/authContext';
import { Link } from 'react-router-dom';
import './Notes.css'

const Notes = () => {
    const authContext = useContext(AuthContext)
    const [posts, setPosts] = useState([])


    const token = authContext.getLocalStorage('token')

    useEffect(() => {
        fetch(`${authContext.baseUrl}/v1/user/notes`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(res => res.json()).then((response) => {
            setPosts(response.data.posts)
        });
    }, [])

    const removeNote = (noteID) => {
        console.log(noteID);
        swal({
            title: "آیا از حذف این یادداشت مطمئن هستید؟",
            icon: "warning",
            buttons: ["خیر", "بله"]
        }).then((result) => {
            if (result) {
                fetch(`${authContext.baseUrl}/v1/note/${noteID}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((res) => {
                    if (res.status === 200) {
                        let postsFilterd = posts.filter((post) => post.note._id !== noteID);
                        if (postsFilterd.length) {
                            setPosts(postsFilterd)
                        }
                    }
                });
            }
        });

    }


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
                                            <a className="title" href="/pages/post.html?id=${post._id}">{
                                                post.title
                                            }</a>
                                            <p>{date} در {post.neighborhood.name}</p>
                                            <p>{post.note.content}</p>
                                        </div>
                                    </div>
                                    <i className="bi bi-trash" onClick={() => removeNote(post._id)}></i>
                                </div>
                            )
                        })
                    )
                }
            </section>

            <div className="empty" style={{ display: `${posts.length ? 'none' : 'flex'}` }}>
                <img
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9Im5vbmUiIGQ9Ik0wIDBoMjAwdjIwMEgweiIvPjxwYXRoIGZpbGw9IiNDOUQwREUiIGQ9Ik04IDEzMy40M2w3MC4wNjMgNDAuMTkgMTE0LjM3NC02Ni45NzMtNjguNzA1LTQwLjIzMXoiLz48cGF0aCBmaWxsPSIjRjlGQkZDIiBkPSJNMTIzLjczMiA2NUw4IDEzMi4wMTRsNzAuMDYzIDQwLjE5IDExNC4zNzQtNjYuOTczeiIvPjxwYXRoIGZpbGwtb3BhY2l0eT0iLjMyIiBmaWxsPSIjQzlEMERFIiBkPSJNMTQ1LjYwNiAxMjMuMjA0bDI3LjA3NC0xNS45MS01My43MTMtMzAuOTQzLTI4LjQzIDE1Ljk1ek04Ni4yNDMgMTU4Ljc5N2w1MC41OTQtMjkuNjM0TDgzLjEyNCA5OC4yMmwtNTEuOTUxIDI5LjY3NXoiLz48cGF0aCBmaWxsLW9wYWNpdHk9Ii4zMiIgZmlsbD0iIzkxOUJBQSIgZD0iTTU1LjczIDEyMS4zMjRsNDkuNzYtMjkuMTIyIDM4LjYzNiAyMC40NDktNDkuNzMzIDI5LjEzN3oiLz48cGF0aCBkPSJNOTMuNzA1IDk4LjIyOGwtMzcuOTA3IDIyLjE4NiAzOC42NjQgMjAuNDYzIDM3Ljg3OS0yMi4yYzQuMDU2LTIuMzc3IDcuMzc1LTguMDI0IDcuMzc1LTEyLjU0OSAwLTQuNTI0LTMuMzItNi4yOC03LjM3NS0zLjkwMi0uODY1LjUwNy0uODQtNC4yMDUtMS42MTQtMy40NDJMMTAxLjI1IDgyLjQ1Yy4wMTIuMTgyLS4xNzIgMy4wMzctLjE3MiAzLjIyOSAwIDQuNTI1LTMuMzE4IDEwLjE3MS03LjM3NCAxMi41NDkiIGZpbGw9IiNGRkNENjEiLz48cGF0aCBkPSJNOTkuMDQ2IDgxLjI4N2MtMS4zNS0uODMxLTMuMjctLjczMS01LjM5Ni41MTctLjg5LjUyLTEuNzM4IDEuMjA0LTIuNTI4IDEuOTkybC0uMDA4LjAwMyAzOC42NTYgMjAuNDU5LjAwOC0uMDAzYy44LS44MDQgMS42NjItMS41IDIuNTYzLTIuMDMgMS45OS0xLjE2NiAzLjgtMS4zMzIgNS4xMy0uNjdMOTkuMDQ3IDgxLjI4OHpNMTM3LjYxOCAxMDEuNjMzYy4wMjguMDE2LjA1Ni4wMzYuMDg0LjA1NGwuMDExLS4wMDQtLjA5NS0uMDV6TTg4LjIwOSAxMDUuNTNsMi41My0xLjM2NyAyNi4yNyAxNC4zMjctMi41MTEgMS4zNzl6TTgzLjgxMSAxMDguNTQ2bDIuNTMxLTEuMzY5IDI2LjI3MSAxNC4zMjctMi41MTMgMS4zOHpNNzkuNDE3IDExMS4yNDhsMi41My0xLjM3IDE0LjUxIDcuODg3LTIuNTEzIDEuMzc4eiIgZmlsbD0iI0Y0QTg0QSIvPjwvZz48L3N2Zz4="
                    alt='Not Notes'
                />
                <p> برای یادداشت گذاشتن روی آگهی‌ها می‌توانید از
                    دکمهٔ <i className="bi bi-card-text"></i> در صفحهٔ
                    آگهی استفاده کنید.
                </p>
            </div>
        </>
    );
}


export default Notes;