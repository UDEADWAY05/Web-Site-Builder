import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice/userSlice'
import siteReducer from './slices/siteSlice/siteSlice'

import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { projectReducer } from './slices/projectSlice'

const rootReducer = combineReducers({
    user: userReducer,
    site: siteReducer,
    project: projectReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({}).concat([])
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
