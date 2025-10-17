import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";


const COMPLETED_STATUS = [
    "completed"
]

const ERROR_STATUS = [
    "aborted", "cancelled"
]

export function renderStatusIcon(status) {
    if (COMPLETED_STATUS.includes(status)) {
        return <CheckIcon color="success" />;
    }
    if (ERROR_STATUS.includes(status)) {
        return <CloseIcon color="error" />;
    }

    return <HourglassBottomIcon color="action" />;
};