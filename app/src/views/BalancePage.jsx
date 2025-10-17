import { Box, Container, Paper, Typography } from "@mui/material";
import { useUser } from "../context/UserContext";



export default function BalancePage() {

    const { user, isLoading } = useUser();

    return (
        <Box>
            <Paper sx={{ p: 3 }}>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                <Typography variant="h5">
                    Current Balance:
                </Typography>
                <Typography color="primary" variant="h5" sx={{ fontWeight: "bold" }}>
                    €{ user?.balance.toFixed(2) }
                </Typography>
                </Box>
            </Paper>
        </Box>
    )
}