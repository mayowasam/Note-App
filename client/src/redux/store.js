import {combineReducers, configureStore} from '@reduxjs/toolkit'
import alertReducer from './reducers/alertReducer'
import authReducer from './reducers/authReducer'
import userReducer  from './reducers/userReducer'
import postReducer from './reducers/postReducer'

import storage from 'redux-persist/lib/storage'
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";


const persistConfig = {
    key: 'root',
    storage,
    timeout:0
  }


const rootReducer = combineReducers({
    auth: authReducer,
    user:  userReducer,
    alert: alertReducer,
    post: postReducer

})

const persistedReducer = persistReducer(persistConfig, rootReducer)

// const reducer = {
//   auth: authReducer,
//   user:  userReducer,
//   alert: alertReducer,
//   post: postReducer

// }

//export  const store = configureStore({
//   reducer
// middleware: [...getDefaultMiddleware, another external middleware]
// })

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
        ignoredActionPaths: ["payload"],
      },
    }),
})

export const persistor = persistStore(store)