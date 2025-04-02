import { firebaseContext } from "src/contexts/firebaseContext";
import { useStrictContext } from "./useStrictContext";

export const useFirebase = () => {
    const { signIn,signUp,signOutUser,getUserById,updateUser } = useStrictContext(firebaseContext);

    return { signIn, signUp, signOutUser,getUserById,updateUser };
  };