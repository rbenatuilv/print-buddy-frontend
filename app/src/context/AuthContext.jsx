import React, { createContext, useContext, useEffect, useState } from "react";

import api from "../services/api";
import { loginUser, registerUser } from "../api/auth";

const AuthContext = createContext(null);


export function AuthProvider({ children }) {
    const [ statusLoggedIn, setStatusLoggedIn ] = useState("loading");
    const [ authExpired, setAuthExpired ] = useState(false);

    const login = async (username, password) => {
        const response = await loginUser({ username, password });

        if (!response.success) {
            return {
                success: false,
                message: response.message
            }
        }

        localStorage.setItem("token", response.data.token);
        setStatusLoggedIn("loggedIn");

        return { success: true }
    }

    const logout = () => {
        localStorage.removeItem("token");
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

        localStorage.setItem("token", response.data.token);
        setStatusLoggedIn("loggedIn");

        return { success: true }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setStatusLoggedIn("loggedIn")
        } else {
            setStatusLoggedIn("loggedOut");
        };
    }, [])

    useEffect(() => {
        const interceptor = api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
            setAuthExpired(true);
            }
            return Promise.reject(error);
        }
        );

        return () => api.interceptors.response.eject(interceptor);
    }, []);


    return (
        <AuthContext.Provider value={{ 
            statusLoggedIn, 
            authExpired, 
            login, 
            logout, 
            register 
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}
