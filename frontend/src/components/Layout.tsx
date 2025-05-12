import { Box } from '@mui/material';
import Header from './Header.tsx';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Box sx={styles.layout}>
      <Header />
      <Outlet />
    </Box>
  );
};

const styles = {
  layout: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
};
export default Layout;
