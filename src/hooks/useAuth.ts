import { useAppDispatch } from './redux-hooks';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth,db } from 'src/firebase';
import { doc, setDoc,getDoc } from 'firebase/firestore';
import { removeUser } from 'src/store/slices/userSlice/userSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const signUp = async (email: string, password: string, name: string,surname:string) => {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        console.log(user)
        await setDoc(doc(db, 'users', user.uid), {
          name,
          email,
          surname
        });

        return await signInWithEmailAndPassword(auth, email, password);
  }}

  const signIn = async (email: string, password: string) => {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log('user in sign in',user)
      

      if (!user){
        throw new Error('Не удалось авторизоваться')
      }
      
      const userDoc = await getDoc(doc(db,'users',user.uid))

      if (userDoc.exists()){
        
        const userData = userDoc.data()
        console.log(userData)
        // dispatch(setUser({id:user.uid,email:userData.email,name:userData.name}))
        return {userId:user.uid,email:userData.email,name:userData.name,surname:userData.surname}
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

  const getUserById = async (id:string) => {
    const userDoc = await getDoc(doc(db,'users',id))

    const user = userDoc.data()
    console.log(user)
    return user
  }

  return { signUp, signIn, signOutUser,getUserById };
};
