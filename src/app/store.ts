import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from '../features/auth/services/authSlice';
import modalReducer from '../features/modals/services/modalSlice';
import { baseApi } from "./services/baseApi";
import { persistReducer, persistStore } from "redux-persist";
import storage from "./services/storage";

const persistConfig = {
    key: 'auth',
    storage
}

const persistedAuthReducer = persistReducer(
    persistConfig,
    authReducer
)

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        modal: modalReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/PAUSE',
                    'persist/PURGE',
                    'persist/REGISTER',
                    'persist/FLUSH',
                ]
            }
            
        }).concat(baseApi.middleware)
    }
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;