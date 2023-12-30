import './App.css';
import { useEffect, useRef, useState } from "react";

const format = (time) => {
  const mins = Math.floor(time / 60);
  time %= 60;
  return `${mins}:${time < 10 ? "0" : ""}${time}`;
};

export default function App() {
  const [isActivated, setIsActivated] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerId = useRef(null);

  const toggleHandler = () => {
    setIsActivated(!isActivated);
  };

  const reset = () => {
    setIsActivated(false);
    setTimer(0);
  };
  useEffect(() => {
    timerId.current = setInterval(() => {
      if (isActivated) {
        setTimer((prevTimer) => prevTimer + 1);
      }
    }, 1000);

    return () => {
      clearInterval(timerId.current);
    };
  }, [isActivated]);

  return (
    <div className="App">
      <h1>Stopwatch</h1>
      <p>Time : {format(timer)}</p>
      <button onClick={toggleHandler}>{isActivated ? "Stop" : "Start"}</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}