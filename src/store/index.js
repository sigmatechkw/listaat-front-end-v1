import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from './reducers';
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  })
});

export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch()

export const useAppSelector =  useSelector



// ** Reducers
// import chat from 'src/store/apps/chat'
// import user from 'src/store/apps/user'
// import email from 'src/store/apps/email'
// import invoice from 'src/store/apps/invoice'
// import calendar from 'src/store/apps/calendar'
// import permissions from 'src/store/apps/permissions'
//
// export const store = configureStore({
//   reducer: {
//     user,
//     chat,
//     email,
//     invoice,
//     calendar,
//     permissions
//   },
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: false
//     })
// })
