import { Box, Paper, Step, StepLabel, Stepper } from '@mui/material';
import { useState, useEffect } from 'react'

import { usePrint } from '../../context/PrintContext'
import StepUpload from './printSteps/StepUpload';
import StepPrinter from './printSteps/StepPrinter';
import StepPrintPrefs from './printSteps/StepPrintPrefs';
import StepSend from './printSteps/StepSend';


const steps = [
    'Upload files',
    'Select printer',
    'Printing preferences',
    'Submit'
]


export default function PrintWizard() {
    const { activePrintStep, setActivePrintStep } = usePrint();

    const next = () => setActivePrintStep(a => Math.min(a + 1, steps.length - 1));
    const prev = () => setActivePrintStep(a => Math.max(a - 1, 0));

    return (
        <Paper sx={{ p: 2 }}>
            <Stepper activeStep={activePrintStep} alternativeLabel>
                {steps.map(s => (
                    <Step key={s}><StepLabel>{s}</StepLabel></Step>
                ))}
            </Stepper>
            
            <Box sx={{ mt: 3 }}>
                {activePrintStep == 0 && <StepUpload onNext={next}/>}
                {activePrintStep == 1 && <StepPrinter onPrev={prev} onNext={next}/>}
                {activePrintStep == 2 && <StepPrintPrefs onPrev={prev} onNext={next}/>}
                {activePrintStep == 3 && <StepSend onPrev={prev}/>}
            </Box>

        </Paper>

    )
}