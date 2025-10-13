import { Button, Container, CssBaseline, Slider, Stack, TextField } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded"
import { useState } from "react";


function App() {

    const [ value, setValue ] = useState("");

    return (
        <Container maxWidth={'xs'}>
            <Stack gap={2}>
                <CssBaseline />
                
                <TextField value={value} onChange={(e) => {setValue(e.target.value)}}/>
                <Slider />

                <Button variant="contained" startIcon={<AutoAwesomeRoundedIcon />}>
                    Submit
                </Button>
            </Stack>
        </Container>
    )
}

export default App
