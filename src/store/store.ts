import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice/userSlice'
import siteReducer from './slices/siteSlice/siteSlice'

import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { siteReducer } from './slices/siteSlice'

const rootReducer = combineReducers({
    user: userReducer,
    layoutSite: layoutSiteReducer,
    site: siteReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({}).concat([])
    },
})

// //only for dev mode,for convenience
// window.persistor = persistor

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
