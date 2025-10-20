import { useState } from "react";
import { Box, Button, Paper, Typography, TextField, Stack } from "@mui/material";
import { useSnackbar } from "notistack";

import TransactionsTable from "../components/balanceComponents/TransactionTable";
import BalanceHeader from "../components/balanceComponents/BalanceHeader";
import CustomModal from "../components/utils/CustomModal";
import MoneyInfoAccordion from "../components/balanceComponents/MoneyInfoAccordeon";

import { useTxs } from "../context/TransactionContext";
import { useUser } from "../context/UserContext";

export default function BalancePage() {
    
    const { 
        txs, 
        isLoading, 
        errorRedeem,
        setErrorRedeem,
        redeemVoucherCode 
    } = useTxs();

    const { user, isLoading: isLoadingUser, isError: isErrorUser } = useUser();
    const { enqueueSnackbar } = useSnackbar();

    const [openModal, setOpenModal] = useState(false);
    const [voucherCode, setVoucherCode] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOpen = () => {
        setErrorRedeem("");
        setVoucherCode("");
        setOpenModal(true);

    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleRedeem = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await redeemVoucherCode(voucherCode);
            enqueueSnackbar("Voucher redeemed successfully 🎉", { variant: "success" });
            setOpenModal(false);
            setVoucherCode("");
        } catch {
        // Error already handled
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
        <BalanceHeader
            user={user}
            isLoading={isLoadingUser || isErrorUser}
            onClickButton={handleOpen}
        />

        <Paper>
            <MoneyInfoAccordion />
        </Paper>
        

        <Paper sx={{ p: 3, gap: 2, mt: 2 }}>
            <Typography variant="h5">Transaction History</Typography>
            <Typography variant="body1">Overview of recent balance changes.</Typography>
            <TransactionsTable transactions={txs} isLoading={isLoading} />
        </Paper>

        

        <CustomModal 
            open={openModal}
            onClose={handleClose}
            title="Redeem code"
            isForm
            content={
                <Stack spacing={2} mt={1}>
                    <Typography>
                        Please insert your code:
                    </Typography>

                    <TextField 
                        label="Voucher code"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        fullWidth
                    />

                    {errorRedeem && (
                        <Typography color="error" variant="body2">
                            { errorRedeem }
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        onClick={handleRedeem}
                        disabled={isSubmitting}
                    >
                        Confirm
                    </Button>
                </Stack>
            }
            maxWidth="xs"
        />


        </Box>
    );
}