import React from "react";
import { Navigate } from "react-router-dom";

const ProtectQuiz = ({ children }) => {
  const quizInProgress = localStorage.getItem("quizInProgress");
  return quizInProgress ? children : <Navigate to="/home" replace />;
};

export default ProtectQuiz;
