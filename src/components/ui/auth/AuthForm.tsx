import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/hooks/redux-hooks";
import { getAuth } from "firebase/auth";
import { type UserCredential,Auth } from "firebase/auth";
import { setUser } from "src/store/slices/userSlice";
import { Button } from "../button";

interface AuthFormProps {
    handleAuth:(auth:Auth,email: string, password: string) => Promise<UserCredential>
}

export const AuthForm = ({ handleAuth }:AuthFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');

    const auth = getAuth()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    return (
        <div>
            <h1>Login page</h1>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPass(e.target.value)}
                placeholder="password"
            />
            <Button
                onClick={() => handleAuth(auth,email, password)
                    .then(({user}) => {
                        dispatch(setUser({
                            id:user.uid,
                            email:user.email
                        }));
        
                        navigate('/sites/new')
                    })
                    .catch(console.error)
                }>
                Submit
            </Button>
        </div>
    )
}