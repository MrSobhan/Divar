import { createContext } from "react";


const AuthContext = createContext({
    getCookie: () => { },
    baseUrl: "",
    setLocalStorage: () => { },
    getLocalStorage: () => { },
    // fetchApi: () => { }
    filtersPosts: {}
});

export default AuthContext;