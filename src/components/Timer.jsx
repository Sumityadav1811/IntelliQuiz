import React from "react";
import { motion } from "framer-motion";

const Timer = ({ timeLeft, onTimeUp }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Change color when time is low
  const textColor = timeLeft <= 60 ? "text-red-500" : "text-indigo-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center w-48"
    >
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Time Remaining
      </h3>
      <span
        key={timeLeft}
        className={`text-5xl font-bold tabular-nums ${textColor}`}
      >
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </motion.div>
  );
};

export default Timer;
