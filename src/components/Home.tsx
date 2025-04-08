// src/components/QuizSelection.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import questionsData from "../data/CryptoQuestions.json";

// Define category names instead of week numbers
const getQuizCategories = (): string[] => {
  return Object.keys(questionsData); // Extract category names from JSON
};
const quizCategories = getQuizCategories(); // Get categories dynamically

const QuizSelection: React.FC = () => {
  const navigate = useNavigate();

  // Navigate to the selected category
  const handleCategoryClick = (category: string) => {
    navigate(`/quiz/${encodeURIComponent(category)}`);
  };

  // Select a random category
  const handleRandomClick = () => {
    const randomCategory =
      quizCategories[Math.floor(Math.random() * quizCategories.length)];
    navigate(`/quiz/${encodeURIComponent(randomCategory)}`);
  };

  // Navigate to mixed quiz
  const handleMixedClick = () => {
    navigate("/quiz/mixed");
  };

  const handleJaldiTenClick = () => {
    navigate("/quiz/जल्दी10");
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto items-center justify-center rounded-lg bg-gray-900 bg-opacity-50 backdrop-blur-lg p-5">
      <h1 className="text-4xl font-bold text-white m-4">Select a Quiz</h1>

      <div className="h-full grid grid-cols-2 sm:grid-cols-2 overflow-y-auto md:overflow-y-auto lg:grid-cols-4 gap-4 mb-8">
        {quizCategories.map((category) => (
          <div
            key={category}
            className="bg-white bg-opacity-20 backdrop-blur-md p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105 aspect-square flex justify-center items-center"
            onClick={() => handleCategoryClick(category)}
          >
            <h2 className="text-xl font-semibold text-white text-center">
              {category}
            </h2>
          </div>
        ))}
      </div>

      <div className="flex flex-row sm:flex-row space-x-4 sm:space-x-4">
        <button
          onClick={handleRandomClick}
          className="bg-purple-300 text-white text-xl bg-opacity-50 backdrop-blur-md px-5 mb-2 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105 aspect-square flex justify-center items-center"
        >
          Random
          <br />
          Quiz
        </button>
        <button
          onClick={handleJaldiTenClick}
          className="bg-purple-300 text-white text-l sm:text-2xl bg-opacity-50 backdrop-blur-md px-3 py-2 sm:px-5 sm:py-3 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105 flex justify-center items-center"
        >
          जल्दी 10<br></br>Quiz
        </button>
      </div>
      <div className="my-3 flex flex-row sm:flex-row space-x-4 sm:space-x-4">
        <button
          onClick={handleMixedClick}
          className="bg-purple-300 text-white text-xl bg-opacity-50 backdrop-blur-md px-5 mb-2 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105 aspect-square flex justify-center items-center"
        >
          Mixed
          <br />
          Quiz
        </button>
      </div>

      <p className="text-white">
        Quiz questions sourced from{" "}
        <a className="text-blue-500" href="https://github.com/sr2echa">
          @Sreecharan
        </a>
      </p>
    </div>
  );
};

export default QuizSelection;
