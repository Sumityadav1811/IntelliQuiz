import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = ({ userEmail }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-10 border border-gray-200 text-center"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-extrabold text-indigo-600 mb-2"
        >
          You're All Set!
        </motion.h1>

        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-gray-700 mb-6 text-lg"
        >
          Welcome, <span className="font-semibold">{userEmail}</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-left space-y-4 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Quiz Instructions
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm md:text-base">
            <li>
              You will have <span className="font-bold">15 questions</span> to
              answer.
            </li>
            <li>
              There is a time limit of{" "}
              <span className="font-bold">30 minutes</span>.
            </li>
            <li>
              You can navigate between questions using the "Next" and "Previous"
              buttons, or by clicking the numbers in the overview panel.
            </li>
            <li>The quiz will automatically submit when the timer runs out.</li>
            <li>
              Your results will be displayed immediately after you finish.
            </li>
          </ul>
        </motion.div>

        <motion.button
          onClick={() => navigate("/quiz")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
        >
          I'm Ready, Begin Quiz!
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LandingPage;
