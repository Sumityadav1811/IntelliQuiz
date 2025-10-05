import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

// The final report page showing results
const decodeHTMLEntities = (text) => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
};

const ReportPage = ({ questions, userAnswers, userEmail, setuseranswers }) => {
  const navigate = useNavigate();
  const score = useMemo(() => {
    return userAnswers.reduce((acc, answer, index) => {
      const correctAnswer = decodeHTMLEntities(questions[index].correct_answer);
      return answer === correctAnswer ? acc + 1 : acc;
    }, 0);
  }, [userAnswers, questions]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Quiz Report
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Report for: <span className="font-semibold">{userEmail}</span>
        </p>
        <div className="text-center bg-indigo-100 border border-indigo-300 rounded-lg p-4 mb-8">
          <p className="text-lg text-indigo-800">You scored</p>
          <p className="text-5xl font-extrabold text-indigo-600">
            {score} / {questions.length}
          </p>
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const correctAnswer = decodeHTMLEntities(question.correct_answer);
            const isCorrect = userAnswer === correctAnswer;

            return (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  isCorrect
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"
                }`}
              >
                <p className="font-bold text-gray-800 mb-2">
                  {index + 1}. {decodeHTMLEntities(question.question)}
                </p>
                <p
                  className={`text-sm ${
                    isCorrect ? "text-green-700" : "text-red-700"
                  }`}
                >
                  Your answer:{" "}
                  <span className="font-semibold">
                    {userAnswer ?? "Not Attempted"}
                  </span>
                </p>
                {!isCorrect && (
                  <p className="text-sm text-green-800 mt-1">
                    Correct answer:{" "}
                    <span className="font-semibold">{correctAnswer}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => {
              setuseranswers(Array(15).fill(null));
              navigate("/home");
            }}
            className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Take Another Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
