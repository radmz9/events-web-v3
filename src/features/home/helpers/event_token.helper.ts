import { isTokenExpired } from "./isEventTokenOn";

export const getEventToken = (): string | null => {
    const token = sessionStorage.getItem('event_token');

    if(!token) return null;

    if(isTokenExpired(token)){
        sessionStorage.removeItem('event_token');
        return null;
    }

    return token;
}