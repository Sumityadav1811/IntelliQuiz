import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import QuizPage from "./pages/QuizPage";
import LandingPage from "./pages/LandingPage";
import ReportPage from "./pages/ReportPage";
const App = () => {
  const [questions, setquestions] = useState([]);
  const [userEmail, setuserEmail] = useState("");
  const [useranswers, setuseranswers] = useState(Array(15).fill(null));

  const fetchQuestions = async () => {
    const res = await fetch("https://opentdb.com/api.php?amount=15");
    if (!res.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await res.json();
    localStorage.setItem("questions", JSON.stringify(data.results)); // store as string
    setquestions(data.results);
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <StartPage userEmail={userEmail} setuserEmail={setuserEmail} />
          }
        />
        <Route
          path="/quiz"
          element={
            <QuizPage
              questions={questions}
              setquestions={setquestions}
              setuseranswers={setuseranswers}
              useranswers={useranswers}
              fetchQuestions={fetchQuestions}
            />
          }
        />
        <Route path="/home" element={<LandingPage />} />
        <Route
          path="/report"
          element={
            <ReportPage
              questions={questions}
              userAnswers={useranswers}
              userEmail={userEmail}
              setuseranswers={setuseranswers}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
