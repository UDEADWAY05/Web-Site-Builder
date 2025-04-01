import { Auth, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,updateEmail } from "firebase/auth";
import { getDoc,setDoc,updateDoc,doc } from "firebase/firestore";
import { FirebaseApi } from "src/contexts/firebaseContext";

class FirebaseService implements FirebaseApi {
    constructor(public auth:Auth, public db:Firestore) {

      this.auth = auth;
      this.db = db;
      this.signIn = this.signIn.bind(this);
      this.signUp = this.signUp.bind(this);
      this.signOutUser = this.signOutUser.bind(this);
      this.getUserById = this.getUserById.bind(this)
      this.updateUser = this.updateUser.bind(this)
    }
  
    async signUp(email:string, password:string, name:string, surname:string) {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user
    
      console.log('is signUp',user)
    
      await setDoc(doc(this.db, 'users', user.uid), { name, surname, email });
      console.log(userCredential)
      return userCredential;
    }
  
    async signIn(email:string, password:string) {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user
      
      console.log(user)
      return user
    }
  
    async getUserById(id:string){
      const userDoc = await getDoc(doc(this.db,'users',id))
      
      if (userDoc.exists()){  
        const userData = userDoc.data()
        console.log(userData)
        return userData 
      }
    }

    async updateUser(id: string, name: string, surname: string): Promise<void> {
      const userRef = doc(this.db, 'users', id);

      if (!this.auth.currentUser){
        throw new Error('Current user is not defined')
      }
      return await updateDoc(userRef, { name,surname });
    }

    async signOutUser(){
      return await signOut(this.auth);
    }
}

export { FirebaseService }