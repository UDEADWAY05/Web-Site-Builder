import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, UserState } from './types'
import { checkUserData } from './thunks'
import { localStorageService } from 'src/services/localstorage.service'

const userId = localStorageService.getUserId()
const hasValidAuth = localStorageService.getAccessToken() && userId !== null

const initialState: UserState = hasValidAuth
  ? {
      data: null,
      auth: { userId },
      isLoading: true,
      error: null,
      isLoggedIn: true,
    }
  : {
      data: null,
      auth: null,
      isLoading: false,
      error: null,
      isLoggedIn: false,
    }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload
      state.isLoggedIn = true
      state.isLoading = false
    },
    loggedOutUser: (state) => {
      state.data = null
      state.isLoggedIn = false
      state.auth = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserData.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(checkUserData.fulfilled, (state, action) => {
        state.data = action.payload
        state.isLoggedIn = true
      })
      .addCase(checkUserData.rejected, (state, { error }) => {
        state.isLoading = false
        state.isLoggedIn = false
        state.error = error.message || 'Failed to load user data'
      })
  },
})

export const { setUser, loggedOutUser } = userSlice.actions
export default userSlice.reducer
