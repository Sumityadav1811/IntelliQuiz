import React from "react";

const Timer = ({ timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Change color when time is less
  const textColor = timeLeft <= 60 ? "text-red-500" : "text-indigo-600";

  return (
    <div className="border-none text-right shadow-none bg-white lg:p-6 rounded-xl lg:shadow-lg border border-gray-200 lg:text-center w-48  ">
      <h3 className="hidden lg:block text-lg font-semibold text-gray-700 mb-2 ">
        Time Remaining
      </h3>
      <span
        key={timeLeft}
        className={`text-2xl text-right lg:text-5xl font-bold tabular-nums ${textColor}`}
      >
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
};

export default Timer;
