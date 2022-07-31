import React, { useState } from "react";
import { fetchQuizQuestion } from "./API";
import Questions from "./components/Questions";
import { QuestionState, Difficulty } from "./API";
import { GlobalStyle, Wrapper } from "./App.styles";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 1;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestion] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  //const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestion(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestion(newQuestions);
    //setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      //if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswer((prev) => [...prev, answerObject]);
    }
  };

  const SubmitQuestion = () => {
    const SubmitQuestion = number + 1;

    if (SubmitQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(SubmitQuestion);
    }
  };
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Small Trivia Game</h1>
        {gameOver || userAnswer.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        ) : null}
        {loading && <p>Loading Questions ...</p>}
        {!loading && !gameOver && (
          <Questions
            questionNr={number + 1}
            totalquestion={TOTAL_QUESTIONS}
            question={questions[number].question}
            answer={questions[number].answers}
            userAnswer={userAnswer ? userAnswer[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswer.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={SubmitQuestion}>
            Submit
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
