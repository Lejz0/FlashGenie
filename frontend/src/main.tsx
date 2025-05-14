import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import RegisterPage from './components/RegisterPage.tsx';
import LoginPage from './components/LoginPage.tsx';
import LogoutPage from './components/LogoutPage.tsx';
import ErrorPage from './components/ErrorPage.tsx';

const theme = createTheme({
  palette: {
    background: {
      default: '#000000',
    },
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#000000',
    },
    text: {
      primary: '#000000',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 14,
  },
});

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={'/dashboard'} />} />
        <Route path='/dashboard' element={<App />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/logout' element={<LogoutPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>,
);
