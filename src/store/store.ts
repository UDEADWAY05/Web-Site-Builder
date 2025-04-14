import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import userReducer from './slices/userSlice/userSlice'
import siteReducer from './slices/siteSlice/siteSlice'

import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'

const rootReducer = combineReducers({
  user: userReducer,
  site: siteReducer,
})

// const persistedReducer = persistReducer(
//   { key: 'redux', storage: storage },
//   rootReducer
// )

export const store = configureStore({
  // reducer: persistedReducer,
  reducer:rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([])
  },
})

export const persistor = persistStore(store)

//only for dev mode,for convenience
// window.persistor = persistor

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
