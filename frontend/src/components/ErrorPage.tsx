import { Box, Typography } from '@mui/material';

const ErrorPage = () => {
  return (
    <Box sx={styles.container}>
      <Typography variant='h1'>404 NOT FOUND</Typography>
    </Box>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'col',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
};
export default ErrorPage;
