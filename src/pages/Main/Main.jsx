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
    const { categoryId } = useParams()
    const [allPost, setAllPost] = useState([])
    const [posts, setPosts] = useState([])
    const [valueSearch, setValueSearch] = useState('')
    const [isLoad, setIsLoad] = useState(true)

    const [arryFilter, setArryFilter] = useState([])
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(0)


    const [category, setCategory] = useState([])


    let citiesIDs = authContext.getLocalStorage('city')

    const fetchApi = (isEmpty) => {
        citiesIDs = authContext.getLocalStorage('city')
        let JoinCitiesIDs = citiesIDs.map(city => city.id).join('|')
        if(citiesIDs && citiesIDs.length != 0){
            setIsLoad(true)
            
            let Url = `${authContext.baseUrl}/v1/post/?city=${JoinCitiesIDs}`
            Url += categoryId ? `&categoryId=${categoryId}` : ''
            Url += isEmpty && (valueSearch != '' ? `&search=${valueSearch}` : '')
    
            fetch(Url)
                .then(res => res.json()).then(posts => {
                    setIsLoad(false)
                    setAllPost(posts.data.posts)
                    ShowFiltredPost(posts.data.posts)
                })
        }else{
            navigator('/')
        }
    }

    const ShowFiltredPost = (postsData) => {
        let filteredPosts = postsData


        if (arryFilter.includes('justPhoto')) {
            filteredPosts = filteredPosts.filter((post) => post.pics.length);
        }
        if (arryFilter.includes('exchange')) {
            filteredPosts = filteredPosts.filter((post) => post.exchange);
        }

        // min / max price filtering

        if (maxPrice != 0) {
            if (minPrice != 0) {
                filteredPosts = filteredPosts.filter(
                    (post) => post.price >= minPrice && post.price <= maxPrice
                );
            } else {
                filteredPosts = filteredPosts.filter((post) => post.price <= maxPrice);
            }
        } else {
            if (minPrice != 0) {
                filteredPosts = filteredPosts.filter((post) => post.price >= minPrice);
            }
        }

        setPosts(filteredPosts)
    }

    useEffect(() => {
        fetchApi(true)

        fetch(`${authContext.baseUrl}/v1/category`)
            .then(res => res.json()).then(category => {
                setCategory(category.data.categories);
            })      
    }, [categoryId])

    useEffect(() => {
        ShowFiltredPost(allPost)
    }, [arryFilter, minPrice, maxPrice])




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
                changeValueSearch={(value) => changeValueSearch(value)}
                emptyValueSearch={emptyValueSearch}
                keyUpInputHandler={(event) => keyUpInputHandler(event)}
                valueSearch={valueSearch}
                setValueSearch={setValueSearch}
                fetchApi={fetchApi}
                category={category}
            />
            <main className="main-container">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <Sidebar
                                setArryFilter={setArryFilter}
                                setMinPrice={setMinPrice}
                                setMaxPrice={setMaxPrice}
                                cityName={citiesIDs[0]?.name}
                                category={category} />
                        </div>
                        <div className="col-9">
                            <div className="row">

                                {
                                    posts?.length != 0 ? (posts.map((post) => <PostBox key={post._id} {...post} />)) : (
                                        <div className="col-12 content_empty">
                                        <i className="bi bi-search text-danger"></i>
                                            <p className="text-danger">آگهی یافت نشد.</p>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {
                isLoad && (
                    <div id="loading-container">
                        <div id="loading"></div>
                    </div>
                )
            }
        </>
    );
}


export default Main;