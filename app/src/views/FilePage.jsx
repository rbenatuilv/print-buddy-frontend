import { Paper, Typography, Button, Box, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from '@mui/icons-material/Delete';

import { usePrint } from "../context/PrintContext";
import { useFile } from "../context/FileContext";
import LoadingList from "../components/utils/LoadingList";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";



export default function FilePage() {

    const { 
        files, isLoading, deleteFileFromWeb, 
        refreshFiles, setSelectedIds: setGlobalIds
    } = useFile();

    const { enqueueSnackbar } = useSnackbar();
    const { setActivePrintStep } = usePrint();
    const navigate = useNavigate();

    const [ selectedIds, setSelectedIds ] = useState([]);
    
    const toggleFile = (id) => {
        setSelectedIds(prev => {
            const next = prev.includes(id)
                ? prev.filter(x => x !== id)
                : [...prev, id];
            return next;
        });
    };

    const handleDeleteFile = async (fileId, filename) => {
        try {
            const success = await deleteFileFromWeb(fileId);
            enqueueSnackbar(`File ${filename} deleted.`, { variant: "success" })
        } catch {
            enqueueSnackbar(`Error while deleting ${filename}.`, { variant: "error" })
        }
    }

    const handleDelete = async () => {
        const selectedFiles = files?.filter(f => selectedIds.includes(f.id)) || []

        for (let i = 0; i < selectedFiles.length; i++) {
            const id = selectedFiles[i].id;
            const name = selectedFiles[i].filename;
            await handleDeleteFile(id, name);
        }

        await refreshFiles();
        setSelectedIds([])
    }

    const handlePrint = () => {
        setGlobalIds(selectedIds);
        setActivePrintStep(1);
        setSelectedIds([])
        navigate("/print")
    }

    return (
        <Paper sx={{ p: 3, gap: 2 }}>
            <Typography variant="h5">
                My files
            </Typography>

            <Typography variant="body1">
                Recent uploaded files
            </Typography>

            <Box
                sx={{
                    mt: 1,
                    maxHeight: "calc(80vh - 200px)",
                    overflowY: "auto",
                    marginBottom: 2
                }}
            >
                {isLoading ? (
                    <LoadingList />
                ) : (
                    <List>
                        {files?.map(f => (
                            <ListItem ky={f.id} disablePadding>
                                <ListItemButton
                                    selected={selectedIds.includes(f.id)}
                                    onClick={() => toggleFile(f.id)}
                                >
                                    <ListItemIcon>
                                        <InsertDriveFileIcon />
                                    </ListItemIcon>

                                    <ListItemText 
                                        primary={f.filename}
                                        secondary={`Pages: ${f.pages}, Size: ${Math.round(f.size_bytes / 1024)} KB`}
                                    />

                                    {selectedIds.includes(f.id) && (
                                        <CheckCircleIcon 
                                            color="primary" 
                                            sx={{ position: "absolute", right: 30 }} 
                                        />
                                    )}
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 5 }}>
                <Button 
                    variant="contained" 
                    color="error"
                    disabled={selectedIds.length == 0}
                    startIcon={<DeleteIcon />}
                    onClick={handleDelete}
                >
                    Delete
                </Button>

                <Button 
                    variant="contained" 
                    disabled={selectedIds.length == 0}
                    startIcon={<PrintIcon />}
                    onClick={handlePrint}
                >
                    Print
                </Button>
            </Box>
        </Paper>
    )
}