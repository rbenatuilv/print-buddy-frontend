import { Paper, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PrintIcon from '@mui/icons-material/Print';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import LoadingTypography from "../utils/LoadingTypography";

export default function MainHeader({ user, isLoading, isError }) {
    const navigate = useNavigate();

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
                <Box>
                    <LoadingTypography
                        variant="h5"
                        loadingWidth={200}
                        isLoading={isLoading || isError}
                    >
                        Welcome, {user?.name}!
                    </LoadingTypography>

                    <LoadingTypography
                        variant="body1"
                        loadingWidth={150}
                        isLoading={isLoading || isError}
                    >
                        Current balance: €{user?.balance?.toFixed(2)}
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
                        startIcon={<PrintIcon />}
                        onClick={() => navigate("/print")}
                    >
                        Print
                    </Button>
                    <Button 
                        variant="outlined" 
                        color="secondary"
                        startIcon={<AttachMoneyIcon />}
                        onClick={() => navigate("/balance")}
                    >
                        Add credit
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}