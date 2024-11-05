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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <h1 className="text-4xl font-bold mb-8">Select a Quiz</h1>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {Array.from({ length: 12 }, (_, index) => index + 1).map((week) => (
          <div
            key={week}
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
            onClick={() => handleWeekClick(week)}
          >
            <h2 className="text-2xl font-semibold">Week {week}</h2>
          </div>
        ))}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleRandomClick}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Random Quiz
        </button>
        <button
          onClick={handleMixedClick}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Mixed Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizSelection;
