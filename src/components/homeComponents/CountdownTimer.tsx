"use client";

import React, { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: string; // e.g. "2025-04-10T00:00:00"
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();

    const timeLeft = {
      days: Math.max(Math.floor(difference / (1000 * 60 * 60 * 24)), 0),
      hours: Math.max(Math.floor((difference / (1000 * 60 * 60)) % 24), 0),
      minutes: Math.max(Math.floor((difference / 1000 / 60) % 60), 0),
      seconds: Math.max(Math.floor((difference / 1000) % 60), 0),
    };

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-11/12 mx-auto ">
      <div className="flex justify-center gap-4 text-center  font-mono">
        {["days", "hours", "minutes", "seconds"].map((unit) => (
          <div key={unit}>
            <div className="text-5xl font-bold text-blue-600">
              {(timeLeft as any)[unit].toString().padStart(2, "0")}
            </div>
            <div className="text-sm capitalize">{unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
