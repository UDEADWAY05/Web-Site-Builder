import { FirebaseContext } from 'src/contexts/firebaseContext'
import { useStrictContext } from './useStrictContext'

export const useFirebase = () => {
  const { signIn, signUp, signOutUser, getUserById, updateUser } =
    useStrictContext(FirebaseContext)

  return { signIn, signUp, signOutUser, getUserById, updateUser }
}
