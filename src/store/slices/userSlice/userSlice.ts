import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from './types'
import { login,signout } from './thunks';

const initialState:UserState = {
    error:null,
    data:null,
    isLoggedIn:false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser:(state,action:PayloadAction<User>) => {
            state.data = action.payload
            state.isLoggedIn = true
        },
        removeUser:(state) => {
            state.data = null
            state.isLoggedIn = false
        } 
    },
    // extraReducers(builder){
    //     builder.addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
    //         console.log('login fulfilled')
    //         state.data = action.payload;
    //         state.isLoggedIn = true 
    //     }),
    //     builder.addCase(login.rejected,(state,action:PayloadAction<string>) => {
    //         console.log('login rejected,paload: ',action.payload)
    //         state.isLoggedIn = false
    //         state.error = action.payload
    //         state.data = null
    //     }),
    //     builder.addCase(signout.fulfilled,(state) => {
    //         state.data = initialState.data
    //         state.isLoggedIn = false
    //     })
    // }
});
export const { setUser,removeUser } = userSlice.actions

export default userSlice.reducer;