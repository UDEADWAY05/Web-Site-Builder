import { Navigate, useParams } from 'react-router-dom';
import { AuthForm } from 'src/components/ui/auth/AuthForm';
import { signInWithEmailAndPassword,createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

const authRouteOptions = [ 'login','signup']

export const AuthPage = () => {
    const { type } = useParams();

    //if route is different from login or signup
    if (!type || !authRouteOptions.includes(type)){
        return <Navigate to='/*' /> 
    }
  
    const auth = getAuth()
    const handleLogin = (email:string,password:string) => signInWithEmailAndPassword(auth,email,password)
    const handleSignup = (email:string,password:string) => createUserWithEmailAndPassword(auth,email,password)
    
    const isRegister = type !== 'login'

    return (<div className='flex justify-center'>
          <AuthForm isRegister={isRegister} handleFormSubmit={isRegister ? handleSignup : handleLogin}/>
        </div> 
  )};