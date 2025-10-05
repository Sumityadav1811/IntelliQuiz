import React from "react";

// Displays the navigation panel for questions
const QuestionOverview = ({
  questions,
  userAnswers,
  visitedQuestions,
  currentQuestionIndex,
  onQuestionSelect,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-bold mb-4 text-gray-800">
        Question Overview
      </h3>
      <div className="grid grid-cols-5 gap-2">
        {questions.map((_, index) => {
          const isVisited = visitedQuestions.has(index);
          const isAttempted = userAnswers[index] !== null;
          const isCurrent = currentQuestionIndex === index;

          let buttonClass =
            "w-full text-sm rounded-md p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-semibold";
          if (isCurrent) {
            buttonClass += " bg-indigo-600 text-white scale-110 shadow-lg";
          } else if (isAttempted) {
            buttonClass += " bg-green-500 text-white hover:bg-green-600";
          } else if (isVisited) {
            buttonClass += " bg-yellow-300 text-yellow-800 hover:bg-yellow-400";
          } else {
            buttonClass += " bg-gray-200 text-gray-700 hover:bg-gray-300";
          }

          return (
            <button
              key={index}
              onClick={() => onQuestionSelect(index)}
              className={buttonClass}
              aria-label={`Go to question ${index + 1}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionOverview;
