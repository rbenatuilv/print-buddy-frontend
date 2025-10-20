import { Paper, Button, Box, Typography } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import LoadingTypography from "../utils/LoadingTypography";

export default function BalanceHeader({ user, isLoading, onClickButton }) {

    return (
        <Paper sx={{ p: 3, mb: 3 }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" }, 
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                }}
            >

                <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                    <Typography variant="h5">
                        My Balance:
                    </Typography>

                    <LoadingTypography 
                        isLoading={isLoading}
                        variant="h5" color="primary.main"
                        loadingWidth={35}
                    >
                        <strong>€{user?.balance.toFixed(2)}</strong>
                    </LoadingTypography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row", 
                        gap: 1,
                        mt: { xs: 2, sm: 0 }, 
                    }}
                >
                    <Button 
                        variant="contained" 
                        color="primary"
                        startIcon={<AttachMoneyIcon />}
                        onClick={onClickButton}
                    >
                        Redeem code
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}