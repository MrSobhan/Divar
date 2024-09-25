import React, { useContext, useEffect, useState } from 'react';
import HeaderMain from '../../Components/HeaderMain/HeaderMain'
import Sidebar from '../../Components/Sidebar/Sidebar'
import AuthContext from '../../context/authContext';
import { useNavigate, useParams } from 'react-router-dom';
import PostBox from '../../Components/PostBox/PostBox';
import './Main.css'

const Main = () => {
    const navigetor = useNavigate()
    const authContext = useContext(AuthContext)
    const { categoryId } = useParams()

    const [posts, setPosts] = useState([])
    const citiesIDs = authContext.getLocalStorage('city')
    const valueSearch = authContext.getLocalStorage('valueSearch')
    // console.log(citiesIDs);

    useEffect(() => {
        let Url = `${authContext.baseUrl}/v1/post/?city=${citiesIDs[0].id}`
        Url += categoryId ? `&categoryId=${categoryId}` : ''
        Url += valueSearch ? `&search=${valueSearch}` : ''
        // if(categoryId){
        //     Url += `${authContext.baseUrl}/v1/post/?city=${citiesIDs[0].id}&categoryId=${categoryId}`
        // }
        // console.log('search ' + valueSearch);

        fetch(Url)
            .then(res => res.json()).then(posts => {
                setPosts(posts.data.posts);
                console.log(posts.data.posts);

            })

    }, [valueSearch , categoryId])

    useEffect(() => {
        if (valueSearch) {
            console.log(valueSearch); //! Test Log
        }
    }, [valueSearch])


    return (
        <>
            <HeaderMain />
            <main className="main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <Sidebar />
                        </div>
                        <div className="col-9">
                            <div className="row">

                                {
                                posts.length != 0 ? (posts.map((post) => <PostBox key={post._id} {...post} />)) : (<p className="empty w-100">آگهی یافت نشد</p>)
                                    // useEffect(() => {
                                    // }, [posts])
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