import { Box, Button, Typography, Paper, List, ListItem, ListItemText, Divider, CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PrintIcon from "@mui/icons-material/Print";

import { usePrinter } from "../../../context/PrinterContext";
import { useFile } from "../../../context/FileContext";
import { usePrint } from "../../../context/PrintContext";
import { useUser } from "../../../context/UserContext";

import LoadingTypography from '../../utils/LoadingTypography'
import LoadingList from "../../utils/LoadingList";
import { useEffect, useState } from "react";


function countPagesInRange(pageRanges, totalPages) {
    if (!pageRanges || pageRanges.trim() === "") {
        return totalPages; // todas las páginas
    }

    let pages = new Set();

    pageRanges.split(",").forEach(part => {
        const [startStr, endStr] = part.split("-").map(s => s.trim());
        const start = parseInt(startStr, 10);
        const end = endStr ? parseInt(endStr, 10) : start;

        if (isNaN(start) || start < 1) return;

        const validEnd = isNaN(end) || end > totalPages ? totalPages : end;
        for (let i = start; i <= validEnd; i++) {
            pages.add(i);
        }
    });

    return pages.size;
}


function calculateTotalCost(selectedFiles, printerOptionsByFile, selectedPrinter) {
    const priceColor = selectedPrinter?.price_per_page_color || 0;
    const priceBW = selectedPrinter?.price_per_page_bw || 0;
    
    let totalColorPages = 0;
    let totalBWPages = 0;

    selectedFiles.forEach(file => {
        const opts = printerOptionsByFile[file.id];
        if (!opts) return;

        // Contar páginas usando la función dedicada
        const pagesCount = countPagesInRange(opts.pageRanges, file.pages);

        // Multiplicar por el número de copias
        const copies = new Number(opts.copies);
        const totalPagesForFile = pagesCount * (copies || 1);

        // Sumar según colorMode
        if (opts.colorMode === "Color") {
            totalColorPages += totalPagesForFile;
        } else {
            totalBWPages += totalPagesForFile;
        }
    });

    // Calcular costo total
    const totalCost = totalColorPages * priceColor + totalBWPages * priceBW;
    return totalCost;
}



export default function StepSend({ onPrev }) {

    const { user, isLoading: isLoadingUser } = useUser()
    const { selectedPrinter, isLoading: isLoadingPrinter } = usePrinter();
    const { selectedIds, files, isLoading: isLoadingFiles } = useFile();
    const { printerOptionsByFile } = usePrint();

    const [ totalCost, setTotalCost ] = useState(0);

    useEffect(() => {
        console.log(printerOptionsByFile)
        const value = calculateTotalCost(
            files?.filter(f => selectedIds.includes(f.id)) || [],
            printerOptionsByFile, 
            selectedPrinter
        )
        setTotalCost(value);
        console.log(value)
    }, [files])

    const handleBack = () => {
        onPrev?.();
    }

    const handlePrint = () => {

    }

    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography variant="h6">
                Summary
            </Typography>

            <Box sx={{ 
                display: "flex", 
                flexDirection: "row", 
                justifyContent: "center",
                alignItems: "center",
                gap: 1.5
            }}>
                <PrintIcon fontSize="large"/>
                <Box >
                    <Typography variant="body1">
                        {selectedPrinter?.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {selectedPrinter?.location}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ p: 1 }}>
                <Typography variant="body1">FILES TO PRINT:</Typography>
                {isLoadingFiles ? (
                    <LoadingList count={selectedIds.length} sx={{ overflowY: "auto", maxHeight: "calc(60vh - 250px)", }}/>
                ) : (files?.filter(f => selectedIds.includes(f.id)) || []).length === 0 ? (
                    <Typography variant="body2" color="text.secondary">No files selected</Typography>
                ) : (
                    <List sx={{ overflowY: "auto", maxHeight: "calc(60vh - 250px)", }} >
                        {(files?.filter(f => selectedIds.includes(f.id)) || []).map(file => {
                            const opts = printerOptionsByFile[file.id];
                            const pagesCount = countPagesInRange(opts?.pageRanges, file.pages) * (opts?.copies || 1);
                            return (
                                <ListItem key={file.id} divider disablePadding>
                                    <ListItemText
                                        primary={file.filename}
                                        secondary={`Pages to print: ${pagesCount}`}
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                )}
            </Box>

            {/* Costo total */}
            <Paper sx={{ p: 1.5, display: "flex", flexDirection:"column", alignItems: "center" }}>
                <LoadingTypography
                    color="text.secondary"
                    variant="body2" 
                    loadingWidth={150} 
                    isLoading={isLoadingUser}
                >
                    Current balance: €{user?.balance.toFixed(2)}
                </LoadingTypography>

                <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                    <Typography 
                        variant="h6"
                    >
                        Total cost 
                    </Typography>
                            
                    <LoadingTypography 
                        variant="h6" 
                        color={user?.balance >= totalCost ? "primary" : "error"} 
                        sx={{ fontWeight: "bold" }}
                        loadingWidth={50}
                        isLoading={isLoadingFiles}
                    >
                        €{totalCost.toFixed(2)}
                    </LoadingTypography>
            </Box>

                {(user?.balance < totalCost) && (
                    <Typography variant="body2" color="error">
                        Insufficient credit!
                    </Typography>
                )}   
            </Paper>
            
            
            <Box sx={{ mt: 1, display: "flex", justifyContent: "space-between" }}>
                <Button 
                    variant="outlined" 
                    onClick={handleBack} 
                    endIcon={<ArrowBackIcon />} 
                >
                    Back
                </Button>

                <Button 
                    variant="contained" 
                    onClick={handlePrint} 
                    startIcon={<PrintIcon />} 
                    disabled={user?.balance < totalCost}
                >
                    Print
                </Button>
            </Box>
        </Box>
    )
}