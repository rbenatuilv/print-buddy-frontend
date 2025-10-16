import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";


const validatePageRanges = (input, totalPages) => {
    if (!input) return null; // Empty is fine = all pages

    const parts = input.split(',').map(p => p.trim());
    const rangeRegex = /^(\d+)(-(\d+))?$/;

    for (const part of parts) {
        const match = rangeRegex.exec(part);
        if (!match) return "Invalid format. Use commas and dashes (e.g. 1, 2-4)";

        const start = parseInt(match[1], 10);
        const end = match[3] ? parseInt(match[3], 10) : start;

        if (start < 1 || end < 1)
            return "Pages must start from 1 (no zero or negatives)";
        if (end < start)
            return "Invalid range (lower bound greater than upper bound)";
        if (totalPages && end > totalPages)
            return `Page range exceeds total number of pages (${totalPages})`;
    }

    return null;
};


export default function PrintOptionsForm({ options, onChange, colorDisabled, totalPages, changeValid }) {
    const [pageRangeError, setPageRangeError] = useState("");
    
    const handleChange = (key, value) => {
        if (onChange) onChange({ ...options, [key]: value });
    };

    const validateRange = (value) => {
        const error = validatePageRanges(value, totalPages);
        changeValid?.(!error)
        return error;
    }

    const handlePageRangesChange = (e) => {
        const value = e.target.value;
        const error = validateRange(value);
        setPageRangeError(error);
        handleChange("pageRanges", value);
    };

    const handleCopiesBlur = (e) => {
        const value = e.target.value;
        if (value < 1) {
            handleChange("copies", 1);
        } else {
            handleChange("copies", value);
        }
    }

    useEffect(() => {
        if (options) {
            const error = validateRange(options.pageRanges);
            setPageRangeError(error);
        }
    }, [])

    return (
        <Box
            sx={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: 2 , 
                alignItems: "center"
            }}
        >
            <FormControl fullWidth disabled={colorDisabled}>
                <InputLabel>Color Mode</InputLabel>
                <Select
                    value={options?.colorMode || "B&W"}
                    label="Color Mode"
                    onChange={(e) => handleChange("colorMode", e.target.value)}
                >
                    <MenuItem value="Color">Color</MenuItem>
                    <MenuItem value="B&W">Black and White</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel>Sides</InputLabel>
                <Select
                    value={options?.sides || "1S"}
                    label="Sides"
                    onChange={(e) => handleChange("sides", e.target.value)}
                >
                    <MenuItem value="1S">One-sided</MenuItem>
                    <MenuItem value="2SLng">Two-sided (long edge)</MenuItem>
                    <MenuItem value="2SSht">Two-sided (short edge)</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="Number of copies"
                value={options?.copies || 1}
                onChange={(e) => {
                    const value = Number(e.target.value);
                    if (isNaN(value)) {
                        handleChange("copies", 1); // valor por defecto mínimo
                    } else {
                        handleChange("copies", value);
                    }

                }}
                onBlur={handleCopiesBlur}
                onFocus={(e) => e.target.select()}
                fullWidth
            />

            <TextField
                label="Page ranges"
                placeholder="Use commas and dashes (e.g. 1, 2-4)"
                value={options?.pageRanges || ""}
                onChange={handlePageRangesChange}
                fullWidth
                error={!!pageRangeError}
                helperText={pageRangeError || "Leave empty to print all pages"}
            />
        </Box>
    )
}