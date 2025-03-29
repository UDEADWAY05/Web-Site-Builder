import { Navigate,Outlet } from "react-router-dom";
import { useAppSelector } from "src/hooks/redux-hooks";
import { isUserLoggedIn } from "src/store/slices/userSlice/selectors";

interface IProtectedRoutesProps {
    auth?: boolean
}

export const ProtectedRoute = ({ auth = false }: IProtectedRoutesProps) => {
    const authenticated = useAppSelector(isUserLoggedIn);

    return (
        authenticated === auth ? <Outlet /> : <Navigate to={auth ? '/auth/login' : '/me'} />
    );
    
}