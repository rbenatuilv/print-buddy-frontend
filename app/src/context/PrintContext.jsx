import { createContext, useContext, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";


const PrintContext = createContext(null)


export function PrintProvider({ children }) {
    const [ printerOptionsByFile, setPrinterOptionsByFile ] = useState(() => {
        const saved = sessionStorage.getItem("printerOptions");
        return saved ? JSON.parse(saved) : null
    })

    const setPreferencesByFile = (fileId, prefs) => {
        const newOptions = {
            ...printerOptionsByFile,
            [fileId]: prefs
        };
        setPrinterOptionsByFile(newOptions);
        sessionStorage.setItem("printerOptions", JSON.stringify(newOptions));
    };

    const [validByFile, setValidByFile] = useState(() => {
        const saved = sessionStorage.getItem("validByFile");
        return saved ? JSON.parse(saved) : {};
    });

    const setFileValid = (fileId, isValid) => {
        const newValid = { ...validByFile, [fileId]: isValid };
        setValidByFile(newValid);
        sessionStorage.setItem("validByFile", JSON.stringify(newValid));
    }

    return (
        <PrintContext.Provider value={{
            printerOptionsByFile, setPreferencesByFile, validByFile, setFileValid
        }}>
            { children }
        </PrintContext.Provider>
    )
}


export function usePrint() {
    return useContext(PrintContext);
}