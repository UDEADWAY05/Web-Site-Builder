import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from './types'

const initialState:UserState = {
    error:null,
    data:null,
    isLoggedIn:false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser:(state,action:PayloadAction<User>)=> {
            state.data = action.payload
            state.isLoggedIn = true
        },
        removeUser:(state) => {
            state.data = null
            state.isLoggedIn = false
        }
    },
});

export const { setUser,removeUser } = userSlice.actions
export default userSlice.reducer;