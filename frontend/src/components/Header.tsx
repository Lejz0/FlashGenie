// @ts-nocheck

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import Logo from '../assets/icon.png';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useSignOut from 'react-auth-kit/hooks/useSignOut';

const Header = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  const renderMenuItems = () => {
    const path = location.pathname;

    if (path.includes('/quiz/')) {
      return (
        <Button component={NavLink} variant='contained' color='error' to='/'>
          Exit Quiz
        </Button>
      );
    }

    if (path.includes('/export')) {
      return (
        <Button color='error' size='medium' onClick={handleLogout}>
          Logout
        </Button>
      );
    }

    return (
      <>
        <Button
          component={NavLink}
          color='text'
          size='medium'
          to='/'
          sx={{
            '&.active': {
              fontWeight: 'bold',
              color: 'blue',
            },
          }}
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Dashboard
        </Button>
        <Button color='error' size='medium' onClick={handleLogout}>
          Logout
        </Button>
      </>
    );
  };

  return (
    <AppBar component='nav' position='static' color='primary.contrastText' sx={styles.appBar}>
      <Toolbar>
        <Box sx={styles.navbarContainer}>
          <Box sx={styles.logoAndTextWrapper}>
            <Box sx={styles.logoAndTextContainer}>
              <Box component='img' alt='logo' src={Logo} sx={styles.logo} />
              <Typography variant='h6' sx={styles.logoText}>
                FlashGenie
              </Typography>
            </Box>
          </Box>

          <Box sx={styles.menuWrapper}>
            <Box sx={styles.menuContainer}>{renderMenuItems()}</Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const styles = {
  appBar: { boxShadow: 3, marginBottom: 4 },
  navbarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  logoAndTextWrapper: { flexShrink: 0 },
  logoAndTextContainer: { display: 'flex', alignItems: 'center' },
  logo: {
    height: '44px',
  },
  logoText: { fontWeight: '800', paddingLeft: 1 },
  menuWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexGrow: 1,
    maxWidth: '400px',
  },
  menuContainer: { display: 'flex', flexDirection: 'row', gap: 1 },
};

export default Header;
