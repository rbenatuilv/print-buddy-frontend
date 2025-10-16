import { useState } from 'react';
import { Box, Button, List, ListItem, ListItemText, ListItemButton, Stack, Typography, ListItemIcon } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useFile } from '../../../context/FileContext'
import LoadingList from '../../utils/LoadingList';



export default function StepUpload({ onNext }) {
    const { 
        files, isLoading, selectedIds,
        toggleFile, uploadLocalFile 
    } = useFile();

    const [ isFetching, setIsFetching ] = useState(false);

    const handleUpload = async (e) => {
        const fileList = e.target.files;
        setIsFetching(true)

        if (!fileList) {
            setIsFetching(false)
            return
        };

        for (let i = 0; i < fileList.length; i++) {
            await uploadLocalFile(fileList[i]);
        }

        setIsFetching(false)
    }

    const handleNext = () => {
        if (selectedIds.length == 0) return ;
        onNext?.();
    }


    return (
        <Box sx={{ width: "100%" }}>
            <Stack 
                direction="row" 
                justifyContent="space-between" 
                alignItems="center" 
                sx={{
                    mb: 2
                }}
            >
                <Typography variant="h6">
                    Select Files {selectedIds.length > 0 && `(${selectedIds.length})`}
                </Typography>
                <Button 
                    variant="contained"
                    startIcon={<UploadFileIcon />}
                    component="label"
                >
                    Upload
                    <input 
                        hidden
                        type="file"
                        multiple
                        onChange={handleUpload}
                    />
                </Button>
            </Stack>
            
            <Box
                sx={{
                    maxHeight: "calc(80vh - 250px)",
                    overflowY: "auto",
                    marginBottom: 2
                }}
            >
            {(isLoading || isFetching) ? (
                <LoadingList /> 
            ) : (!files || files?.length == 0) ? (
                <List>
                    <ListItem>
                        <ListItemText primary="No files uploaded yet." secondary="Use the Upload button to add files." />
                    </ListItem>
                </List>
            ) : (
                <List>
                    {files?.map(f => (
                        <ListItem key={f.id} disablePadding>
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

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button 
                    variant="contained" 
                    onClick={handleNext} 
                    disabled={selectedIds.length == 0}
                    endIcon={<ArrowForwardIcon />} 
                >
                    Next
                </Button>
            </Box>
        </Box>
    )
}