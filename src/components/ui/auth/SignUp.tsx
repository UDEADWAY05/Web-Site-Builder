import { getAuth,createUserWithEmailAndPassword } from "firebase/auth";
import { EmailPasswordForm } from "./EmailPasswordForm";

export const SignUp = () => {
    const auth = getAuth()
    const handleFormSubmit = (email:string,password:string) => createUserWithEmailAndPassword(auth,email,password)
    
    return (
        <>
            <h1>Signup form</h1>
             <EmailPasswordForm handleFormSubmit={handleFormSubmit} />
        </>
    )
}