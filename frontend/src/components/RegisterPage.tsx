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
import icon from '../assets/icon.png'

export default function RegisterPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!email || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        navigate('/dashboard');
    };

    const handleLogin = () => {
        navigate('/login');
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
                        src={icon}
                        alt="FlashGenie Logo"
                        style={{ width: 48, height: 48, marginBottom: 8 }}
                    />
                    <Typography variant="h5" fontWeight="bold">
                        FlashGenie
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Create your account
                    </Typography>
                </Box>

                <Box component="form" onSubmit={handleRegister}>
                    <TextField
                        fullWidth
                        label="Email address"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        margin="normal"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                    />

                    {error && (
                        <Typography color="error" variant="body2" mt={1} mb={1}>
                            {error}
                        </Typography>
                    )}

                    <Grid container justifyContent="center" mt={1}>
                        <Grid>
                            <Button
                                type="button"
                                variant="text"
                                onClick={handleLogin}
                                sx={{
                                    textTransform: 'none',
                                    p: 0,
                                    minWidth: 0,
                                    fontSize: '0.875rem',
                                    color:'blue',
                                }}
                            >
                                Already have an account? Login
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
                        Register
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}