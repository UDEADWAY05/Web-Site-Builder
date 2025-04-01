import { UserCredential } from "firebase/auth";
import { createContext } from "react";
import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";

export interface FirebaseApi {
    signUp:(email:string, password:string, name:string, surname:string) => Promise<UserCredential>
    signIn:(email:string, password:string) => Promise<User>
    getUserById:(id:string) => Promise<DocumentData | undefined>
    signOutUser:() => Promise<void>
    updateUser:(id:string, name:string, surname:string) => Promise<void> 
}

export const firebaseContext = createContext<FirebaseApi | null>(null)