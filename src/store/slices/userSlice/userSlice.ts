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
<<<<<<< HEAD
        setUser:(state,action:PayloadAction<User>) => {
=======
        setUser:(state,action:PayloadAction<User>)=> {
>>>>>>> e2d4ac2 (fix:обновлен_стор_для_страницы_профиля.Верстка)
            state.data = action.payload
            state.isLoggedIn = true
        },
        removeUser:(state) => {
            state.data = null
            state.isLoggedIn = false
<<<<<<< HEAD
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
=======
        }
    },
>>>>>>> e2d4ac2 (fix:обновлен_стор_для_страницы_профиля.Верстка)
});
export const { setUser,removeUser } = userSlice.actions

export const { setUser,removeUser } = userSlice.actions
export default userSlice.reducer;