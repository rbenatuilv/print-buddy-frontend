import { Paper, Typography, Box, Button, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import LoadingList from "../utils/LoadingList";

export default function RecentFilesCard({ files, isLoading, onViewAll }) {
    return (
        <Paper sx={{ p: 3, position: "relative", height: "100%"}}>
        <Typography variant="h6" sx={{ mb: 1 }}>
            Recent Files
        </Typography>

        <Button
            variant="text"
            size="small"
            endIcon={<InsertDriveFileIcon />}
            sx={{ position: "absolute", top: 10, right: 10 }}
            onClick={onViewAll}
        >
            View all
        </Button>

        <Box
            sx={{
            mt: 1,
            maxHeight: "calc(80vh - 200px)",
            overflowY: "auto",
            marginBottom: 1,
            }}
        >
            {isLoading ? (
                <LoadingList />
                ) : (!files || files.length === 0) ? (
                <List>
                    <ListItem>
                    <ListItemText primary="No files uploaded yet." />
                    </ListItem>
                </List>
                ) : (
                <List>
                    {files.map((f) => (
                    <ListItem key={f.id} disablePadding>
                        <ListItemIcon>
                        <InsertDriveFileIcon />
                        </ListItemIcon>

                        <ListItemText
                        primary={f.filename}
                        secondary={`Pages: ${f.pages || "-"}, Size: ${f.size_bytes ? Math.round(f.size_bytes / 1024) : "-"} KB`}
                        sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}

                        />

                    </ListItem>
                    ))}
                </List>
            )}
        </Box>
        </Paper>
    );
}