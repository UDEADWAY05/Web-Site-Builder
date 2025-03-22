import { ReactElement } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Login } from 'src/components/ui/auth/Login';
import { SignUp } from 'src/components/ui/auth/SignUp';

const componentMap:{[key:string]:ReactElement} = {
    'login' : <Login />,
    'signup': <SignUp />
}

export const AuthPage = () => {
    const { type } = useParams();
  
    //redirect to '/' in case type is not login or signup or missing
    if (!type || !Object.keys(componentMap).includes(type))  {
        return <Navigate to={'/'} />
    }
    
    return componentMap[type]  
  };