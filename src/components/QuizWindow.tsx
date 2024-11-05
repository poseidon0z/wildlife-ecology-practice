import React, { useState } from 'react';

type Props = {
  questionNumber: number;
  question: string;
  options: string[];
  correctAnswer: string;
  nextQuestion: (val: string) => void;
};

const QuizWindow: React.FC<Props> = ({
  questionNumber,
  question,
  options,
  correctAnswer,
  nextQuestion,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleOptionSelect = (option: string) => {
    if (!isAnswered) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      const answerIsCorrect = selectedOption === correctAnswer;
      setIsCorrect(answerIsCorrect);
      setIsAnswered(true);
    }
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      nextQuestion(selectedOption);
      // Reset states for the next question
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(null);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-left">
        {questionNumber}. {question}
      </h2>
      <div className="space-y-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(option)}
            className={`w-full p-3 text-left border rounded-md ${
              selectedOption === option ? 'bg-blue-200' : 'bg-gray-100'
            } ${
              isAnswered && option === correctAnswer ? 'border-green-500' : ''
            } ${
              isAnswered &&
              selectedOption === option &&
              option !== correctAnswer
                ? 'border-red-500'
                : ''
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <div
        className={`mt-4 text-center ${
          isCorrect ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {isAnswered ? isCorrect ? 'Correct!' : 'Incorrect' : <>&nbsp;</>}
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={handleSubmit}
          disabled={isAnswered || selectedOption === null}
          className={`px-4 py-2 ${
            isAnswered || selectedOption === null
              ? 'bg-gray-300'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white rounded-md`}
        >
          Submit
        </button>
        {isAnswered && (
          <button
            onClick={handleNextQuestion}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizWindow;
