import {combineReducers} from "@reduxjs/toolkit";
import authReducer from './authSlice'
import langReducer from './langSlice'
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'

export default combineReducers ({
  auth: authReducer,
  lang: langReducer,
  user,
  chat,
  email,
  invoice,
  calendar,
  permissions
})
