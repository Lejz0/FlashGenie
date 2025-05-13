import { Box, Container } from '@mui/material';
import Header from './Header.tsx';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Box sx={styles.layout}>
      <Header />
      <Container maxWidth='xl' sx={styles.layoutContainer}>
        <Outlet />
      </Container>
    </Box>
  );
};

const styles = {
  layout: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
  layoutContainer: { display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' },
};
export default Layout;
