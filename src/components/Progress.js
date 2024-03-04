function Progress({
  currentIndex,
  questionAmount,
  currentPoints,
  pointsAmount,
  answer,
}) {
  console.log(pointsAmount);
  return (
    <div className="progress">
      <progress
        max={questionAmount}
        value={currentIndex + Number(answer !== null)}
      />

      <p>
        Question: {currentIndex + 1}/{questionAmount}
      </p>
      <p>
        {currentPoints}/{pointsAmount} points
      </p>
    </div>
  );
}

export default Progress;
