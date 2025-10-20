import { Box, Typography } from "@mui/material";
import CustomModal from "../utils/CustomModal";


export default function JobDetailsModal({ job, onClose }) {
    if (!job) return null;

    return (
        <CustomModal
        open={!!job}
        onClose={onClose}
        title={job.file_name || "Job details"}
        content={
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography>
                <strong>Printer:</strong> {job.printer_name || "—"}
            </Typography>
            <Typography>
                <strong>Status:</strong> {job.status.toUpperCase() || "—"}
            </Typography>
            <Typography>
                <strong>Created at:</strong>{" "}
                {job.created_at
                ? new Date(job.created_at).toLocaleString()
                : "—"}
            </Typography>
            <Typography>
                <strong>Completed at:</strong>{" "}
                {job.completed_at
                ? new Date(job.completed_at).toLocaleString()
                : "—"}
            </Typography>
            </Box>
        }
        />
    );
}