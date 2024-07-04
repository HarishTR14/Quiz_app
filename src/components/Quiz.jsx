import React, { useState, useRef } from "react";
import "./quiz.css";
import { quizData } from "../data";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(quizData[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);
  let options_array = [option1, option2, option3, option4];

  const handleCheck = (e, question, answer) => {
    if (lock === false)
      if (question.correctAnswer == answer) {
        e.target.classList.add("correct");
        setLock(true);
        setScore(score + 1);
      } else {
        e.target.classList.add("wrong");

        options_array[question.correctAnswer].current.classList.add("correct");
        setLock(true);
      }
  };

  const handleNext = () => {
    if (lock) {
      if (index === quizData.length - 1) {
        setResult(true);
        return 0;
      }
      if (index + 1 < quizData.length) {
        setIndex(index + 1);
        setQuestion(quizData[index + 1]);
        options_array.map((option) => {
          option.current.classList.remove("wrong");
          option.current.classList.remove("correct");
        });
      }
      setLock(false);
    }
  };

  const handleReset = () => {
    setIndex(0);
    setQuestion(quizData[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <></>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            {question.options.map((option, index) => (
              <li
                ref={options_array[index]}
                onClick={(e) => {
                  handleCheck(e, question, index);
                }}
                key={index}
              >
                {option}
              </li>
            ))}
          </ul>
          <button onClick={handleNext}>Next</button>
          <div className="index">
            {index + 1} of {quizData.length} questions
          </div>
        </>
      )}
      {result ? (
        <>
          {" "}
          <h2>
            Scored {score} out of {quizData.length}
          </h2>
          <button className="resetButton" onClick={handleReset}>
            Reset
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Quiz;
