import React from "react";
import { Wrapper, ButtonWrapper } from "./Questions.styles";
import { AnswerObject } from "../App";

type props = {
  question: string;
  answer: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalquestion: number;
};

const Questions: React.FC<props> = ({
  question,
  answer,
  callback,
  userAnswer,
  questionNr,
  totalquestion,
}) => (
  <Wrapper>
    <p className="number">
      Question: {questionNr} / {totalquestion}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answer.map((answer) => (
        <ButtonWrapper
          key={answer}
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer === answer}
        >
          <button
            disabled={userAnswer ? true : false}
            value={answer}
            onClick={callback}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
);

export default Questions;
