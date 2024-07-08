import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = 'en'

const langSlice = createSlice({
  name: 'lang',
  initialState: INITIAL_STATE,
  reducers: {
    changeLang: (state, action) => action.payload
  }
})

export const {changeLang} = langSlice.actions

export default langSlice.reducer
