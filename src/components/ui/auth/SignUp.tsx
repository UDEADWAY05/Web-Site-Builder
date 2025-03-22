import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/hooks/redux-hooks";
import { getAuth,createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from "src/store/slices/userSlice/userSlice";

export const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleRegister = (email: string, password: string) => {
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                }));
                
                navigate('/sites/new')
            })
            .catch(console.error)
    }
    
    return (
        <div>
            <h1>Signup page</h1>
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
            <button
                onClick={() => handleRegister(email, password)}
            >
                Signup
            </button>
        </div>
    )
}