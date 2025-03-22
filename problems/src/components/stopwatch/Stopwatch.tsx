import { useState, useEffect } from "react";
import "./Stopwatch.css";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lastTime, setLastTime] = useState<number | null>(null);

  useEffect(() => {
    let interval: number | undefined;
    if (isRunning) {
      setLastTime(Date.now());
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + (Date.now() - lastTime!));
        setLastTime(Date.now());
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, lastTime]);

  const formatTime = (time: number) => {
    const milliseconds = `00${time % 1000}`.slice(-3);
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
    const hours = `0${Math.floor(time / 3600000)}`.slice(-2);
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <div className="stopwatch-container">
     
      <div className="stopwatch-display time">{formatTime(time)}</div>
      <div className="stopwatch-buttons">
        <button
          onClick={() => setIsRunning((prev) => !prev)}
          className="button"
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button
          onClick={() => {
            setTime(0);
            setIsRunning(false);
            setLastTime(null);
          }}
          className="button"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
