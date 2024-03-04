function StartScreen({ questionsAmount, dispatch }) {
  return (
    <div>
      <h2>Welcome to React Quiz!</h2>
      <h3>{questionsAmount} questions to check your React mastery:</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Start
      </button>
    </div>
  );
}

export default StartScreen;
