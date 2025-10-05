import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = ({ userEmail, setuseranswers }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem("quizInProgress", "true");
    localStorage.removeItem("questions");
    setuseranswers(Array(15).fill(null));
    localStorage.removeItem("useranswers");
    navigate("/quiz");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md md:max-w-lg bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-200 text-center"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl md:text-4xl font-extrabold text-indigo-600 mb-3"
        >
          You're All Set!
        </motion.h1>

        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-gray-700 mb-6 text-sm md:text-lg"
        >
          Welcome, <span className="font-semibold">{userEmail}</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-6 text-left space-y-3 mb-8"
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-3">
            Quiz Instructions
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1 text-xs md:text-sm">
            <li>
              You will have <span className="font-bold">15 questions</span> to
              answer.
            </li>
            <li>
              There is a time limit of{" "}
              <span className="font-bold">30 minutes</span>.
            </li>
            <li>
              Navigate between questions using the "Next" and "Previous" buttons
              or the overview panel.
            </li>
            <li>The quiz automatically submits when the timer runs out.</li>
            <li>Results are displayed immediately after finishing.</li>
          </ul>
        </motion.div>

        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="w-full bg-indigo-600 text-white font-bold py-3 md:py-4 px-4 rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
        >
          I'm Ready, Begin Quiz!
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LandingPage;
