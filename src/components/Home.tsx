// src/components/QuizSelection.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuizSelection: React.FC = () => {
  const navigate = useNavigate();

  const handleWeekClick = (weekNumber: number) => {
    navigate(`/quiz/week${weekNumber}`);
  };

  const handleRandomClick = () => {
    const randomWeek = Math.floor(Math.random() * 12) + 1; // Generate a random week number between 1 and 12
    navigate(`/quiz/week${randomWeek}`);
  };

  const handleMixedClick = () => {
    navigate('/quiz/mixed');
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto items-center justify-center rounded-lg bg-gray-900 bg-opacity-50 backdrop-blur-lg p-5">
      <h1 className="text-4xl font-bold text-white m-4">Select a Quiz</h1>

      <div className="h-full overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 12 }, (_, index) => index + 1).map((week) => (
          <div
            key={week}
            className="bg-white bg-opacity-20 backdrop-blur-md p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105 aspect-square flex justify-center items-center"
            onClick={() => handleWeekClick(week)}
          >
            <h2 className="text-2xl font-semibold text-white">Week {week}</h2>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4">
        <button
          onClick={handleRandomClick}
          className="bg-purple-300 text-white text-2xl bg-opacity-50 backdrop-blur-md px-5 mb-2 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105 aspect-square flex justify-center items-center"
        >
          Random<br></br>Quiz
        </button>
        <button
          onClick={handleMixedClick}
          className="bg-purple-300 text-white text-2xl bg-opacity-50 backdrop-blur-md px-5 mb-2 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105 aspect-square flex justify-center items-center"
        >
          Mixed<br></br>Quiz
        </button>
      </div>
      <p className="text-white">
        Quiz questions sourced from
        <a className="text-blue-500" href="https://github.com/sr2echa">
          @Sreecharan
        </a>
      </p>
    </div>
  );
};

export default QuizSelection;
