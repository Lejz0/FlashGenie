import React from 'react';
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';

const collections = [
  {
    name: 'Physics_101.pdf',
    created: '2025-03-24',
    questions: 15,
  },
  {
    name: 'Machine_Learning_Basics.pdf',
    created: '2025-03-22',
    questions: 12,
  },
  {
    name: 'History_of_Art.pdf',
    created: '2025-03-20',
    questions: 17,
  },
];

const Dashboard = () => {
  const totalQuestions = collections.reduce((acc, curr) => acc + curr.questions, 0);

  const handleTakeQuiz = () => {
    window.open('/quiz', '_blank');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        bgcolor: '#ffffff',
        color: '#000000',
        p: { xs: 2, md: 4 },
      }}
    >
      <Grid container spacing={4} justifyContent='center' mb={5}>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              p: 4,
              bgcolor: '#e3f2fd',
              borderRadius: 4,
              textAlign: 'center',
              boxShadow: 3,
            }}
          >
            <Typography variant='h6' color='primary' gutterBottom>
              Collections
            </Typography>
            <Typography variant='h2' fontWeight='bold'>
              {collections.length}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              p: 4,
              bgcolor: '#e8f5e9',
              borderRadius: 4,
              textAlign: 'center',
              boxShadow: 3,
            }}
          >
            <Typography variant='h6' color='success.main' gutterBottom>
              Total Questions
            </Typography>
            <Typography variant='h2' fontWeight='bold'>
              {totalQuestions}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Button variant='contained' fullWidth sx={{ mb: 4 }}>
        Upload PDF
      </Button>

      <Typography variant='h5' fontWeight='bold' gutterBottom>
        Your Quiz Collections
      </Typography>

      <Stack spacing={2}>
        {collections.map((collection, index) => (
          <Card
            key={index}
            variant='outlined'
            sx={{
              bgcolor: '#fafafa',
              width: '100%',
              boxShadow: 1,
            }}
          >
            <CardContent>
              <Typography variant='subtitle1' fontWeight='bold'>
                {collection.name}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Created: {collection.created} — {collection.questions} questions
              </Typography>
              <Box mt={2} display='flex' gap={1} flexWrap='wrap'>
                <Button variant='contained' size='small' onClick={handleTakeQuiz}>
                  Take Quiz
                </Button>
                <Button variant='outlined' size='small'>
                  Export
                </Button>
                <Button variant='outlined' color='error' size='small'>
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default Dashboard;
