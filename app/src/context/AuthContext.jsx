import { createContext, useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { loginUser, registerUser, resetPwd, requestPwdReset } from "../api/auth";
import { setAuthExpiredCallback } from "../services/api";


const AuthContext = createContext(null);


export function AuthProvider({ children }) {
    const [ statusLoggedIn, setStatusLoggedIn ] = useState("loading");
    const [ authExpired, setAuthExpired ] = useState(false);

    const queryClient = useQueryClient();

    const login = async (username, password) => {
        const response = await loginUser({ username, password });

        if (!response.success) {
            return {
                success: false,
                message: response.message
            }
        }

        sessionStorage.setItem("token", response.data.token);
        await queryClient.invalidateQueries();

        setStatusLoggedIn("loggedIn");
        setAuthExpired(false);

        return { success: true }
    }

    const logout = async () => {
        sessionStorage.removeItem("token");
        setStatusLoggedIn("loggedOut");
    }

    const register = async ({
        username, email, name, surname, password
    }) => {
        const response = await registerUser(
            { username, email, name, surname, password }
        )

        if (!response.success) {
            return {
                success: false,
                message: response.message
            }
        }

        const responseLogin = await login(username, password);

        if (!responseLogin.success) {
            return {
                success: false,
                message: responseLogin.message
            }
        }

        return { success: true };
    };

    const resetPassword = async (token, newPassword) => {
        const response = await resetPwd({ token, newPassword });

        if (!response.success) {
            return {
                success: false,
                message: response.message
            }
        }

        return { success: true };
    };

    const requestPasswordReset = async (email) => {
        const response = await requestPwdReset({ email });
        
        if (!response.success) {
            return {
                success: false,
                message: response.message
            }
        }

        return { success: true };
    };


    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        if (storedToken) {
            setStatusLoggedIn("loggedIn")
        } else {
            setStatusLoggedIn("loggedOut");
        };
    }, [])

    useEffect(() => {
        setAuthExpiredCallback(() => setAuthExpired(true));
        return () => setAuthExpiredCallback(null);
    }, []);

    return (
        <AuthContext.Provider value={{ 
            statusLoggedIn, 
            authExpired, 
            login, 
            logout, 
            register,
            resetPassword,
            requestPasswordReset
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}
