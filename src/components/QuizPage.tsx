import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import questionsData from '../data/questions.json';
import QuizWindow from './QuizWindow';
import CompletionWindow from './CompletionWindow';

// Define the structure of questions data by week
type WeekData = {
  [key in `week${number}`]: {
    question: string;
    options: string[];
    answer: string;
  }[];
};

// Define the question datatype
type Question = {
  question: string;
  options: string[];
  answer: string;
};

// Type assertions for questionsData and selected week key
const typedQuestionsData = questionsData as WeekData;
type WeekKey = keyof WeekData | 'mixed';

const QuizPage: React.FC = () => {
  const { selectedWeek } = useParams<{ selectedWeek: WeekKey }>();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<
    { question: string; correctAnswer: string }[]
  >([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const loadQuestions = () => {
      let selectedQuestions: Question[] = [];

      if (selectedWeek === 'mixed') {
        // Combine questions from all weeks
        for (const week in typedQuestionsData) {
          selectedQuestions = selectedQuestions.concat(
            typedQuestionsData[week as keyof WeekData]
          );
        }
      } else {
        // Load questions from the specified week
        selectedQuestions =
          typedQuestionsData[selectedWeek as keyof WeekData] || [];
      }

      // Shuffle questions
      selectedQuestions = selectedQuestions.sort(() => Math.random() - 0.5);
      setQuestions(selectedQuestions);
    };

    loadQuestions();
  }, [selectedWeek]);

  const handleNextQuestion = (selectedOption: string) => {
    const currentQuestion = questions[currentQuestionIndex];

    // Check if the selected answer is correct
    if (selectedOption === currentQuestion.answer) {
      setScore(score + 1);
    } else {
      setIncorrectAnswers((prev) => [
        ...prev,
        {
          question: currentQuestion.question,
          correctAnswer: currentQuestion.answer,
        },
      ]);
    }

    // Move to the next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRetry = () => {
    // Reset states to retry the quiz
    setScore(0);
    setCurrentQuestionIndex(0);
    setIncorrectAnswers([]);
    setQuizCompleted(false);
    // Reload questions if necessary
    const loadQuestions = () => {
      let selectedQuestions: Question[] = [];
      if (selectedWeek === 'mixed') {
        for (const week in typedQuestionsData) {
          selectedQuestions = selectedQuestions.concat(
            typedQuestionsData[week as keyof WeekData]
          );
        }
      } else {
        selectedQuestions =
          typedQuestionsData[selectedWeek as keyof WeekData] || [];
      }
      selectedQuestions = selectedQuestions.sort(() => Math.random() - 0.5);
      setQuestions(selectedQuestions);
    };
    loadQuestions();
  };

  return (
    <>
      {' '}
      {quizCompleted ? (
        <CompletionWindow
          score={score}
          totalQuestions={questions.length}
          incorrectAnswers={incorrectAnswers}
          onRetry={handleRetry}
        />
      ) : (
        questions.length > 0 && (
          <QuizWindow
            questionNumber={currentQuestionIndex + 1}
            question={questions[currentQuestionIndex].question}
            options={questions[currentQuestionIndex].options}
            correctAnswer={questions[currentQuestionIndex].answer}
            nextQuestion={handleNextQuestion}
          />
        )
      )}
    </>
  );
};

export default QuizPage;
