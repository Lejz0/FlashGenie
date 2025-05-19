import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import QuestionsService from '../services/QuestionsService'; // adjust path if needed

type Question = {
  questionText: string;
  options: string[];
};

const QuizPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await QuestionsService.generate({});
        setQuestions(response.data);
      } catch (err) {
        setError("Failed to load questions.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleSelect = (value: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: value
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    navigate('/results', {
      state: {
        questions,
        selectedAnswers
      }
    });
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" textAlign="center">
        {error}
      </Typography>
    );
  }

  if (!questions.length) {
    return <Typography variant="h6" textAlign="center">No questions available.</Typography>;
  }

  const currentQuestion = questions[currentIndex];

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 5 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Question {currentIndex + 1} of {questions.length}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {currentQuestion.questionText}
          </Typography>
          <FormControl component="fieldset">
            <FormLabel component="legend">Choose an answer</FormLabel>
            <RadioGroup
              value={selectedAnswers[currentIndex] || ''}
              onChange={(e) => handleSelect(e.target.value)}
            >
              {currentQuestion.options.map((opt, i) => (
                <FormControlLabel key={i} value={opt} control={<Radio />} label={opt} />
              ))}
            </RadioGroup>
          </FormControl>

          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button
              variant="contained"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              Previous
            </Button>

            {currentIndex === questions.length - 1 ? (
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={currentIndex === questions.length - 1}
              >
                Next
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default QuizPage;
