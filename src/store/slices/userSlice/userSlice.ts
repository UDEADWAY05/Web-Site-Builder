import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from './types'
import { checkUserData } from './thunks';

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
    extraReducers:(builder) => {
        builder.addCase(checkUserData.fulfilled,(state,action) => {
            state.data = action.payload
        })
    }
});

export const { setUser,removeUser } = userSlice.actions
export default userSlice.reducer;