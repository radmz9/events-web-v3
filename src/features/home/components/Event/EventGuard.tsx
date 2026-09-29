import { Navigate, Outlet } from "react-router-dom";
// import { useAppDispatch } from "../../../../app/hooks";
// import type { RootState } from "../../../../app/store";
// import { useEffect } from "react";
// import { clearEventToken } from "../../services/eventSlice";
import { isTokenExpired } from "../../helpers/isEventTokenOn";

export const EventGuard = () => {
    // const dispatch = useAppDispatch();
    // const location = useLocation();

    // const tokenInRedux = useAppSelector((state: RootState) => state.event.token);
    const tokenInSession = sessionStorage.getItem('event_token');
    // const hasToken = tokenInRedux || tokenInSession;

    if(isTokenExpired(tokenInSession)){
        sessionStorage.clear();
        return <Navigate to={'/'} replace />
    }

    return <Outlet />
}