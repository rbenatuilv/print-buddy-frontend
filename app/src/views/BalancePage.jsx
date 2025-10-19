import { Box, Button, Paper, Typography } from "@mui/material";
import TransactionsTable from "../components/balanceComponents/TransactionTable";

import { useTxs } from "../context/TransactionContext";
import { useUser } from "../context/UserContext";
import LoadingTypography from "../components/utils/LoadingTypography";




export default function BalancePage() {
  const { txs, isLoading } = useTxs();
  const { user, isLoading: isLoadingUser } = useUser();

  
  return (
    <Box sx={{ p: 3 }}>
    <Paper sx={{ p: 3, mb: 3, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
        <Typography variant="h5">
            My Balance:
        </Typography>

        <LoadingTypography 
            isLoading={isLoadingUser}
            variant="h5" color="primary.main"
            loadingWidth={35}
        >
            <strong>€{user?.balance.toFixed(2)}</strong>
        </LoadingTypography>
        </Box>

        <Button variant="contained">
            Rechange
        </Button>
    </Paper>


    <Paper sx={{ p: 3, gap: 2 }}>
      <Typography variant="h5">Transaction History</Typography>

      <Typography variant="body1">
        Overview of recent balance changes.
      </Typography>

      <TransactionsTable
        transactions={txs}
        isLoading={isLoading}
      />
    </Paper>
    </Box>
  );
}