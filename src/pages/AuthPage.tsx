import { Navigate, useParams } from 'react-router-dom';
import { Login } from 'src/components/ui/auth/Login';
import { SignUp } from 'src/components/ui/auth/Signup';

const authRouteOptions = [ 'login','signup']

export const AuthPage = () => {
    const { type } = useParams();

    //if route is different from login or signup
    if (!type || !authRouteOptions.includes(type)){
        return <Navigate to='/*' /> 
    }

    const isRegister = type !== 'login'

    return (<div className='flex justify-center'>
          {isRegister ? <SignUp/> : <Login />}
        </div> 
  )};