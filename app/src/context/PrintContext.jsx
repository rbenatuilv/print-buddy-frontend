import { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";


const PrintContext = createContext(null)


export function PrintProvider({ children }) {

    // Control the steps for printing
    const [ activePrintStep, setActivePrintStep ] = useState(() => {
        const saved = sessionStorage.getItem("activePrintStep");
        return saved ? Number(saved) : 0;
    });

    useEffect(() => {
        sessionStorage.setItem("activePrintStep", activePrintStep);
    }, [activePrintStep]);


    // Save printer options for each file
    const [ printerOptionsByFile, setPrinterOptionsByFile ] = useState(() => {
        const saved = sessionStorage.getItem("printerOptions");
        return saved ? JSON.parse(saved) : {}
    })

    const setPreferencesByFile = (fileId, prefs) => {
        const newOptions = {
            ...printerOptionsByFile,
            [fileId]: prefs
        };
        setPrinterOptionsByFile(newOptions);
        sessionStorage.setItem("printerOptions", JSON.stringify(newOptions));
    };

    const initialOptions = (idList) => {
        setPrinterOptionsByFile(prev => {
            const updated = { ...prev };
            let changed = false;

            for (const fid of idList) {
                if (!Object.hasOwn(updated, fid)) {
                    updated[fid] = {
                        colorMode: "B&W",
                        sides: "1S",
                        copies: 1,
                        pageRanges: ""
                    };
                    changed = true;
                }
            }
            if (changed) {
                sessionStorage.setItem("printerOptions", JSON.stringify(updated));
                return updated;
            }
            return prev;
        });
    };


    // Check valid options for each file
    const [validByFile, setValidByFile] = useState(() => {
        const saved = sessionStorage.getItem("validByFile");
        return saved ? JSON.parse(saved) : {};
    });

    const setFileValid = (fileId, isValid) => {
        const newValid = { ...validByFile, [fileId]: isValid };
        setValidByFile(newValid);
        sessionStorage.setItem("validByFile", JSON.stringify(newValid));
    }

    // Reset Function
    const resetState = () => {
        setActivePrintStep(0);
        setPrinterOptionsByFile({});
        setValidByFile({});

        sessionStorage.removeItem("activePrintStep");
        sessionStorage.removeItem("printerOptions");
        sessionStorage.removeItem("validByFile");
    }

    return (
        <PrintContext.Provider value={{
            printerOptionsByFile, setPreferencesByFile, 
            validByFile, setFileValid, initialOptions,
            activePrintStep, setActivePrintStep,
            resetState
        }}>
            { children }
        </PrintContext.Provider>
    )
}


export function usePrint() {
    return useContext(PrintContext);
}