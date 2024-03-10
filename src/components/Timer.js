import { useEffect } from "react";

function Timer({ dispatch, time }) {
  useEffect(
    function () {
      const timerInterval = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(timerInterval);
    },
    [dispatch]
  );

  return <div className="timer">{time}</div>;
}

export default Timer;
