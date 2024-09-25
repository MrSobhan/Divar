import React, { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import AuthContext from "./context/authContext";
import routes from "./routes";

import "./App.css";

const App = () => {


  const router = useRoutes(routes);

  const [isLoad, setIsLoad] = useState(true)
  const [allCookie, setAllCookie] = useState(document.cookie)

  useEffect(() => {
    window.addEventListener('load' , setIsLoad(false))
  }, [])

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

  return (
    <>
      <AuthContext.Provider
        value={{
          getCookie,
          baseUrl,
          setLocalStorage,
          getLocalStorage,
        }}
      >
        {router}
      </AuthContext.Provider>
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


export default App;