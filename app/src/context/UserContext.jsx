import { createContext, useContext, useEffect, useState } from "react";

import { getMe } from "../api/user";


const UserContext = createContext(null);


export function UserProvider({ children }) {
    const [ user, setUser ] = useState(null);

    const refreshUserInfo = async () => {
        const response = await getMe();

        if (!response.success) {
            return {
                success: false,
                message: response.message
            }
        }

        setUser(response.data);
    }

    const resetUser = () => {
        setUser(null);
    }

    return (
        <UserContext.Provider value={{
            user, refreshUserInfo, resetUser
        }}>
            { children }
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext);
}