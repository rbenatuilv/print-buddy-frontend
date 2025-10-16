import { Typography, Paper, Skeleton } from "@mui/material";

import { useUser } from "../context/UserContext"
import { usePrint } from "../context/PrintContext";
import { usePrinter } from "../context/PrinterContext";
import { useFile } from "../context/FileContext";

import LoadingTypography from "../components/utils/LoadingTypography";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";


export default function MainPage() {
    
    const { user, isLoading, isError, lastUsername, refreshUser } = useUser();


    return ( 
        <Paper sx={{ p: 3 }}>
            <LoadingTypography variant="h5" loadingWidth={200} isLoading={isLoading || isError}>
                Welcome, {user?.name}!
            </LoadingTypography>
            <LoadingTypography variant="body1" loadingWidth={150} isLoading={isLoading || isError}>
                Current balance: €{user?.balance.toFixed(2)}
            </LoadingTypography>
        </Paper>
    )
}