import { createContext } from "react";


const AuthContext = createContext({
    getCookie: () => { },
    baseUrl: "",
    setLocalStorage: () => { },
    getLocalStorage: () => { },
    fetchApi: () => { }
});

export default AuthContext;