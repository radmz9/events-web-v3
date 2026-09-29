import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { type UserRoles } from "../../enum/user_role.enum";

interface ProtectedRouteProps {
    allowedRoles?: UserRoles[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const location = useLocation();

    const { isAuth, role } = useAppSelector(state => state.auth);

    if(!isAuth || role === null) {
        return <Navigate to={'/login'} state={{ from: location }} replace />
    }

    if(allowedRoles && !allowedRoles.includes(role)){
        return <Navigate to={"/perfil"} replace />
    }

    return <Outlet />
}