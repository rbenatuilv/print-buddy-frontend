import { Box, Paper, Step, StepLabel, Stepper } from '@mui/material';
import { useState, useEffect } from 'react'

import StepUpload from './printSteps/StepUpload';
import StepPrinter from './printSteps/StepPrinter';
import StepPrintPrefs from './printSteps/StepPrintPrefs';


const steps = [
    'Upload files',
    'Select printer',
    'Printing preferences',
    'Submit'
]


export default function PrintWizard() {
    const [ activeStepPrint, setActiveStepPrint ] = useState(() => {
        const saved = sessionStorage.getItem("activeStepPrint");
        return saved ? Number(saved) : 0;
    });

    useEffect(() => {
        sessionStorage.setItem("activeStepPrint", activeStepPrint);
    }, [activeStepPrint]);

    const next = () => setActiveStepPrint(a => Math.min(a + 1, steps.length - 1));
    const prev = () => setActiveStepPrint(a => Math.max(a - 1, 0));

    return (
        <Paper sx={{ p: 2 }}>
            <Stepper activeStep={activeStepPrint} alternativeLabel>
                {steps.map(s => (
                    <Step key={s}><StepLabel>{s}</StepLabel></Step>
                ))}
            </Stepper>
            
            <Box sx={{ mt: 3 }}>
                {activeStepPrint == 0 && <StepUpload onNext={next}/>}
                {activeStepPrint == 1 && <StepPrinter onPrev={prev} onNext={next}/>}
                {activeStepPrint == 2 && <StepPrintPrefs onPrev={prev}/>}

            </Box>

        </Paper>

    )
}