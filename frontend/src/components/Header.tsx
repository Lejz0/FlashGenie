import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import Logo from '../assets/icon.png';
import { NavLink } from 'react-router';
import { JSX } from 'react';

const Header = () => {
  // CHANGE: Check if the user is taking a quiz
  const isTakingAQuiz: boolean = false;

  const renderMenuItems = (): JSX.Element =>
    isTakingAQuiz ? (
      <Button component={NavLink} variant='contained' color='error' to='/dashboard'>
        Exit Quiz
      </Button>
    ) : (
      <>
        <Button component={NavLink} color='secondary' size='medium' to='/dashboard'>
          Dashboard
        </Button>
        <Button component={NavLink} color='secondary' size='medium' to='/logout'>
          Logout
        </Button>
      </>
    );

  return (
    <AppBar component='nav' position='static'>
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
  logoText: { fontWeight: '800', pl: 1 },
  menuWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexGrow: 1,
    maxWidth: '400px',
  },
  menuContainer: { display: 'flex', flexDirection: 'row', gap: 1 },
};

export default Header;
