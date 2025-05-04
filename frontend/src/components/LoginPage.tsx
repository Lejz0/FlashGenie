import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
    Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
            navigate('/dashboard');
        }
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Paper elevation={3} sx={{ p: 6, borderRadius: 3, width: '100%' }}>
                <Box textAlign="center" mb={3}>
                    <img
                        src="../assets/icon.png"
                        alt="FlashGenie Logo"
                        style={{ width: 48, height: 48, marginBottom: 8 }}
                    />
                    <Typography variant="h5" fontWeight="bold">
                        FlashGenie
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        PDF Knowledge Extractor & Quiz Generator
                    </Typography>
                </Box>

                <Box component="form" onSubmit={handleLogin}>
                    <TextField
                        fullWidth
                        label="Email address"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Grid container justifyContent="space-between" mt={1}>
                        <Grid item>
                            <Button
                                type="button"
                                variant="text"
                                onClick={handleForgotPassword}
                                sx={{
                                    textTransform: 'none',
                                    p: 0,
                                    minWidth: 0,
                                    fontSize: '0.875rem',
                                }}
                            >
                                Forgot your password?
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                type="button"
                                variant="text"
                                onClick={handleRegister}
                                sx={{
                                    textTransform: 'none',
                                    p: 0,
                                    minWidth: 0,
                                    fontSize: '0.875rem',
                                }}
                            >
                                Register
                            </Button>
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            textTransform: 'none',
                            fontWeight: 'bold',
                            bgcolor: '#2563eb',
                            '&:hover': {
                                bgcolor: '#1e40af',
                            },
                        }}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
