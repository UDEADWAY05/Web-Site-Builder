import { useAppDispatch } from './redux-hooks';
import { setUser } from 'src/store/slices/userSlice';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth,db } from 'src/firebase';
import { doc, setDoc,getDoc } from 'firebase/firestore';
import { removeUser } from 'src/store/slices/userSlice/userSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const signUp = async (email: string, password: string, name: string) => {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          name,
          email,
        });

        //sign in automatically if user is created successfully
        dispatch(setUser({ email,id:user.uid,name }))

        return await signInWithEmailAndPassword(auth, email, password);
  }}

  const signIn = async (email: string, password: string) => {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      
      if (user){
        const userDoc = await getDoc(doc(db,'users',user.uid))

        if (userDoc.exists()){
          const userData = userDoc.data()
          
          return userData
        }
      }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      dispatch(removeUser());
    } catch (error) {
      console.error(error);
    }
  };

  return { signUp, signIn, signOutUser };
};
