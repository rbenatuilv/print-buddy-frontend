import { Paper, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

import { usePrint } from "../context/PrintContext"

import HistoryTable from "../components/historyJobComponents/HistoryTable";


const COMPLETED_STATUS = [
    "completed"
]

const ERROR_STATUS = [
    "aborted", "cancelled"
]


export default function HistoryPage() {
    const { jobs, isLoading } = usePrint();

    const renderStatusIcon = (status) => {
        if (COMPLETED_STATUS.includes(status)) {
            return <CheckIcon color="success" />;
        }
        if (ERROR_STATUS.includes(status)) {
            return <CloseIcon color="error" />;
        }

        return <HourglassBottomIcon color="action" />;
    };


    return (
        <Paper sx={{ p: 3, gap: 2 }}>
            <Typography variant="h5">
                Print History
            </Typography>

            <Typography variant="body1">
                Last print jobs sent and their status.
            </Typography>

            <HistoryTable
                jobs={jobs}
                isLoading={isLoading}
                renderStatusIcon={renderStatusIcon}
            />
        </Paper>
    )
}