import { Container } from '@mui/material'
import PrintWizard from '../components/printComponents/PrintWizard'




export default function PrintPage() {
    return (
        <Container maxWidth="md" sx={{ mt: 2 }}>
            <PrintWizard />
        </Container>
    )
}