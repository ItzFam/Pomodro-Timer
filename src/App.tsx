/* 
Timer countdown (MM:SS) for work/break.

Start / Pause / Reset buttons.

Automatic switch between work (25 min) and break (5 min).

Minimal Tailwind styling → readable and usable.
*/

import { useState, useEffect } from "react";

function App() {
  // Default values for work and break times.
  const WORK_TIME = 30 * 60;
  const BREAK_TIME = 5 * 60;

  // State variables for timer.
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isActive, setIsActive] = useState(false);

  type TimerMode = "work" | "break";
  const [currentMode, setCurrentMode] = useState<TimerMode>("work");

  // Minutes and Seconds conversion.
  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  // Effect for countdown timer.
  useEffect(() => {
    if (isActive === true) {
      // The timer will be paused until start button is clicked.
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isActive]);

  useEffect(() => {
    if (timeLeft === 0 && currentMode === "work") {
      // Switch to break time.
      setTimeLeft(BREAK_TIME);
      setCurrentMode("break");
    }

    if (timeLeft === 0 && currentMode === "break") {
      // Switch to work time.
      setTimeLeft(WORK_TIME);
      setCurrentMode("work");
    }
  }, [timeLeft]);

  return (
    <>
      <div>
        <h1 className="text-center text-5xl">Pomodoro Timer</h1>
        <h2 className="text-center text-3xl">
          {minutes}:{seconds}
        </h2>
      </div>
      <div className="flex justify-center space-x-[50px]">
        <button
          onClick={() => setIsActive(true)}
          className="bg-blue-500 text-white rounded p-4"
        >
          Start
        </button>
        <button
          onClick={() => setIsActive(false)}
          className="bg-yellow-500 text-white rounded p-4"
        >
          Pause
        </button>
        <button
          onClick={() => {
            setTimeLeft(WORK_TIME);
            setIsActive(false);
          }}
          className="bg-red-500 text-white rounded p-4"
        >
          Reset
        </button>
      </div>
    </>
  );
}

export default App;
