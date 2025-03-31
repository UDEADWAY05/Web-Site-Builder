import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice/userSlice'
import layoutSiteReducer from './slices/layoutSite/layoutSiteSlice'

const rootReducer = combineReducers({
  user: userReducer,
  layoutSite: layoutSiteReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([])
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
