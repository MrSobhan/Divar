import React, { useEffect, useState } from "react";
import { useRoutes, useParams, useNavigate } from "react-router-dom";
import AuthContext from "./context/authContext";
import routes from "./routes";
import swal from "sweetalert";
import "./App.css";

const App = () => {

  const navigator = useNavigate()
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
  const isLogin = async () => {
    let IsToken = getLocalStorage('token')

    if (IsToken) {

      await fetch(`${baseUrl}/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${IsToken}`,
        },
      }).then((res) => {
        // console.log("GetMe Respose ->", res);
        IsToken = (res.status == 200) ? true : false
      });
    }

    return IsToken ? true : false
  }

  const getMe = async () => {
    const token = getLocalStorage('token')

    if (!token) {
      return false;
    }

    const res = await fetch(`${baseUrl}/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await res.json();

    return response.data.user;
  };

  const LogOut = async () => {
    swal({
      title: "آیا از خروج مطمئن هستید؟",
      icon: "warning",
      buttons: ["خیر", "بله"]
    }).then((result) => {
      if (result) {
        localStorage.removeItem("token");
        swal({
          title: "با موفقیت خارج شدید",
          icon: "success",
          buttons: "رفتن به هوم پیج"
        }).then(() => (navigator('/main')));
      }
    });

  };



  return (
    <AuthContext.Provider
      value={{
        baseUrl,
        setLocalStorage,
        getLocalStorage,
        calcuteRelativeTimeDifference,
        isLogin,
        getMe,
        LogOut
      }}
    >
      {router}
    </AuthContext.Provider>
  );
}


export default App;