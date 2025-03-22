import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice/userSlice'

const rootReducer = combineReducers({
    user:userReducer
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat([])
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>