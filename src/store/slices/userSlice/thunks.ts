import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut,updateProfile } from "firebase/auth";
import { doc,getDoc,setDoc,getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const login = createAsyncThunk(
    'auth/login',
    async ({ email,password }:{ email:string,password:string },thunkApi) => {
      try {
        const auth = getAuth()
        const db = getFirestore()
        const { user } = await signInWithEmailAndPassword(auth,email,password)

        if (!user.uid) {
          throw new Error("User UID is undefined.");
        }
        
        const userDoc = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDoc);

        if (userSnap.exists()) {
          const userData = userSnap.data();
            
          return {id:user.uid,email:user.email,name:userData.name}
        }
      }
      catch (e) {
          console.error(e) 
      }}   
)

export const signup = createAsyncThunk(
    'auth/signup',
    async ({ email,password,name }:{ email:string,password:string,name:string },thunkApi) => {
      try {
        const auth = getAuth()
        const db = getFirestore()

        const { user } = await createUserWithEmailAndPassword(auth,email,password)
        
        if (!user.uid) {
          throw new Error("User UID is undefined.");
        }
  
        await updateProfile(user, { displayName: name });
        const userCredential = await setDoc(doc(db,'users',user.uid),{name,email },{merge:true})
        
        thunkApi.dispatch(login({ email,password }))
      
        return userCredential
      }
      catch (e) {
          console.error(e) 
      }}   
)

export const signout = createAsyncThunk(
    'auth/signout',
    async () => {
        const auth = getAuth()
        await signOut(auth)
    }
)