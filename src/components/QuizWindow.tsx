import React, { useState, useEffect, useRef } from 'react';

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
  const [time, setTime] = useState<number>(0); // Stopwatch time in seconds

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start the stopwatch
  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  // Stop the stopwatch
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Handle option selection
  const handleOptionSelect = (option: string) => {
    if (!isAnswered) {
      setSelectedOption(option);
    }
  };

  const setCompletionTime = () => {
    localStorage.setItem("Time",String(document.getElementById("tmr")?.innerHTML))
  }

  // Handle question submission
  const handleSubmit = () => {
    if (selectedOption !== null) {
      const answerIsCorrect = selectedOption === correctAnswer;
      setIsCorrect(answerIsCorrect);
      setIsAnswered(true);
      stopTimer();
    }
  };

  // Handle moving to the next question
  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      nextQuestion(selectedOption);
      // Reset states for the next question
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(null);
      startTimer(); // Continue the timer for the next question
      setCompletionTime();
    }
  };

  // Effect to start the timer when the component is mounted
  useEffect(() => {
    startTimer();

    // Cleanup when the component is unmounted or when the timer is stopped
    return () => {
      stopTimer();
    };
  }, []); // This empty array ensures the timer starts only once when the component mounts

  // Convert time to minutes and seconds format
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

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

      {/* Stopwatch Timer */}
      <div className="text-center mt-4">
        <h3 id="tmr" className="text-xl">Time: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</h3>
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
