import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'
import { version } from 'vite'


const rootReducer = combineReducers({
  user: useReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  version:1,
}
  
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
})

export const persistor = persistStore(store)

