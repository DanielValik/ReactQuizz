function FinishScreen({ points, maximumPoints }) {
  const percentage = Math.ceil((points / maximumPoints) * 100);

  return (
    <div>
      <p className="result">
        You scored {points} points out of {maximumPoints} ({percentage} %)
      </p>
    </div>
  );
}

export default FinishScreen;
