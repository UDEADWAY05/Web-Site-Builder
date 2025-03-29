import { createContext } from "react";
import { User } from "firebase/auth";
import { DocumentReference,DocumentData } from "firebase/firestore";

export interface FirebaseService {
    login(email: string, password: string): Promise<User>;
    signup(email:string,password:string,name:string): Promise<DocumentReference<DocumentData, DocumentData>>
    signOut(): Promise<void>;
    getUserProfile(userId: string): Promise<any>;
  }

export const firebaseContext = createContext<FirebaseService | null>(null)