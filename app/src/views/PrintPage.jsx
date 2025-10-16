import { Container } from '@mui/material'
import PrintWizard from '../components/printComponents/PrintWizard'


export default function PrintPage() {
    return (
        <Container maxWidth="md" sx={{ mt: 0.5 }}>
            <PrintWizard />
        </Container>
    )
}