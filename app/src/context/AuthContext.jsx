import React, { createContext, useContext, useEffect, useState } from "react";

import { loginUser, registerUser } from "../api/auth";

const AuthContext = createContext(null);


export function AuthProvider({ children }) {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    
    const login = async (username, password) => {
        const response = await loginUser({ username, password });

        if (!response.success) {
            return {
                success: false,
                message: response.message
            }
        }

        localStorage.setItem("token", response.data.token);
        setIsLoggedIn(true);

        return { success: true }
    }

    const logout = () => {
        setIsLoggedIn(false);
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

        localStorage.setItem("token", response.data.token);
        setIsLoggedIn(true);

        return { success: true }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) setIsLoggedIn(true);
    }, [])

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, register }}>
            { children }
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}
