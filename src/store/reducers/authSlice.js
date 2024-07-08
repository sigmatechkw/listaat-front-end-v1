import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
  loggedIn: false,
  token: '',
  user: {}
}

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    login: (state, action) => (
      {
        loggedIn: true,
        token: action.payload.token,
        user: action.payload.user
      }
    ),
    setUserData: (state, action) => (
      {...state, user: action.payload}
    ),
    setToken: (state, action) => (
      {...state, token: action.payload}
    ),
    logout: (state) => (
      INITIAL_STATE
    )
  }
})

export const {login, setUserData, setToken, logout} = authSlice.actions

export default authSlice.reducer
