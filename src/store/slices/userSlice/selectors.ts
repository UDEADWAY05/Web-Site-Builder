import { RootState } from "src/store/store";

export const isUserAuthenticated = (state:RootState) => state.user.isLoggedIn
export const selectUserEmail = (state:RootState) => state.user.email