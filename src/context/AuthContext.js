// ** React Imports
import {createContext, useEffect, useState} from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import {login as loginAction, logout as logoutAction} from "../store/reducers/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {getCookie, setCookie} from "cookies-next";

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      // const storedToken = window.localStorage.getItem('token')
      if (getCookie('token')) {
        setLoading(false)
        setUser(auth.user)
        // setUser(JSON.parse(localStorage.getItem('user')))
      } else {
        setLoading(false)
        setUser(null)
        dispatch(logoutAction())
        router.replace('/login')
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params, errorCallback) => {
    let data = {...params, role: 'admin'}
    axios
      .post(`${process.env.NEXT_PUBLIC_API_KEY}login`, data)
      .then(async response => {
        setCookie('token', `Bearer ${response.data.data.access_token}`)
        // window.localStorage.setItem('token', `Bearer ${response.data.data.access_token}`)
        const returnUrl = router.query.returnUrl
        setUser({ ...response.data.data.user_details })
        setCookie('user', response.data.data.user_details)
        // window.localStorage.setItem('user', JSON.stringify(response.data.data.user_details))
        dispatch(loginAction({
          token: `Bearer ${response.data.data.access_token}`,
          user: response.data.data.user_details
        }))
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL)
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('token')
    dispatch(logoutAction())
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
