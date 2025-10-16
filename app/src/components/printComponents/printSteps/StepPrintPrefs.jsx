import { 
    Box, Button, Stack, Typography, 
} from "@mui/material";

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { usePrinter } from "../../../context/PrinterContext"
import { useFile } from "../../../context/FileContext";
import { usePrint } from "../../../context/PrintContext";

import LoadingList from "../../utils/LoadingList";
import FilesPrintOptions from "../FilesPrintOptions";
import { useEffect } from "react";


export default function StepPrintPrefs({ onNext, onPrev }) {
    const { selectedPrinter } = usePrinter();
    
    const {
        printerOptionsByFile, setPreferencesByFile, 
        validByFile, setFileValid, initialOptions
    } = usePrint()

    const { files, selectedIds, isLoading } = useFile();

    const selectedFiles = files?.filter(f => selectedIds.includes(f.id)) || [];
    const allValid = selectedFiles.every(f => !validByFile.hasOwnProperty(f.id) || validByFile[f.id]);

    const handleBack = () => {
        onPrev?.();
    }

    const handleNext = () => {
        onNext?.();
    }

    useEffect(() => {
        initialOptions(selectedIds);
    }, [])

    return (
        <Box sx={{ 
            width: "100%"
        }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    mb: 0
                }}
            >
                <Typography variant="h6">
                    Select printing preferences 
                </Typography>
                
            </Stack>

            <Box sx={{
                width: '100%',
                p: 2
                }}>
                <Typography 
                    sx={{ mb: 2 }}
                variant="body1">
                    Select the preferences for each file:
                </Typography>

                {isLoading ? (
                    <LoadingList count={3} />
                    ) : (
                    <FilesPrintOptions 
                        files={selectedFiles}
                        optionsByFile={printerOptionsByFile}
                        onChange={setPreferencesByFile}
                        colorDisabled={selectedPrinter?.admits_color}
                        validByFile={validByFile}
                        setValid={setFileValid}
                    />
                )}

            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBack} 
                >
                    Back
                </Button>

                <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={!allValid}
                    endIcon={<ArrowForwardIcon />}
                >
                    Next
                </Button>
            </Box>

        </Box>
    )
} 