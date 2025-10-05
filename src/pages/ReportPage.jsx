import React, { useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const decodeHTMLEntities = (text) => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
};

const ReportPage = ({
  questions,
  setquestions,
  userAnswers,
  userEmail,
  setuseranswers,
}) => {
  const navigate = useNavigate();
  const [showDetailed, setShowDetailed] = useState(false);

  useEffect(() => {
    const storedQuestions = localStorage.getItem("questions");
    if (storedQuestions) {
      try {
        setquestions(JSON.parse(storedQuestions));
      } catch {
        console.error("Invalid stored questions");
      }
    }
    const storedAnswers = localStorage.getItem("useranswers");
    if (storedAnswers) {
      try {
        setuseranswers(JSON.parse(storedAnswers));
      } catch {
        console.error("Invalid stored answers");
      }
    }
  }, [setquestions, setuseranswers]);

  const { correctCount, incorrectCount, unattemptedCount, score } =
    useMemo(() => {
      if (!questions?.length || !userAnswers)
        return {
          correctCount: 0,
          incorrectCount: 0,
          unattemptedCount: 0,
          score: 0,
        };

      let correct = 0,
        incorrect = 0,
        unattempted = 0;
      questions.forEach((q, i) => {
        const correctAnswer = decodeHTMLEntities(q.correct_answer);
        const userAnswer = userAnswers[i];
        if (!userAnswer) unattempted++;
        else if (userAnswer === correctAnswer) correct++;
        else incorrect++;
      });
      return {
        correctCount: correct,
        incorrectCount: incorrect,
        unattemptedCount: unattempted,
        score: correct,
      };
    }, [questions, userAnswers]);

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-indigo-100">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-700 font-medium">Loading your report...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-indigo-100 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100"
      >
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-700 mb-3"
        >
          Quiz Report
        </motion.h1>

        <AnimatePresence mode="wait">
          {!showDetailed ? (
            <motion.div
              key="summary"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="animate-fadeIn"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-green-50 p-4 sm:p-5 rounded-xl shadow-sm border border-green-200"
                >
                  <p className="text-green-700 font-medium text-base sm:text-lg text-center">
                    ✅ Correct
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-green-600 text-center">
                    {correctCount}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-red-50 p-4 sm:p-5 rounded-xl shadow-sm border border-red-200"
                >
                  <p className="text-red-700 font-medium text-base sm:text-lg text-center">
                    ❌ Incorrect
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-red-600 text-center">
                    {incorrectCount}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-50 p-4 sm:p-5 rounded-xl shadow-sm border border-gray-200"
                >
                  <p className="text-gray-700 font-medium text-base sm:text-lg text-center">
                    ⚪ Unattempted
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-gray-600 text-center">
                    {unattemptedCount}
                  </p>
                </motion.div>
              </div>

              <div className="text-center mb-8">
                <p className="text-xl sm:text-2xl font-semibold text-indigo-700">
                  Total Score:{" "}
                  <span className="text-indigo-600 font-bold">
                    {score} / {questions.length}
                  </span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDetailed(true)}
                  className="w-full sm:w-auto bg-indigo-600 text-white font-semibold py-3 px-6 sm:px-8 rounded-xl hover:bg-indigo-700 transition-all duration-300"
                >
                  Show Detailed Report
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setuseranswers(Array(15).fill(null));
                    localStorage.removeItem("questions");
                    localStorage.removeItem("useranswers");
                    navigate("/home");
                  }}
                  className="w-full sm:w-auto bg-gray-600 text-white font-semibold py-3 px-6 sm:px-8 rounded-xl hover:bg-gray-700 transition-all duration-300"
                >
                  Take Another Quiz
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detailed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="animate-fadeIn"
            >
              <div className="space-y-5 mb-8 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-transparent pr-2">
                {questions.map((question, index) => {
                  const userAnswer = userAnswers[index];
                  const correctAnswer = decodeHTMLEntities(
                    question.correct_answer
                  );
                  const isCorrect = userAnswer === correctAnswer;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={`p-4 sm:p-5 rounded-xl border-l-4 shadow-sm ${
                        isCorrect
                          ? "border-green-500 bg-green-50"
                          : "border-red-500 bg-red-50"
                      }`}
                    >
                      <p className="font-semibold text-gray-800 text-sm sm:text-base mb-2">
                        {index + 1}. {decodeHTMLEntities(question.question)}
                      </p>
                      <p
                        className={`text-sm sm:text-base ${
                          isCorrect ? "text-green-700" : "text-red-700"
                        }`}
                      >
                        Your answer:{" "}
                        <span className="font-semibold">
                          {userAnswer ?? "Not Attempted"}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-sm sm:text-base text-green-800 mt-1">
                          Correct answer:{" "}
                          <span className="font-semibold">{correctAnswer}</span>
                        </p>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDetailed(false)}
                  className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-xl hover:bg-indigo-700 transition-all duration-300"
                >
                  Back to Summary
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ReportPage;
