import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import { EmailPasswordForm } from "./EmailPasswordForm";

export const Login = () => {
    const auth = getAuth()
    const handleFormSubmit = (email:string,password:string) => signInWithEmailAndPassword(auth,email,password)
    
    return (
        <>
            <h1>Login form</h1>
            <EmailPasswordForm handleFormSubmit={handleFormSubmit}/>
        </>
    )
}