import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CompletionWindowProps {
  score: number;
  totalQuestions: number;
  incorrectAnswers: { question: string; correctAnswer: string }[];
  onRetry: () => void; // Function to handle retrying the quiz
}

const CompletionWindow: React.FC<CompletionWindowProps> = ({
  score,
  totalQuestions,
  incorrectAnswers,
  onRetry,
}) => {
  const navigate = useNavigate();
  const onBack = () => {
    navigate(`/`);
  };
  return (
    <div className="max-w-md max-h-full overflow-y-auto mx-auto p-6 bg-black bg-opacity-50 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Quiz Completed!
      </h2>
      <h3 className="text-lg mb-4 text-center">
        Your score: {score} out of {totalQuestions}
      </h3>
      {incorrectAnswers.length > 0 && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-4 text-center">
            You got the following questions wrong:
          </h4>
          <ul className="space-y-4">
            {incorrectAnswers.map((item, index) => (
              <li
                key={index}
                className="bg-gray-100 p-4 rounded-md shadow-md transition duration-200 hover:shadow-lg"
              >
                <strong className="block text-gray-800">Question:</strong>
                <p className="text-gray-700">{item.question}</p>
                <strong className="block mt-2 text-gray-800">
                  Correct Answer:
                </strong>
                <p className="text-gray-700">{item.correctAnswer}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex justify-between mt-6">
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
        >
          Retry Quiz
        </button>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default CompletionWindow;
