import { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getMe } from "../api/user";


const UserContext = createContext(null);


export function UserProvider({ children }) {

    const [ lastUsername, setLastUsername ] = useState(() => 
        sessionStorage.getItem("lastUsername") || ""
    )

    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['user'],
        queryFn: getMe,
        staleTime: 1000 * 60 * 5,
        retry: false
    })

    const refreshUser = async () => await queryClient.invalidateQueries(['user']);
    const resetUser = () => queryClient.removeQueries(['user'])
    
    const {data: user, isError, isLoading} = query

    useEffect(() => {
        if (user?.username) {
            sessionStorage.setItem("lastUsername", user.username);
            setLastUsername(user.username);
        }
    }, [user])

    return (
        <UserContext.Provider value={{
            user, refreshUser, resetUser, isError, isLoading, lastUsername
        }}>
            { children }
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext);
}