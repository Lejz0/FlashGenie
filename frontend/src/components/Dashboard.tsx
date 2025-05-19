import { Box, Button, Stack, Typography } from '@mui/material';
import CollectionItem from './CollectionItem.tsx';
import { useEffect, useState } from 'react';
import CollectionsService from '../services/CollectionsService.ts';
import { useNavigate } from 'react-router-dom';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

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

  const handleTakeQuizClick = (id: string) => {
    navigate(`/quiz/${id}`);
  };

  const handleExportClick = (id: string) => {
    navigate(`/export/${id}`);
  };

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
        handleTakeQuizClick={() => handleTakeQuizClick(item.id)}
        handleExportClick={() => handleExportClick(item.id)}
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
          <Box sx={{ ...styles.collectionsSummaryItem, backgroundColor: '#EFF6FF' }}>
            <Typography fontWeight='medium' color='#3a86f0'>
              Collections
            </Typography>
            <Typography fontWeight='bold' variant='h5'>
              {collections.length}
            </Typography>
          </Box>
          <Box sx={{ ...styles.collectionsSummaryItem, backgroundColor: 'secondary.main' }}>
            <Typography fontWeight='medium' color='#1AA583'>
              Total Questions
            </Typography>
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
          startIcon={<FileUploadOutlinedIcon style={{ width: '25px', height: '25px' }} />}
          sx={{ padding: 1.5, fontSize: '1rem', textTransform: 'none' }}
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
