import { RootState } from "src/store/store";

export const isUserLoggedIn = (state:RootState) => state.user.isLoggedIn
export const selectUserEmail = (state:RootState) => state.user.data?.email
export const selectUserData = (state:RootState) => state.user.data
export const selectUserId = (state:RootState) => state.user.data?.id