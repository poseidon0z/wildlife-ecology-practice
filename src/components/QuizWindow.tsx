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
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [time, setTime] = useState<number>(
    Number(sessionStorage.getItem('Time')) || 0
  ); // Load from sessionStorage

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Shuffle options when the question changes
  useEffect(() => {
    const shuffleArray = (array: string[]) =>
      [...array].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffleArray(options));
  }, [question, options]);

  // Timer lifecycle
  useEffect(() => {
    startTimer();
    return () => stopTimer(); // Stop timer when unmounting
  }, []);

  const startTimer = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime + 1;
        return newTime;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleOptionSelect = (option: string) => {
    if (!isAnswered) setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setIsCorrect(selectedOption === correctAnswer);
      setIsAnswered(true);

      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
        seconds
      ).padStart(2, '0')}`;

      sessionStorage.setItem('Time', formattedTime); // Save formatted MM:SS time
    }
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      nextQuestion(selectedOption);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(null);
    }
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="h-fit max-h-full max-w-md mx-auto overflow-y-auto p-6 bg-black bg-opacity-50 backdrop-blur-lg rounded-lg shadow-lg border border-purple-600">
      <h2 className="text-2xl font-semibold mb-4 text-left text-white">
        {questionNumber}. {question}
      </h2>
      <div className="space-y-4">
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(option)}
            className={`w-full p-3 text-left border rounded-md ${
              !isAnswered
                ? selectedOption === option
                  ? 'bg-purple-300'
                  : 'bg-slate-100'
                : option === correctAnswer
                ? 'bg-green-200 border-green-500'
                : option === selectedOption
                ? 'bg-red-200 border-red-500'
                : 'bg-slate-100'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <div
        className={`mt-4 text-center ${
          isCorrect ? 'text-green-400' : 'text-red-400'
        }`}
      >
        {isAnswered ? isCorrect ? 'Correct!' : 'Incorrect' : <>&nbsp;</>}
      </div>

      <div className="text-center mt-4">
        <h3 className="text-xl p-3 text-left border rounded-md bg-slate-100 w-fit m-auto">
          Time: {String(minutes).padStart(2, '0')}:
          {String(seconds).padStart(2, '0')}
        </h3>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handleSubmit}
          disabled={isAnswered || selectedOption === null}
          className={`px-4 py-2 ${
            isAnswered || selectedOption === null
              ? 'bg-gray-300'
              : 'bg-blue-500 hover:bg-blue-800'
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
