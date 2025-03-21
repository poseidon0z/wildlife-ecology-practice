import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import questionsData from '../data/STSQuestions.json';
import QuizWindow from './QuizWindow';
import CompletionWindow from './CompletionWindow';

// Define the structure of questions data by week
type QuizData = {
  [category: string]: {
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
const typedQuestionsData = questionsData as QuizData;

const QuizPage: React.FC = () => {
  const { selectedCategory } = useParams<{ selectedCategory: string }>();

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

      if (selectedCategory === 'mixed') {
        // Combine questions from all categories
        for (const category in typedQuestionsData) {
          selectedQuestions = selectedQuestions.concat(
            typedQuestionsData[category as keyof QuizData]
          );
        }
      } else {
        // Load questions from the selected category
        selectedQuestions =
          typedQuestionsData[selectedCategory as keyof QuizData] || [];
      }

      // Shuffle the questions
      selectedQuestions = selectedQuestions.sort(() => Math.random() - 0.5);
      setQuestions(selectedQuestions);
    };

    loadQuestions();
  }, [selectedCategory]);

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
    setScore(0);
    setCurrentQuestionIndex(0);
    setIncorrectAnswers([]);
    setQuizCompleted(false);

    const loadQuestions = () => {
      let selectedQuestions: Question[] = [];

      if (selectedCategory === 'mixed') {
        // Combine questions from all categories
        for (const category in typedQuestionsData) {
          selectedQuestions = selectedQuestions.concat(
            typedQuestionsData[category as keyof QuizData]
          );
        }
      } else {
        // Load questions from the selected category
        selectedQuestions =
          typedQuestionsData[selectedCategory as keyof QuizData] || [];
      }

      // Shuffle the questions
      selectedQuestions = selectedQuestions.sort(() => Math.random() - 0.5);
      setQuestions(selectedQuestions);
    };

    loadQuestions(); // Call the updated function
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
