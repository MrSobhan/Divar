import React, { useContext, useEffect, useState } from 'react';
import HeaderMain from '../../Components/HeaderMain/HeaderMain'
import Sidebar from '../../Components/Sidebar/Sidebar'
import AuthContext from '../../context/authContext';
import { useNavigate, useParams } from 'react-router-dom';
import PostBox from '../../Components/PostBox/PostBox';
import './Main.css'

const Main = () => {
    const authContext = useContext(AuthContext)
    const navigator = useNavigate()
    const { categoryId , urgent } = useParams()
    const [posts, setPosts] = useState([])
    const [valueSearch, setValueSearch] = useState('')
    const citiesIDs = authContext.getLocalStorage('city')


    // const fetchApi = (isEmpty) => {
    //     let Url = `${authContext.baseUrl}/v1/post/?city=${citiesIDs[0].id}`
    //     Url += categoryId ? `&categoryId=${categoryId}` : ''
    //     Url += isEmpty && (valueSearch != '' ? `&search=${valueSearch}` : '')

    //     fetch(Url)
    //         .then(res => res.json()).then(posts => {
    //             setPosts(posts.data.posts);
    //             console.log(posts.data.posts);

    //         })
    // }

    // useEffect(() => {
    //     authContext.fetchApi(true, valueSearch, categoryId).then(posts => { setPosts(posts.data.posts) })

    // }, [categoryId])


    useEffect(() => {
        authContext.fetchApi(valueSearch, categoryId)
        .then(posts => { setPosts(posts.data.posts) })
        if (!citiesIDs) {
            navigator('/')
        }
        console.log(location);
        
    }, [categoryId])




    //* HeaderMain Func :)


    const changeValueSearch = (value) => {
        setValueSearch(value)
    }
    const emptyValueSearch = () => {
        setValueSearch('')
        authContext.fetchApi(fvalueSearch, categoryId)
        .then(posts => { setPosts(posts.data.posts) })
    }
    const keyUpInputHandler = (e) => {
        if (e.keyCode == 13) {
            authContext.fetchApi(valueSearch, categoryId)
            .then(posts => { setPosts(posts.data.posts) })
        }
    }

    return (
        <>
            <HeaderMain
                changeValueSearch={(value) => changeValueSearch(value)}
                emptyValueSearch={emptyValueSearch}
                keyUpInputHandler={(event) => keyUpInputHandler(event)}
                valueSearch={valueSearch}
                setValueSearch={setValueSearch}
            />
            <main className="main-container">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <Sidebar />
                        </div>
                        <div className="col-9">
                            <div className="row">

                                {
                                    posts?.length != 0 ? (posts.map((post) => <PostBox key={post._id} {...post} />)) : (
                                        <div className='col-12'>
                                            <p className="empty w-100">آگهی یافت نشد</p>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}


export default Main;