import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/hooks/redux-hooks";
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "src/store/slices/userSlice/userSlice";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleLogin = (email: string, password: string) => {
        const auth = getAuth();
        
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                
                dispatch(setUser({
                    id:user.uid,
                    email:user.email
                }));

                navigate('/sites/new')
            })
            .catch(() => alert('Invalid user!'))
    }
    
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
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="password"
            />
            <button
                onClick={() => handleLogin(email, pass)}
            >
                Login
            </button>
        </div>
    )
}