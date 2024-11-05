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
    localStorage.setItem("Time", String(document.getElementById("tmr")?.innerHTML));
  };

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
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(null);
      startTimer(); // Continue the timer for the next question
      setCompletionTime();
    }
  };

  // Effect to shuffle options on component mount or when question changes
  useEffect(() => {
    const shuffleArray = (array: string[]) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    setShuffledOptions(shuffleArray(options));
    startTimer();

    // Cleanup when the component is unmounted or when the timer is stopped
    return () => {
      stopTimer();
    };
  }, [question, options]); // Shuffle options when question or options change

  // Convert time to minutes and seconds format
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
              selectedOption === option ? 'bg-purple-300' : 'bg-slate-100'
            } ${
              isAnswered && option === correctAnswer
                ? 'border-green-500 bg-green-200'
                : ''
            } ${
              isAnswered &&
              selectedOption === option &&
              option !== correctAnswer
                ? 'border-red-500 bg-red-200'
                : isAnswered &&
                  selectedOption === option &&
                  option === correctAnswer
                  ? 'border-green-500 bg-green-200'
                  : ''
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

      {/* Stopwatch Timer */}
      <div className="text-center mt-4">
        <h3 id="tmr" className="text-xl p-3 text-left border rounded-md bg-slate-100 w-fit m-auto">Time: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</h3>
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
