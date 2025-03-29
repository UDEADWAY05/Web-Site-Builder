import { FirebaseApp } from "firebase/app";
import { Auth,signInWithEmailAndPassword,signOut,getAuth } from "firebase/auth";
import { Firestore,collection,addDoc,getDoc,doc } from "firebase/firestore";
import { FirebaseService } from "src/contexts/firebaseContext";

export class FirebaseApiService implements FirebaseService {
    public auth:Auth
    public db:Firestore

    constructor(app:FirebaseApp,db:Firestore){
        this.auth = getAuth(app)
        this.db = db
    }

    async login(email:string,password:string){
        const userCredential = await signInWithEmailAndPassword(this.auth,email,password)

        return userCredential.user
    }

    async signOut(): Promise<void> {
        await signOut(this.auth);
    }

    async signup(email:string,password:string,name:string){
        const userCredentials = await addDoc(collection(this.db,'users'),{name,email,password})
        return userCredentials
    }

    async getUserProfile(id:string){
        const docRef = doc(this.db,'users',id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
          } else {
            console.error("User with provided credentials doesn't exist!");
            return null;
          }
    }
}