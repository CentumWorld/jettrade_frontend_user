import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [targetDate, setTargetDate] = useState(new Date('2023-12-31T00:00:00').getTime());
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const timeLeft = Math.max(targetDate - now, 0);
      setTimeLeft(timeLeft);
    };

    // Start the countdown when the component mounts
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timer);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="countdown">
      {timeLeft <= 0 ? (
        <span>Countdown expired!</span>
      ) : (
        <span style={{color:'orange'}}>
          {hours}h {minutes}m {seconds}s
        </span>
      )}
    </div>
  );
};

export default CountdownTimer;
