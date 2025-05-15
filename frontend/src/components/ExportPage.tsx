import { Box, Button, Divider, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import CollectionsService from '../services/CollectionsService.ts';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { useNavigate } from 'react-router-dom';
import { json2csv } from 'json-2-csv';

const ExportPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [collection, setCollection] = useState();

  useEffect(() => {
    CollectionsService.getById(id as string).then((response) => {
      setCollection(response.data);
    });
  }, []);

  const handleCancelClick = () => {
    navigate('/');
  };

  const handleExportClick = () => {
    const result = json2csv([collection], {
      expandNestedObjects: true,
      expandArrayObjects: true,
      unwindArrays: true,
    });

    const blob = new Blob([result], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'data.csv');
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.titleContainer}>
        <Typography variant='h4' fontWeight='bold'>
          Export Quiz
        </Typography>
        <Typography color='text.secondary' variant='subtitle1'>
          Export your quiz as a CSV file.
        </Typography>
      </Box>
      <Box sx={styles.collectionContainer}>
        <Typography fontWeight='medium' sx={styles.collectionName}>
          {collection?.name}
        </Typography>
        <Box sx={styles.questionCountContainer}>
          <HelpOutlineIcon fontSize='small' color='primary' />
          <Typography color='text.primary'>{collection?.questionCount} Questions</Typography>
        </Box>
      </Box>
      <Divider variant='middle' orientation='horizontal' flexItem />
      <Box sx={styles.buttonsContainer}>
        <Button
          sx={styles.button}
          disableElevation
          variant='outlined'
          color='text.main'
          onClick={handleCancelClick}
        >
          Cancel
        </Button>
        <Button
          disableElevation
          variant='contained'
          startIcon={<FileDownloadOutlinedIcon />}
          sx={styles.button}
          onClick={handleExportClick}
        >
          Export
        </Button>
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 3,
    backgroundColor: 'background',
    boxShadow: 2,
    borderRadius: 2,
    width: '60%',
    alignItems: 'center',
    gap: 4,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  collectionContainer: { backgroundColor: '#f5f5f5', width: '90%', padding: 3, borderRadius: 2 },
  collectionName: { fontSize: '1.1rem', marginBottom: 1 },
  questionCountContainer: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    padding: 3,
  },
  button: { textTransform: 'none', paddingY: 1, paddingX: 2 },
};

export default ExportPage;
