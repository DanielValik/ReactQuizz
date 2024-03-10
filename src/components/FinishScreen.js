function FinishScreen({ points, maximumPoints, highscore, dispatch }) {
  const percentage = Math.ceil((points / maximumPoints) * 100);

  return (
    <div>
      <p className="result">
        You scored {points} points out of {maximumPoints} ({percentage} %)
      </p>
      <p>Your highscore is {highscore}</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </div>
  );
}

export default FinishScreen;
