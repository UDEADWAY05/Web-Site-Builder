import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { User } from './types'

const initialState:User = {
    email: null,
    id: null,
    isLoggedIn:false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action:PayloadAction<User>) {
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.isLoggedIn = true
        },
        removeUser(state) {
            state.email = null;
            state.id = null;
            state.isLoggedIn = false
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;