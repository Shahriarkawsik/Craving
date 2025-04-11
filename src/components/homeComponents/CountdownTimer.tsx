"use client";

import React, { useEffect, useState } from "react";
import eid from "@/assets/eid3.jpg";

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
    <div className="  mx-auto  space-y-4">
      <div
        className="flex-col flex space-y-4 justify-center items-center"
        style={{
          backgroundImage: `url(${eid.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "90vh ",
          width: "100%",
        }}
      >
        <h2 className="font-mono text-2xl text-[#c27f27] font-bold ">
          {" "}
          EID IS IN
        </h2>

        <div className="flex justify-center items-center gap-4 text-center  font-mono">
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <div key={unit}>
              <div className="text-5xl font-bold text-[#c27f27] ">
                {(timeLeft as Record<string, number>)[unit]
                  .toString()
                  .padStart(2, "0")}
              </div>

              <div className="text-sm capitalize">{unit}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
