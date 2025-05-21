// @ts-nocheck

import { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthorizationService from '../services/AuthorizationService.ts';
import Logo from '../assets/icon.png';
import { AxiosError } from 'axios';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { setAuthToken } from '../axios/customAxios.ts';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();

    if (email && password) {
      setIsLoading(true);
      AuthorizationService.login({ email, password })
        .then((response) => {
          if (response.status === 200) {
            if (
              signIn({
                auth: {
                  token: response.data.token,
                  type: 'Bearer',
                },
              })
            ) {
              setAuthToken(response.data.token);
              setIsLoading(false);
              navigate('/');
            }
          }
        })
        .catch((error: AxiosError) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };
  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <Container maxWidth='sm' sx={styles.container}>
      <Paper elevation={3} sx={{ p: 6, borderRadius: 3, width: '100%' }}>
        <Box textAlign='center' mb={3}>
          <Box
            component='img'
            alt='logo'
            src={Logo}
            style={{ width: 48, height: 48, marginBottom: 8 }}
          />
          <Typography variant='h5' fontWeight='bold'>
            FlashGenie
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            PDF Knowledge Extractor & Quiz Generator
          </Typography>
        </Box>

        <Box component='form' onSubmit={handleLogin}>
          <TextField
            disabled={isLoading}
            fullWidth
            label='Email address'
            margin='normal'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            disabled={isLoading}
            fullWidth
            label='Password'
            margin='normal'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Grid container mt={1} justifyContent='center'>
            <Grid item size='12'>
              <Button
                fullWidth
                type='button'
                variant='text'
                onClick={handleRegister}
                sx={{
                  textTransform: 'none',
                  p: 0,
                  minWidth: 0,
                  fontSize: '0.875rem',
                  width: '100%',
                  color: 'blue',
                }}
              >
                Create an Account
              </Button>
            </Grid>
          </Grid>

          <Button
            disabled={isLoading}
            loading={isLoading}
            loadingPosition='center'
            type='submit'
            fullWidth
            variant='contained'
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

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
