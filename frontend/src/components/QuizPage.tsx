import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
  LinearProgress,
  Stack
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import CollectionsService from '../services/CollectionsService';
import { mockQuestions } from '../mocks/mockQuestions'

type Question = {
  questionText: string;
  options: { text: string; isCorrect: boolean; }[];
};

const QuizPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
  Record<number, { selected: string; isCorrect: boolean }>
>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // const collection = await CollectionsService.getById(id!);
        // setQuestions(collection.data);
        setQuestions(mockQuestions)
      } catch (err) {
        setError("Failed to load questions.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleSelect = (selectedOption: string) => {
  const question = questions[currentIndex];
  const isCorrect = question.options.find(opt => opt.text === selectedOption)?.isCorrect || false;
  setSelectedAnswers((prev) => ({
    ...prev,
    [currentIndex]: { selected: selectedOption, isCorrect }
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

  const totalCorrect = Object.values(selectedAnswers).filter(a => a.isCorrect).length;

  const handleSubmit = () => {
    navigate(`/results/${id}`, {
      state: {
        questions,
        selectedAnswers,
        totalCorrect
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
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Card
          sx={{
            width: '100%',
            borderRadius: 4,
            boxShadow: 6,
            p: 0,
            background: '#fff',
          }}
        >
          <Box sx={{ px: 3, pt: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={1} textAlign="center">
              Quiz
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#e3e7ee',
                  flexGrow: 1,
                  mr: 2,
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#1976d2'
                  }
                }}
              />
              <Typography variant="subtitle1" fontWeight={700} color="text.secondary" whiteSpace="nowrap">
                Question {currentIndex + 1} of {questions.length}
              </Typography>
            </Box>
          </Box>

          <CardContent sx={{ pt: 0 }}>
            <Typography variant="h5" fontWeight={700} mb={3}>
              {currentQuestion.questionText}
            </Typography>

            <Stack spacing={2} mb={4}>
              {currentQuestion.options.map((opt, i) => {
                const isSelected = selectedAnswers[currentIndex]?.selected === opt.text;
                return (
                  <Button
                    key={i}
                    variant={isSelected ? "contained" : "outlined"}
                    color={isSelected ? "primary" : "inherit"}

                    fullWidth
                    onClick={() => handleSelect(opt.text)}
                    sx={{
                      textAlign: 'left',
                      fontWeight: 500,
                      borderWidth: 2,
                      borderColor: isSelected ? 'primary.main' : 'grey.300',
                      backgroundColor: isSelected ? 'primary.light' : '#f8fafc',
                      transition: '0.2s',
                      boxShadow: isSelected ? 2 : 0,
                      '&:hover': {
                        backgroundColor: isSelected ? 'primary.main' : '#f1f5f9',
                        color: isSelected ? '#fff' : 'primary.main',
                      }
                    }}
                  >
                    {opt.text}
                  </Button>
                );
              })}
            </Stack>

            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                variant="text"
                color="inherit"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                sx={{ fontWeight: 600 }}
              >
                Previous
              </Button>

              {currentIndex === questions.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={!selectedAnswers[currentIndex]}
                  sx={{ fontWeight: 600, px: 4 }}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disabled={!selectedAnswers[currentIndex]}
                  sx={{ fontWeight: 600, px: 4 }}
                >
                  Next
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default QuizPage;