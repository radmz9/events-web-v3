import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type UserRoles } from "../../../common/enum/user_role.enum";

export interface AuthSlice {
    isAuth: boolean | false;
    user: string | null;
    username: string | null;
    role: UserRoles | null;
    idArea: number | null;
    token: string | null;
}

const initialState: AuthSlice = {
    isAuth: false,
    user: null,
    username: null,
    role: null,
    idArea: null,
    token: null //localStorage.getItem('token') || null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthSlice>) => {
            state.isAuth = true;
            state.user = action.payload.user;
            state.username = action.payload.username;
            state.role = action.payload.role;
            state.idArea = action.payload.idArea;
            state.token = action.payload.token;
            // localStorage.setItem('token', action.payload.token || '');
        },
        logout: () => {
            return initialState;
        }
    }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;