import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

type Question = {
  questionText: string;
  options: string[];
  correctAnswer: string;
};

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { questions = [], selectedAnswers = {} } = location.state || {};

  const score = questions.reduce((acc: number, question: Question, idx: number) => {
    const userAnswer = selectedAnswers[idx];
    return userAnswer === question.correctAnswer ? acc + 1 : acc;
  }, 0);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Quiz Summary
      </Typography>
      <Typography variant="h6" gutterBottom>
        You got {score} out of {questions.length} correct.
      </Typography>

      <Box mt={4} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default ResultsPage;
