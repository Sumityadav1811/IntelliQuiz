import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer.jsx";
import QuestionOverview from "../components/QuestionOverview.jsx";

const QuizPage = ({
  questions,
  setquestions,
  useranswers,
  setuseranswers,
  fetchQuestions,
}) => {
  const [visitedQuestions, setVisitedQuestions] = useState(new Set([0]));

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const savedindex = localStorage.getItem("currentindex");
    return savedindex ? parseInt(savedindex) : 0;
  });

  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem("timeLeft");
    return savedTime ? parseInt(savedTime, 10) : 30 * 60;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedQuestions = localStorage.getItem("questions");
    if (storedQuestions) {
      setquestions(JSON.parse(storedQuestions));
    } else {
      fetchQuestions();
    }
    const storedAnswers = localStorage.getItem("useranswers");
    if (storedAnswers) {
      setuseranswers(JSON.parse(storedAnswers));
    }
  }, []);

  const decodeHTMLEntities = (text) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleQuizSubmit = useCallback(() => {
    localStorage.removeItem("timeLeft");
    localStorage.removeItem("currentindex");
    localStorage.removeItem("quizInProgress");

    navigate("/report");
  }, [navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          localStorage.removeItem("timeLeft");
          handleQuizSubmit();
          return 0;
        }
        const newTime = prevTime - 1;
        localStorage.setItem("timeLeft", newTime.toString());
        return newTime;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [handleQuizSubmit]);

  const handleAnswerSelect = (answer) => {
    const newAnswers = [...useranswers];
    newAnswers[currentQuestionIndex] = answer;
    localStorage.setItem("useranswers", JSON.stringify(newAnswers));
    setuseranswers(newAnswers);
  };

  const goToQuestion = (index) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
      localStorage.setItem("currentindex", index);
      setVisitedQuestions((prev) => new Set(prev).add(index));
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  const shuffledAnswers = useMemo(() => {
    if (!currentQuestion) return [];
    const answers = [
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ];
    return shuffleArray(answers.map(decodeHTMLEntities));
  }, [currentQuestion]);

  if (!currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-6"></div>

        <p className="text-gray-700 text-lg font-medium animate-pulse">
          Loading questions...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/3 flex flex-col gap-6">
        <div className="hidden lg:block lg:top-6">
          <Timer timeLeft={timeLeft} />
        </div>
        <div className="bg-white p-4 rounded-xl h-full shadow-lg border border-gray-200">
          <QuestionOverview
            questions={questions}
            userAnswers={useranswers}
            visitedQuestions={visitedQuestions}
            currentQuestionIndex={currentQuestionIndex}
            onQuestionSelect={goToQuestion}
            className="h-full"
          />
        </div>
      </div>

      <div className="lg:w-2/3 bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>

          <div className="text-sm text-gray-500 block lg:hidden">
            <Timer timeLeft={timeLeft} />
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          {decodeHTMLEntities(currentQuestion.question)}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {shuffledAnswers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(answer)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 text-gray-700 font-medium ${
                useranswers[currentQuestionIndex] === answer
                  ? "bg-indigo-100 border-indigo-500 ring-2 ring-indigo-300"
                  : "bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400"
              }`}
            >
              {answer}
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => goToQuestion(currentQuestionIndex - 1)}
            disabled={currentQuestionIndex === 0}
            className="bg-gray-600 text-white font-bold py-2 px-6 rounded-xl hover:bg-gray-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleQuizSubmit}
              className="bg-green-600 text-white font-bold py-2 px-6 rounded-xl hover:bg-green-700 transition"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={() => goToQuestion(currentQuestionIndex + 1)}
              className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-xl hover:bg-indigo-700 transition"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
