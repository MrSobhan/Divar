import React, { useEffect, useState } from "react";
import { useRoutes, useParams } from "react-router-dom";
import AuthContext from "./context/authContext";
import routes from "./routes";

import "./App.css";

const App = () => {


  const router = useRoutes(routes);

  const baseUrl = "https://divarapi.liara.run"

  // const [allCookie, setAllCookie] = useState(document.cookie)

  // const getCookie = (param) => {
  //   const paramValue = param + '='
  //   let result = null
  //   const cookieArry = allCookie.split('; ')
  //   cookieArry.forEach(cookie => {
  //     if (cookie.indexOf(paramValue) == 0) {
  //       result = cookie.substring(paramValue.length)
  //     }
  //   });



  //   return result;
  // }

  const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }
  const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
  }
  const calcuteRelativeTimeDifference = (createdAt) => {


    const publishDate = new Date(createdAt)
    const newDate = new Date()

    let relativeTime = null

    let miliSecond = newDate - publishDate
    relativeTime = Math.floor((miliSecond / 3600000))

    let TimeReturn = relativeTime > 24 ? (Math.floor(relativeTime / 24) + ' روز پیش') : (relativeTime + 'ساعت پیش ')

    return TimeReturn;

  }
  const isLogin =  () => {
    let IsToken = getLocalStorage('token')
    
    if (IsToken) {

      fetch(`${baseUrl}/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${IsToken}`,
        },
      }).then((res)=>{
        console.log("GetMe Respose ->", res);
        return res.status == 200 ? true : false
      });
    }
    return IsToken ? true : false
  }




  return (
    <AuthContext.Provider
      value={{
        baseUrl,
        setLocalStorage,
        getLocalStorage,
        calcuteRelativeTimeDifference,
        isLogin
      }}
    >
      {router}
    </AuthContext.Provider>
  );
}


export default App;