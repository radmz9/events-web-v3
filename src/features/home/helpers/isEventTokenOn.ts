import { jwtDecode } from "jwt-decode";

interface EventTokenPayload {
    event: number;
    exp: number;
    iat: number;
}

export const isTokenExpired = (token: string): boolean => {
    try {
            const decoded = jwtDecode<EventTokenPayload>(token);
    
            return decoded.exp * 1000 < Date.now();
    } catch {
        return true;
    }
}