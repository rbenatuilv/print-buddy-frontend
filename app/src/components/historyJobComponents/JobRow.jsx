import { TableRow, TableCell, Box } from "@mui/material";


export default function JobRow({ job, isMobile, renderStatusIcon, onClick }) {
    return (
        <TableRow
        hover
        onClick={onClick}
        sx={{
            cursor: isMobile ? "pointer" : "default",
            "&:hover": {
            backgroundColor: isMobile ? "action.hover" : "transparent",
            },
        }}
        >
        {isMobile ? (
            <>
            <TableCell width={50}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {renderStatusIcon(job.status)}
                </Box>
            </TableCell>
            <TableCell sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "15vw" }}>
                {job.file_name || "—"}
            </TableCell>
            <TableCell>
                {job.completed_at
                ? new Date(job.completed_at).toLocaleString()
                : "—"}
            </TableCell>
            </>
        ) : (
            <>
            <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {renderStatusIcon(job.status)}
                </Box>
            </TableCell>
            <TableCell sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "10vw" }}>
                {job.file_name || "—"}
            </TableCell>
            <TableCell>{job.printer_name || "—"}</TableCell>
            <TableCell>{job.status.toUpperCase() || "—"}</TableCell>
            <TableCell>
                {job.created_at
                ? new Date(job.created_at).toLocaleString()
                : "—"}
            </TableCell>
            <TableCell>
                {job.completed_at
                ? new Date(job.completed_at).toLocaleString()
                : "—"}
            </TableCell>
            </>
        )}
        </TableRow>
    );
}