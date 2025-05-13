import { Alert, Box, Button, styled, Typography } from '@mui/material';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { useState } from 'react';
import pdfToText from 'react-pdftotext';
import * as mammoth from 'mammoth';
import QuestionsService from '../services/QuestionsService.ts';
import { useNavigate } from 'react-router-dom';

const UploadFilePage = () => {
  const [selectedFile, setSelectedFile] = useState<string>();
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const ACCEPTED_FILE_TYPES = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileValidation(file);
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileValidation(file);
    }
  };

  const handleFileValidation = (file) => {
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setError('Invalid file type. Only PDF and Word files are allowed.');
      setSelectedFile('');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('File size exceeds the 10MB limit.');
      return;
    }

    setError('');
    setSelectedFile(file.name);
    extractTextBasedOnFileType(file);
  };

  const extractTextBasedOnFileType = (file) => {
    if (file.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      extractWordText(file);
    } else if (file.type == 'application/pdf') {
      extractPdfText(file);
    }
  };
  const extractWordText = (file) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const arrayBuffer = e.target.result;
      if (arrayBuffer) {
        mammoth
          .extractRawText({ arrayBuffer: arrayBuffer as ArrayBuffer })
          .then((result) => {
            setText(result.value);
          })
          .catch(() => {
            setError('Error extracting text');
          });
      } else {
        setError('Loaded file is not an ArrayBuffer');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const extractPdfText = (file) => {
    pdfToText(file)
      .then((text) => setText(text))
      .catch(() => setError('Failed to extract text from pdf'));
  };
  const handleGenerateClick = () => {
    setError('');
    setIsLoading(true);
    QuestionsService.generate({ text: text })
      .then(() => {
        setIsLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setError(`Error: ${error}`);
        setIsLoading(false);
      });
  };

  return (
    <>
      <Box sx={styles.container}>
        <Box sx={styles.containerTitleContainer}>
          <Typography variant='h4' fontWeight='bold'>
            Upload Document File (PDF, Word)
          </Typography>
          <Typography color='text.secondary' variant='subtitle1'>
            Upload a document file to generate quiz questions automatically.
          </Typography>
        </Box>
        <Box
          sx={{
            ...styles.dropZoneContainer,
            borderStyle: isDragOver ? 'solid' : 'dashed',
            borderWidth: isDragOver ? '4px' : '2px',
            borderColor: isDragOver ? 'primary.main' : 'text.secondary',
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <InsertDriveFileOutlinedIcon sx={{ fontSize: 80, color: 'text.secondary' }} />
          {selectedFile ? (
            <Typography color='text.secondary' variant='h6'>
              {selectedFile}
            </Typography>
          ) : (
            <Typography color='text.secondary' variant='subtitle1'>
              Drag and drop your File here, or
            </Typography>
          )}
          <Button component='label' role={undefined} tabIndex={-1} disabled={isLoading}>
            Browse files{' '}
            <VisuallyHiddenInput type='file' onChange={handleFileChange} accept='.pdf,.doc,.docx' />
          </Button>
          <Typography color='text.secondary'>PDF and Word files only, maximum 10MB</Typography>
        </Box>
        <Button
          fullWidth
          disableElevation
          variant='contained'
          loadingPosition='start'
          loading={isLoading}
          sx={styles.button}
          onClick={handleGenerateClick}
        >
          Upload and generate quiz
        </Button>
      </Box>
      {error && (
        <Alert severity='error' variant='filled'>
          {error}
        </Alert>
      )}
    </>
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
  containerTitleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  dropZoneContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: { padding: 1, width: '90%' },
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
export default UploadFilePage;
