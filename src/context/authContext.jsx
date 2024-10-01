import { createContext } from "react";


const AuthContext = createContext({
    baseUrl: "",
    setLocalStorage: () => { },
    getLocalStorage: () => { },
    calcuteRelativeTimeDifference: () => { },
    isLogin: () => { }
});

export default AuthContext;