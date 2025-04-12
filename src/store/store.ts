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
import layoutSiteReducer from './slices/layoutSite/layoutSiteSlice'

import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { siteReducer } from './slices/siteSlice'

const rootReducer = combineReducers({
    user: userReducer,
    layoutSite: layoutSiteReducer,
    site: siteReducer
})

const persistedReducer = persistReducer(
    { key: 'redux', storage: storage },
    rootReducer
)

export const store = configureStore({
    reducer: persistedReducer,
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
window.persistor = persistor

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
