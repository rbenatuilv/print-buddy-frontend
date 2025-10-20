import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    CircularProgress,
    Stack,
    Paper,
    Typography,
    Link
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useQuery } from "@tanstack/react-query";
import { getRechargeInfo } from "../../api/transaction";



export default function MoneyInfoAccordion() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["recharge-info"],
        queryFn: getRechargeInfo,
    });

    return (
        <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">How to recharge my balance?</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {isLoading ? (
                    <CircularProgress size={24} />
                ) : isError ? (
                    <Typography color="error">
                        Could not load recharge info. Please try again later.
                    </Typography>
                ) : (
                    <Stack spacing={3}>
                        {/* BY CASH */}
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                💵 By cash
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                You can recharge your balance by paying in cash to one of the
                                following contacts:
                            </Typography>

                            <Stack spacing={1}>
                                {data.cashContacts?.map((c, idx) => (
                                    <Paper
                                        key={idx}
                                        variant="outlined"
                                        sx={{
                                            p: 1.5,
                                            borderRadius: 2,
                                            bgcolor: "background.default",
                                        }}
                                    >
                                        <Typography fontWeight="medium">{c.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Phone: {c.number}
                                        </Typography>
                                    </Paper>
                                ))}
                            </Stack>
                        </Box>

                        {/* BY BANK TRANSFER */}
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                🏦 By bank transfer
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                You can also send a bank transfer using the following account:
                            </Typography>

                            <Box sx={{ ml: 2 }}>
                                <Typography>Name: {data?.bank.name}</Typography>
                                <Typography>IBAN: {data?.bank.iban}</Typography>
                                {data?.bank.link && (
                                    <Typography>
                                        Link:{" "}
                                        <Link href={data.bank.link} target="_blank" rel="noopener noreferrer">
                                        {data.bank.link}
                                        </Link>
                                    </Typography>
                                )}
                            </Box>

                            <Typography variant="body2" sx={{ mt: 2 }}>
                                After making the transfer, please send the payment receipt to:
                            </Typography>

                            <Box sx={{ ml: 2, mt: 1 }}>
                                <Typography>Name: {data?.confirmation.name}</Typography>
                                <Typography>Number: {data?.confirmation.number}</Typography>
                            </Box>
                        </Box>
                    </Stack>
                )}
            </AccordionDetails>
        </Accordion>
                   
    );
}
