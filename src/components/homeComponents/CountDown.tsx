"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  onExpire: () => void;
  initialTime?: number; // optional: default is 300 seconds (5 mins)
}

const Countdown: React.FC<CountdownProps> = ({
  onExpire,
  initialTime = 300,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <>
      {" "}
      <div className="w-11/12 mx-auto ">
        <p className="text-red-600 font-semibold">
         Eid Offer expires in {minutes}:{seconds}
        </p>
      </div>
    </>
  );
};

export default Countdown;
