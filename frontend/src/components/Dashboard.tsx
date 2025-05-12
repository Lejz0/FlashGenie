import { Box, Button, Container, Stack, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CollectionItem from './CollectionItem.tsx';
import { useEffect, useState } from 'react';
import CollectionsService from '../services/CollectionsService.ts';

interface Collection {
  id: string;
  name: string;
  questionCount: number;
}

const Dashboard = () => {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    CollectionsService.getAll().then((response) => {
      console.log(response.data);
    });
  }, []);

  const calculateTotalQuestions = () => {
    return collections.reduce((total, item) => total + item.questionCount, 0);
  };

  const handleTakeQuizClick = () => {};

  const handleExportClick = () => {};

  const handleDeleteClick = (id: string) => {
    CollectionsService.deleteById(id).then(() => {});
  };

  const renderCollectionItems = () => {
    return collections.map((item) => (
      <CollectionItem
        key={item.id}
        id={item.id}
        name={item.name}
        questionsCount={item.questionCount}
        handleTakeQuizClick={handleTakeQuizClick}
        handleExportClick={handleExportClick}
        handleDeleteClick={() => handleDeleteClick(item.id)}
      />
    ));
  };

  return (
    <Container maxWidth='xl' sx={styles.layoutContainer}>
      <Box sx={styles.container}>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          Your Collections
        </Typography>
        <Box sx={styles.collectionsSummaryContainer}>
          <Box sx={{ ...styles.collectionsSummaryItem, backgroundColor: '#c1d2f8' }}>
            <Typography fontWeight='medium'>Collections</Typography>
            <Typography fontWeight='bold' variant='h5'>
              {collections.length}
            </Typography>
          </Box>
          <Box sx={{ ...styles.collectionsSummaryItem, backgroundColor: 'secondary.main' }}>
            <Typography fontWeight='medium'>Total Questions</Typography>
            <Typography fontWeight='bold' variant='h5'>
              {calculateTotalQuestions()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={styles.container}>
        <Button
          fullWidth
          variant='contained'
          disableElevation
          startIcon={<CloudUploadIcon />}
          sx={{ padding: 1 }}
        >
          Upload PDF
        </Button>
      </Box>
      <Box sx={styles.container}>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          Your Quiz Collections
        </Typography>
        <Stack direction='column' spacing={1}>
          <>{renderCollectionItems()}</>
        </Stack>
      </Box>
    </Container>
  );
};

const styles = {
  layoutContainer: { display: 'flex', flexDirection: 'column', gap: 4 },
  container: { padding: 3, backgroundColor: 'background', boxShadow: 2, borderRadius: 2 },
  collectionsSummaryContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
  },
  collectionsSummaryItem: { padding: 3, borderRadius: 3, flex: 1 },
};
export default Dashboard;
