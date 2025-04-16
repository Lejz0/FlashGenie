import MainContent from './MainContent.tsx';
import Header from './Header.tsx';
import { Box } from '@mui/material';

function App() {
  return (
    <Box sx={styles.layout}>
      <Header />
      <MainContent />
    </Box>
  );
}

const styles = {
  layout: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
};

export default App;
