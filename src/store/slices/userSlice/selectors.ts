import { RootState } from "src/store/store";

export const isUserAuthenticated = (state:RootState) => state.user.id !== null