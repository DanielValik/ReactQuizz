function FinishScreen({ points, maximumPoints, highscore }) {
  const percentage = Math.ceil((points / maximumPoints) * 100);

  return (
    <div>
      <p className="result">
        You scored {points} points out of {maximumPoints} ({percentage} %)
      </p>
      <p>Your highscore is {highscore}</p>
    </div>
  );
}

export default FinishScreen;
