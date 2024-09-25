import React, { useContext, useEffect, useState } from 'react';
import HeaderMain from '../../Components/HeaderMain/HeaderMain'
import Sidebar from '../../Components/Sidebar/Sidebar'
import AuthContext from '../../context/authContext';
import { useParams } from 'react-router-dom';
import PostBox from '../../Components/PostBox/PostBox';
import './Main.css'

const Main = () => {
    const authContext = useContext(AuthContext)
    const { categoryId } = useParams()
    const [posts, setPosts] = useState([])
    const [valueSearch, setValueSearch] = useState('')
    const citiesIDs = authContext.getLocalStorage('city')


    const fetchApi = (isEmpty) => {
        let Url = `${authContext.baseUrl}/v1/post/?city=${citiesIDs[0].id}`
        Url += categoryId ? `&categoryId=${categoryId}` : ''
        Url += isEmpty && (valueSearch != '' ? `&search=${valueSearch}` : '')

        fetch(Url)
            .then(res => res.json()).then(posts => {
                setPosts(posts.data.posts);
                console.log(posts.data.posts);

            })
    }

    useEffect(() => {
        fetchApi(true)
    }, [categoryId])




    //* HeaderMain Func :)


    const changeValueSearch = (value) => {
        setValueSearch(value)
    }

    const emptyValueSearch = () => {
        setValueSearch('')
        fetchApi(false)
    }
    const keyUpInputHandler = (e) => {
        if (e.keyCode == 13) {
            fetchApi(true)
        }
    }

    return (
        <>
            <HeaderMain
                changeValueSearch={(val)=>changeValueSearch(val)}
                emptyValueSearch={emptyValueSearch}
                keyUpInputHandler={(event)=>keyUpInputHandler(event)}
                valueSearch={valueSearch}
                setValueSearch={setValueSearch}
            />
            <main className="main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <Sidebar />
                        </div>
                        <div className="col-9">
                            <div className="row">

                                {
                                    posts.length != 0 ? (posts.map((post) => <PostBox key={post._id} {...post} />)) : (
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