import { createContext } from "react";


const AuthContext = createContext({
    baseUrl: "",
    setLocalStorage: () => { },
    getLocalStorage: () => { },
    calcuteRelativeTimeDifference: () => { },
    isLogin: () => { },
    getMe: () => { },
    LogOut: () => { }
});

export default AuthContext;