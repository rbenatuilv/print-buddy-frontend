import { useDebugValue, useEffect } from "react";
import { Typography, Paper } from "@mui/material";


import { useAuth } from "../context/AuthContext"
import { useUser } from "../context/UserContext"
import DashboardLayout from "../components/DashboardLayout";


export default function MainPage() {
    
    const { user, refreshUserInfo } = useUser();
    const { authExpired, logout } = useAuth();

    useEffect(() => {
        refreshUserInfo();
    }, [])

    return ( 
        <DashboardLayout>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5">
                    Welcome, {user?.name}!
                </Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>
                    Current balance: € {user?.balance}
                </Typography>
            </Paper>
        </DashboardLayout>
    )
}