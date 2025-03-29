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
    reducers: {},
    extraReducers(builder){
        builder.addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
            state.data = action.payload;
            state.isLoggedIn = true 
        }),
        builder.addCase(signout.fulfilled,(state) => {
            state.data = initialState.data
            state.isLoggedIn = false
        })
    }
});

export default userSlice.reducer;