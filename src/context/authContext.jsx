import { createContext } from "react";


const AuthContext = createContext({
    getCookie: () => { },
    baseUrl: "",
    setLocalStorage: () => { },
    getLocalStorage: () => { }
});

export default AuthContext;