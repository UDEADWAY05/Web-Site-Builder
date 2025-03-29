import { firebaseContext } from "src/contexts/firebaseContext";
import { useStrictContext } from "./useStrictContext";

export function useFirebase(){
    return useStrictContext(firebaseContext)
}