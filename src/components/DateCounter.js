import { useReducer, useState } from "react";

function reducer(state, { type, payload }) {
  console.log(state, type, payload);

  switch (type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setCount":
      return { ...state, count: payload };
    case "setStep":
      return { ...state, step: payload };
    case "reset":
      return { count: 0, step: 1 };
    default:
      throw new Error("Unknown action");
  }
}

function DateCounter() {
  const initialState = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { step, count } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec", payload: step });
  };

  const inc = function () {
    dispatch({ type: "inc", payload: step });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const setStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input type="range" min="0" max="10" value={step} onChange={setStep} />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
