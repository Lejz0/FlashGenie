import { Box, Button, Stack, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CollectionItem from './CollectionItem.tsx';
import { useEffect, useState } from 'react';
import CollectionsService from '../services/CollectionsService.ts';
import { useNavigate } from 'react-router-dom';

interface Collection {
  id: string;
  name: string;
  questionCount: number;
}

const Dashboard = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const navigate = useNavigate();

  const fetchCollections = () => {
    CollectionsService.getAll().then((response) => {
      setCollections(response.data);
    });
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const totalQuestions = collections.reduce((total, item) => total + item.questionCount, 0);

  const handleTakeQuizClick = () => {};

  const handleExportClick = () => {};

  const handleDeleteClick = (id: string) => {
    CollectionsService.deleteById(id)
      .then((response) => {
        if (response.status === 200) {
          fetchCollections();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUploadFileClick = () => {
    navigate('/generate');
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
    <>
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
              {totalQuestions}
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
          onClick={handleUploadFileClick}
        >
          Upload File (PDF, Word)
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
    </>
  );
};

const styles = {
  container: {
    padding: 3,
    backgroundColor: 'background',
    boxShadow: 2,
    borderRadius: 2,
    width: '100%',
  },
  collectionsSummaryContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
  },
  collectionsSummaryItem: { padding: 3, borderRadius: 3, flex: 1 },
};
export default Dashboard;
