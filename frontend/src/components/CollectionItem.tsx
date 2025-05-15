import { Box, Button, Typography } from '@mui/material';

interface CollectionItemProps {
  id: string;
  name: string;
  questionsCount: number;

  handleTakeQuizClick(): void;

  handleExportClick(): void;

  handleDeleteClick(id: string): void;
}

const CollectionItem = (props: CollectionItemProps) => {
  const { id, name, questionsCount, handleTakeQuizClick, handleExportClick, handleDeleteClick } =
    props;

  return (
    <Box sx={styles.container}>
      <Box>
        <Typography fontWeight='medium'>{name}</Typography>
        <Typography color='text.secondary'>{questionsCount} Questions</Typography>
      </Box>
      <Box sx={styles.buttonsContainer}>
        <Button disableElevation variant='contained' onClick={handleTakeQuizClick}>
          Take quiz
        </Button>
        <Button variant='outlined' color='text.main' onClick={handleExportClick}>
          Export
        </Button>
        <Button variant='outlined' color='error' onClick={() => handleDeleteClick(id)}>
          Delete
        </Button>
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    padding: 3,
    backgroundColor: '#f5f5f5',
    borderRadius: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonsContainer: { display: 'flex', flexDirection: 'row', gap: 1 },
};

export default CollectionItem;
