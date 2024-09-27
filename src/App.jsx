import React, { useEffect, useState } from "react";
import { useRoutes , useParams } from "react-router-dom";
import AuthContext from "./context/authContext";
import routes from "./routes";

import "./App.css";

const App = () => {


  const router = useRoutes(routes);

  const [allCookie, setAllCookie] = useState(document.cookie)

  // useEffect(() => {
  //   window.addEventListener('load', setIsLoad(false))
  // }, [])

  const getCookie = (param) => {
    const paramValue = param + '='
    let result = null
    const cookieArry = allCookie.split('; ')
    cookieArry.forEach(cookie => {
      if (cookie.indexOf(paramValue) == 0) {
        result = cookie.substring(paramValue.length)
      }
    });



    return result;
  }

  const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }
  const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
  }

  const [baseUrl, setBaseUrl] = useState("https://divarapi.liara.run")

  
  // const fetchApi = (valueSearch , categoryId) => {
  //   const citiesIDs = getLocalStorage('city')
    

  //   let Url = `${baseUrl}/v1/post/?city=${citiesIDs[0].id}`
  //   Url += categoryId ? `&categoryId=${categoryId}` : ''
  //   Url += valueSearch != '' ? `&search=${valueSearch}` : ''
    
  //   return fetch(Url)
  //     .then(res => res.json())
  
  // }

  const filtersPosts = {price : {min : 0 , max : 0} , filter : []}


  

  return (
      <AuthContext.Provider
        value={{
          getCookie,
          baseUrl,
          setLocalStorage,
          getLocalStorage,
          filtersPosts
        }}
      >
        {router}
      </AuthContext.Provider>
  );
}


export default App;