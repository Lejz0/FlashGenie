import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Paper, TextField, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import icon from '../assets/icon.png';
import AuthorizationService from '../services/AuthorizationService.ts';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

export default function RegisterPage() {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    AuthorizationService.register({ name, email, password, confirmPassword })
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          navigate('/login');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Container
      maxWidth='sm'
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper elevation={3} sx={{ p: 6, borderRadius: 3, width: '100%' }}>
        <Box textAlign='center' mb={3}>
          <img
            src={icon}
            alt='FlashGenie Logo'
            style={{ width: 48, height: 48, marginBottom: 8 }}
          />
          <Typography variant='h5' fontWeight='bold'>
            FlashGenie
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Create your account
          </Typography>
        </Box>

        <Box component='form' onSubmit={handleRegister}>
          <TextField
            fullWidth
            label='Name'
            margin='normal'
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete='name'
          />
          <TextField
            fullWidth
            label='Email address'
            margin='normal'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='email'
          />
          <TextField
            fullWidth
            label='Password'
            margin='normal'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='new-password'
          />
          <TextField
            fullWidth
            label='Confirm Password'
            margin='normal'
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete='new-password'
          />

          {error && (
            <Typography color='error' variant='body2' mt={1} mb={1}>
              {error}
            </Typography>
          )}

          <Grid container justifyContent='center' mt={1}>
            <Grid>
              <Button
                type='button'
                variant='text'
                onClick={handleLogin}
                sx={{
                  textTransform: 'none',
                  p: 0,
                  minWidth: 0,
                  fontSize: '0.875rem',
                  color: 'blue',
                }}
              >
                Already have an account? Login
              </Button>
            </Grid>
          </Grid>

          <Button
            type='submit'
            fullWidth
            variant='contained'
            loadingPosition='center'
            loading={isLoading}
            disabled={isLoading}
            sx={{
              mt: 3,
              textTransform: 'none',
              fontWeight: 'bold',
              bgcolor: '#2563eb',
              '&:hover': {
                bgcolor: '#1e40af',
              },
            }}
            onClick={handleRegister}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
