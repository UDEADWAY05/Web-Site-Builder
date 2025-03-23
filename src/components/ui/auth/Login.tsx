import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import { EmailPasswordForm } from "./EmailPasswordForm";

export const Login = () => {
    const auth = getAuth()
    const handleFormSubmit = (email:string,password:string) => signInWithEmailAndPassword(auth,email,password)
    
    return (
        <main className="flex justify-center items-center">
             <EmailPasswordForm handleFormSubmit={handleFormSubmit} />
        </main>
    )
}