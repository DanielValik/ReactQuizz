// import DateCounter from "./components/DateCounter";
import { useEffect } from "react";
import { useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import Challenge from "./challenge";

const init = {
  questions: [],

  // "loadning" "error" "ready" "active" "finished"
  status: "loading",
  index: 0,
  points: 0,
  answer: null,
  highscore: 0,
  time: 3,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer": {
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finish",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...state,
        status: "ready",
        index: 0,
        points: 0,
        answer: null,
        time: 3,
      };
    case "tick":
      return {
        ...state,
        time: state.time - 1,
        status: state.time === 0 ? "finish" : state.status,
      };

    default:
      throw new Error("Action is unknown");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highscore, time },
    dispatch,
  ] = useReducer(reducer, init);

  const questionAmount = questions.length;
  const pointsAmount = questions.reduce(
    (acc, current) => acc + current.points,
    0
  );

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((r) => r.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <>
      {/* <DateCounter /> */}

      <div className="app">
        <Header />
        <Main>
          {status === "loading" && <Loader />}
          {status === "loading" && <Error />}
          {status === "ready" && (
            <StartScreen questionsAmount={questionAmount} dispatch={dispatch} />
          )}
          {status === "active" && (
            <>
              <Progress
                currentIndex={index}
                questionAmount={questionAmount}
                currentPoints={points}
                pointsAmount={pointsAmount}
                answer={answer}
              />
              <Question
                question={questions[index]}
                dispatch={dispatch}
                answer={answer}
              />
              <Footer>
                <Timer dispatch={dispatch} time={time} />

                <NextButton
                  dispatch={dispatch}
                  answer={answer}
                  currentIndex={index}
                  questionAmount={questionAmount}
                />
              </Footer>
            </>
          )}
          {status === "finish" && (
            <FinishScreen
              points={points}
              maximumPoints={pointsAmount}
              highscore={highscore}
              dispatch={dispatch}
            />
          )}
        </Main>
      </div>

      {/* <Challenge /> */}
    </>
  );
}

export default App;
