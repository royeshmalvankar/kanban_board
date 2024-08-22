import { useState, createContext } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [IsAuth, setIsAuth] = useState(false)
    const [data, setData] = useState([])
    const [isLoding, setLoding] = useState(true)
    const [isError, setError] = useState(true)
    const [userauth, setUserauth] = useState({
        email: "",
        password: ""
    })
    const [authdetails, setAuthdetails] = useState({isloggedIn: false, token: null})
    const login = (token) => {
        setAuthdetails({isloggedIn: true, token: token})
        setUserauth({email: "", password: ""})
    }


    const logout = () => {
        setAuthdetails({isloggedIn: false, token: null})
    }
    return (
        <AuthContext.Provider value={{IsAuth,setIsAuth,data,setData,isLoding,setLoding,isError,setError,authdetails, login, logout, userauth, setUserauth}}>
            {children}
        </AuthContext.Provider>
    )

}