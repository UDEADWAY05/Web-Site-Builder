import { getAuth,createUserWithEmailAndPassword } from "firebase/auth";
import { EmailPasswordForm } from "./EmailPasswordForm";

export const SignUp = () => {
    const auth = getAuth()
    const handleFormSubmit = (email:string,password:string) => createUserWithEmailAndPassword(auth,email,password)
    
    return (
        <main className="flex justify-center items-center">
             <EmailPasswordForm handleFormSubmit={handleFormSubmit} />
        </main>
    )
}