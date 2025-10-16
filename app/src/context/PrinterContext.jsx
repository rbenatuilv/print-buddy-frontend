import { createContext, useContext, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getPrinters, getPrinter } from "../api/printer";


const PrinterContext = createContext(null);


export function PrinterProvider({ children }) {

    const queryPrinters = useQuery({
        queryKey: ['printers'],
        queryFn: getPrinters,
        staleTime: 1000 * 60 * 5,
        retry: false
    })

    const {data: printers, isError, isLoading} = queryPrinters;

    const [ selectedPrinter, setSelectedPrinter ] = useState(() => {
        const saved = sessionStorage.getItem("selectedPrinter");
        return saved ? JSON.parse(saved) : null;
    });

    const selectPrinter = (printer) => {
        sessionStorage.setItem("selectedPrinter", JSON.stringify(printer));
        setSelectedPrinter(printer)
    }

    return (
        <PrinterContext.Provider value={{
            printers, isLoading, isError,
            selectPrinter, selectedPrinter,
        }}>
            { children }
        </PrinterContext.Provider>
    )
}

export function usePrinter() {
    return useContext(PrinterContext);
}