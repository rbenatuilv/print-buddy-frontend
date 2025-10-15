import { Typography, Paper, Skeleton } from "@mui/material";

import { useUser } from "../context/UserContext"
import LoadingTypography from "../components/LoadingTypography";



export default function MainPage() {
    
    const { user, isLoading, isError, lastUsername } = useUser();

    return ( 
        <Paper sx={{ p: 3 }}>
            <LoadingTypography variant="h5" loadingWidth={200} isLoading={isLoading || isError}>
                Welcome, {user?.name}!
            </LoadingTypography>
            <LoadingTypography variant="body1" loadingWidth={150} isLoading={isLoading || isError}>
                Current balance: €{user?.balance}
            </LoadingTypography>
        </Paper>
    )
}