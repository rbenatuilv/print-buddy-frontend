import { Stack, Paper, Grid, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";



export default function LoginPage() {

    const { login } = useAuth();

    const navigate = useNavigate();

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const response = await login(username, password);
        if (response.success) {
            navigate("/");
        } else {
            setError(response.message);
        }

        setLoading(false);
    }

    return (

    <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100dvh"}}
    >
        <Grid sx={{ 
            width: { xs: "80%", sm: "60%", md: 400 },
            maxWidth: "100%"
        }}>
            <Paper elevation={3}>
            <Stack spacing={2} p={4} component="form">
                <Typography variant="h5" align="center">
                Sign In
                </Typography>

                <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    required
                />

                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    required
                />

                {error && (
                <Typography color="error" variant="body2" align="center">
                    {error}
                </Typography>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={loading}
                >
                {loading ? <CircularProgress size={24} /> : "Submit"}
                </Button>

                <Typography variant="body2" align="center">
                    Don't have an account? <Link to="/register">Sign up</Link>
                </Typography>
            </Stack>
            </Paper>
        </Grid>
    </Grid>
    )
}