import { FirebaseApp } from "firebase/app";
import { Auth,signInWithEmailAndPassword,signOut,getAuth } from "firebase/auth";
import { Firestore,collection,addDoc,getDoc,doc } from "firebase/firestore";
import { FirebaseService } from "src/contexts/firebaseContext";

export class FirebaseApiService implements FirebaseService {
    public auth:Auth
    public db:Firestore

    constructor(app:FirebaseApp,db:Firestore){
        console.log(app)
        this.auth = getAuth(app)
        this.db = db
        console.log(this.auth)
    }

    async login(email:string,password:string){
        console.log(this.auth,email,password)
        const userCredential = await signInWithEmailAndPassword(this.auth,email,password)

        return userCredential.user
    }

    async signOut(): Promise<void> {
        await signOut(this.auth);
    }

    async signup(email:string,password:string,name:string){
        console.log('in signup')
        const userCredentials = await addDoc(collection(this.db,'users'),{name,email,password})
        console.log('uc',userCredentials)
        return userCredentials
    }

    async getUserProfile(id:string){
        const docRef = doc(this.db,'users',id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            console.log(docSnap)
            return { id: docSnap.id, ...docSnap.data() };
          } else {
            console.error("User with provided credentials doesn't exist!");
            return null;
          }
    }
}