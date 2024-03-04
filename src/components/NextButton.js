function NextButton({ dispatch, answer, currentIndex, questionAmount }) {
  if (answer === null) return null;

  if (currentIndex < questionAmount - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next question
      </button>
    );

  if (currentIndex === questionAmount - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
