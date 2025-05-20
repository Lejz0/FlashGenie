import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { Home } from '@mui/icons-material';
import { useParams } from 'react-router';

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions = [], quizName = 'Quiz', totalCorrect = 0 } = location.state || {};

  const correctCount = totalCorrect;

  const total = questions.length || 1;
  const percent = Math.round((correctCount / total) * 100);
  const incorrectCount = total - correctCount;
  const { id } = useParams();

  return (
    <Box sx={{ minHeight: '100vh', py: 8, width: '60%' }}>
      <Card sx={{ borderRadius: 3, boxShadow: 2, px: { xs: 1, sm: 4 }, py: 4 }}>
        <CardContent>
          <Typography variant='h4' fontWeight={700} align='center' gutterBottom>
            Quiz Results
          </Typography>
          <Typography variant='subtitle1' align='center' color='text.secondary' gutterBottom>
            {quizName || 'Quiz'}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              my: 4,
            }}
          >
            <Box
              sx={{
                width: 130,
                height: 130,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #e3ebfa 60%, #f4f7fb 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: 1,
              }}
            >
              <Typography variant='h4' fontWeight={700} color='primary'>
                {percent}%
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {correctCount} of {total}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              background: '#f4f8ff',
              borderRadius: 2,
              px: 3,
              py: 2,
              mb: 4,
              border: '1px solid #e3ebfa',
            }}
          >
            <Typography variant='subtitle2' fontWeight={600} mb={1}>
              Quiz Summary
            </Typography>
            <ul style={{ margin: 0, paddingLeft: 18, color: '#3b4960' }}>
              <li>You answered {correctCount} questions correctly</li>
              <li>{incorrectCount} questions were answered incorrectly</li>
              <li>Your overall score is {percent}%</li>
            </ul>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent='center'>
            <Button variant='contained' color='primary' onClick={() => navigate(`/quiz/${id}`)}>
              Retake Quiz
            </Button>

            <Button
              variant='outlined'
              sx={{ fontWeight: 600, px: 4 }}
              startIcon={<Home />}
              onClick={() => navigate('/')}
            >
              Return to Dashboard
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ResultsPage;
